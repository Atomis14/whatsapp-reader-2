const { ipcRenderer  } = require('electron');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const utils = require('./utils.js');
const db = utils.setupDB();

let store = {
  directories: [],  // for chat import with media
  files: []         // for chat import without media
};

function showDialogBox(type) {
  ipcRenderer.invoke('openDialog', type).then((result) => {
    if(result) {
      const paths = result.map(file => {
        return {
          name: path.basename(file, '.txt'),
          path: file
        }
      });

      switch(type) {
        case 'file':
          store.files.push(...result);
          utils.customEvent('fileSelected', { paths });
          break;
        case 'directory':
          store.directories.push(...result);
          utils.customEvent('folderSelected', { paths });
          break;
      }
    }
  });
}

function removePath(index, name) {
  if(name == 'folders') {
    store.directories.splice(index, 1);
  } else if(name == 'files') {
    store.files.splice(index, 1);
  }
}

function startImport() {
  if(store.directories.length === 0 && store.files.length === 0) {
    console.log('no files or folders selected.');
    return;
  }

  let totalChats = store.directories.length + store.files.length;
  let importedChats = 0;

  let counter = 0;
  // import chats with media
  for(const directory of store.directories) {
    counter++;
    setTimeout(() => {  // timeout in order for the loading animation to show
      fs.readdir(directory, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
          if(path.extname(file) === '.txt') {
            isChatFile(path.join(directory, file)).then(isChat => {
              if(isChat !== true) {
                return;
              }
              parseFile(path.join(directory, file)).then(chatId => {
                // copy contents of selected folder into appdata
                fs.copy(directory, path.join(utils.store.userDataPath, 'chats', chatId.toString()), {filter: (src, dest) => {
                  if(fs.lstatSync(src).isDirectory() && src !== directory) {  // ignore all folders except top level folder
                    return false;
                  }
                  return true;
                }});
              }).catch((e) => {
                utils.customEvent('importUpdate', { error: `Could not import "${path.basename(directory)}"` });
              });
            });
          }
        });
      });
      importedChats++;
      utils.customEvent('importUpdate', { progress: importedChats/totalChats });   // finished import of chat
    }, 50*counter);
  }

  // import chats without media
  counter = 0;
  for(const file of store.files) {
    counter++;
    setTimeout(() => {
      parseFile(file);
      importedChats++;
      utils.customEvent('importUpdate', { progress: importedChats/totalChats });
    }, 50*counter);
  }
}

async function isChatFile(file) {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({ input: fileStream })

  const firstLine = await new Promise(resolve => {
    rl.on('line', (line) => {
      resolve(line);
    });
  });

  return /[0-9]{2}\.{1}[0-9]{2}\.{1}[0-9]{2}, [0-9]{2}\:[0-9]{2} - /.test(firstLine.substring(0, 18)); // if first line of document matches pattern like "08.01.18, 17:45 - "
}

async function parseFile(file) {
  const fileName = path.basename(file, '.txt');
  
  let chatName = 'No Name';
  const chatNamePattern = fileName.match(/WhatsApp Chat mit (.*)/i); // TODO: Sprachunabh??ngig machen (nach drittem Leerschlag matchen)
  if(chatNamePattern) {
    chatName = chatNamePattern[1];
  }

  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

  let messages = [];
  let people = [];
  for await (const line of rl) {
    let message;

    if(line.substring(0, 18).match(/[0-9]{2}\.{1}[0-9]{2}\.{1}[0-9]{2}, [0-9]{2}\:[0-9]{2} - /g)) {  // if first characters of line match pattern like "08.01.18, 17:45 - " --> new message      
      const date = line.substring(0, 8);
      const time = line.substring(10, 15);
      let sender;
      let content;
      let type;

      if(!line.substring(18).includes(':')) {   //// system notification (e.g. change of group description) never include a : in content
        content = line.substring(18);
        sender = '_SYSTEM';
        type = 'system';
      } else {
        sender = (line.match(/ - ([^:]*)/) || [])[1];
        content = (line.match(/: (.*)/) || [])[1];

        if(file = content.match(/(.*) \(Datei angeh??ngt\)/)) {  //// file or image
          content = file[1].replace(/[^ -~]+/g, '');  // remove (Datei angeh??ngt) from content

          const fileExtension = path.extname(content);
          if(fileExtension == '.jpg') {
            type = 'image';
          } else if(fileExtension == '.mp4') {
            type = 'video';
          } else if(fileExtension == '.opus' || fileExtension == '.mp3') {
            type = 'audio';
          } else {
            type = 'file';
          }
        } else {  //// normal message
          type = 'text';
        }

        people.push(sender);
        people = [... new Set(people)]; // only unique values
      }

      message = {
        sender,
        date,
        time,
        content,
        type
      };

      messages.push(message);
    } else if(messages.length >= 1 && ['file', 'image', 'video', 'audio'].indexOf(messages[messages.length - 1].type) !== -1) { // if previous message is file, image, video or audio --> create new message with caption
        const previousMessage = messages[messages.length - 1];
        messages.push({
          sender: previousMessage.sender,
          date: previousMessage.date,
          time: previousMessage.time,
          content: line,
          type: 'text'
        });
    } else { // append line to content of previous message
      try {
        messages[messages.length - 1].content += '\n' + line;
      } catch {}
    }
  }

  let chatType;
  if(people.length > 2) {
    chatType = 'group';
  } else {
    chatType = 'normal';
  }

  const chatId = writeToDB(chatName, messages, chatType);
  return chatId;
}

async function writeToDB(name, messages, chatType) {
  const chatId = db.prepare("INSERT INTO chats (name, type) VALUES (?, ?)").run(name, chatType).lastInsertRowid;
  db.transaction(() => {
    for(const message of messages) {
      db.prepare("INSERT INTO messages (chat, sender, date, time, content, type) VALUES (:chatId, :sender, :date, :time, :content, :type)").run({
        chatId,
        sender: message.sender,
        date: message.date,
        time: message.time,
        content: message.content,
        type: message.type
      });
    }  
  })();
  return chatId;
}

module.exports = {
  showDialogBox,
  removePath,
  parseFile,
  startImport,
  store
}