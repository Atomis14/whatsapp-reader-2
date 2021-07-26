const { ipcRenderer  } = require('electron');
const path = require('path');
const sqlite = require('better-sqlite3');

function setupDB() {
  const userDataPath = ipcRenderer.sendSync('getUserDataPath');
  const db = new sqlite(path.join(userDataPath, 'chats.sqlite3'));
  const stmt = `
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY,
      name TEXT
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

module.exports = {
  setupDB
}