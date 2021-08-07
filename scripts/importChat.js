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
      const paths = result.map(file => path.basename(file, '.txt'));
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

function startImport() {
  if(store.directories.length === 0 && store.files.length === 0) {
    console.log('no files or folders selected.');
    return;
  }

  for(const directory of store.directories) {
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
            });
          });
        }
      });
    });
  }

  for(const file of store.files) {
    parseFile(file);
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
  const chatNamePattern = fileName.match(/WhatsApp Chat mit (.*)/i); // TODO: Sprachunabhängig machen (nach drittem Leerschlag matchen)
  if(chatNamePattern) {
    chatName = chatNamePattern[1];
  }

  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

  let messages = [];
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
       
        if(file = content.match(/(.*) \(Datei angehängt\)/)) {  //// file or image
          content = file[1].replace(/[^ -~]+/g, '');  // remove (Datei angehängt) from content

          if(path.extname(content) == '.jpg') {
            type = 'image';
          } else {
            type = 'file';
          }
        } else {  //// normal message
          type = 'text';
        }
      }

      message = {
        sender,
        date,
        time,
        content,
        type
      };

      messages.push(message);
    } else if(messages.length >= 1 && ['file', 'image'].indexOf(messages[messages.length - 1].type) !== -1) { // if previous message is file or image --> create new message with caption
        const previousMessage = messages[messages.length - 1];
        messages.push({
          sender: previousMessage.sender,
          date: previousMessage.date,
          time: previousMessage.time,
          content: line,
          type: 'text'
        });
    } else { // append line to content of previous message
      //try {
        messages[messages.length - 1].content += '\n' + line;
      //} catch {}
    }
  }

  //console.log(messages);
  const chatId = writeToDB(chatName, messages);
  return chatId;
}

async function writeToDB(name, messages) {
  const chatId = db.prepare("INSERT INTO chats (name) VALUES (?)").run(name).lastInsertRowid;
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
  parseFile,
  startImport,
  store
}