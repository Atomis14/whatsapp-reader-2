const { ipcRenderer, shell } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const sqlite = require('better-sqlite3');
const { v4: uuid } = require('uuid');

store = {
  userDataPath: ipcRenderer.sendSync('getPath', 'userData')
}

function setupDB() {
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

function showFileInExplorer(file) {
  shell.showItemInFolder(file);
}

function getFilePath(message) {
  return path.join(store.userDataPath, 'chats', String(message.chat), message.content);
}

function copyFileToDownloads(file) {  
  const downloadsFolder = ipcRenderer.sendSync('getPath', 'downloads');
  let newLocation = path.join(downloadsFolder, path.basename(file));

  const extension = path.extname(file);
  const filename = path.basename(file, extension);

  let counter = 1;
  while(fs.existsSync(newLocation)) {
    newLocation = path.join(downloadsFolder, `${filename} (${counter})${extension}`);
    counter++;
  }

  fs.copy(file, newLocation, { overwrite: false, preserveTimestamps: false })
    .then(() => {
      customEvent('notification', { id: uuid(), message: 'File added to downloads folder.', file: newLocation });
    })
    .catch(e => console.error(e));
}

module.exports = {
  setupDB,
  resetApp,
  customEvent,
  openInBrowser,
  showFileInExplorer,
  getFilePath,
  copyFileToDownloads,
  store
}