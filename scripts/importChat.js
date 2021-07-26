const { ipcRenderer  } = require('electron');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const utils = require('./utils.js');
const db = utils.setupDB();

let store = {
  files: [],
  chats: []
};

function showDialogBox() {
  ipcRenderer.invoke('openFile').then((result) => {
    if(result) {
      store.files.push(result[0]);
    }
  });
}

async function parseFile() {
  if(!store.files.length) {
    console.log('no file selected');
    return;
  }

  const fileName = path.basename(store.files[store.files.length-1], '.txt');
  const chatName = fileName.match(/WhatsApp Chat mit (.*)/i)[1]; // TODO: Sprachunabhängig machen (nach drittem Leerschlag matchen)

  const fileStream = fs.createReadStream(store.files[store.files.length-1]);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

  let messages = [];
  for await (const line of rl) {
    let message;

    if(line.substring(0, 18).match(/[0-9]{2}\.{1}[0-9]{2}\.{1}[0-9]{2}, [0-9]{2}\:[0-9]{2} - /g)) {  // if first character of line match pattern like "08.01.18, 17:45 - " --> new message
      const date = line.substring(0, 8);
      const time = line.substring(10, 15);
      let sender;
      let content;
      let type;

      if(!line.substring(18).includes(':')) {   // system notification (e.g. change of group description...)
        content = line.substring(18);
        sender = '_SYSTEM';
        type = 'system';
      } else {
        sender = (line.match(/ - ([^:]*)/) || [])[1];
        content = (line.match(/: (.*)/) || [])[1];
        type = 'message';
      }

      message = {
        sender,
        date,
        time,
        content,
        type
      };

      messages.push(message);
    } else {  // attach line to content of previous message
      try {
        messages[messages.length - 1].content += '\n' + line;
      } catch {}
    }
  }

  if(!messages.length) {  // throw error in frontend
    console.log(messages.length);
  } else {
    writeToDB(chatName, messages);
    console.log(messages);
  }
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
}

module.exports = {
  showDialogBox,
  parseFile,
  store
}