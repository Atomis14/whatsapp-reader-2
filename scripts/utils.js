const { ipcRenderer, shell } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const sqlite = require('better-sqlite3');

store = {
  userDataPath: ipcRenderer.sendSync('getUserDataPath')
}

function setupDB() {
  //const userDataPath = ipcRenderer.sendSync('getUserDataPath');
  const db = new sqlite(path.join(store.userDataPath, 'chats.sqlite3'));
  const stmt = `
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY,
      name TEXT,
      type TEXT
    );
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      sender TEXT,
      date TEXT,
      time TEXT,
      content TEXT,
      type TEXT,
      chat INTEGER,
      FOREIGN KEY (chat) REFERENCES chats (id)
    );
  `;
  db.exec(stmt);
  return db;
}

function resetApp() {
  const db = setupDB();

  // reset DB
  db.transaction(() => {
    for (table of ['messages', 'chats']) {
      db.prepare(`DROP TABLE IF EXISTS ${table}`).run();
    }
  })();

  // delete chats folder in appdata
  fs.rmdir(path.join(store.userDataPath, 'chats'), { recursive: true }, (err) => {
    if(err) throw err;
    console.log('Removed path successfully.');
    location.reload();
  });
}

function customEvent(name, detail={}) {
  const event = new CustomEvent(name, { detail });
  document.dispatchEvent(event);
}

function openInBrowser(url) {
  shell.openExternal(url);
}

function createMessageLink(message) {
  return path.join(store.userDataPath, 'chats', String(message.chat), message.content);
}

function getVideoThumbnail(video) {

}

module.exports = {
  setupDB,
  resetApp,
  customEvent,
  openInBrowser,
  createMessageLink,
  getVideoThumbnail,
  store
}