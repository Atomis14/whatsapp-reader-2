// Bürcke zwischen Backend (Main Process) und Frontend (Renderer Process)

const { ipcRenderer, contextBridge  } = require('electron');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

contextBridge.exposeInMainWorld('ipccc', {
  import: {
    readFile() {
      fs.readFile(path.join(__dirname, 'chats', 'Aaron karrer', 'WhatsApp Chat mit Aaron Karrer.txt'), 'utf-8', (err, data) => {
        if(err) {
          console.log(err);
          return;
        }
        console.log(data);
      });
    },
  }
});

async function readFile() {
  const fileStream = fs.createReadStream(path.join(__dirname, 'chats', 'Aaron karrer', 'WhatsApp Chat mit Aaron Karrer.txt'));
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

  let messages = [];
  for await (const line of rl) {
    let message;

    // [0-9]{2}\.{1}[0-9]{2}\.{1}[0-9]{2}, [0-9]{2}\:[0-9]{2}  -  
    // get Date and Time
    if(line.substring(0, 18).match(/[0-9]{2}\.{1}[0-9]{2}\.{1}[0-9]{2}, [0-9]{2}\:[0-9]{2} - /gm)) {  // if first character of line match pattern like "08.01.18, 17:45 - "
      // neue Nachricht
      const date = line.substring(0, 8);
      const time = line.substring(10, 15);
      const sender = line.match(/ - ([^:]*)/)[1];

      message = {
        sender,
        date,
        time,
        content: 'Unknown'
      };
    } else {
      // alte Nachricht weiterführen
    }

    messages.push(message);
    console.log(line);
    console.log(message);
  }

  console.log(messages);

  /*
  fs.readFile(path.join(__dirname, 'chats', 'Aaron karrer', 'WhatsApp Chat mit Aaron Karrer.txt'), 'utf-8', (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
  */
}

readFile();