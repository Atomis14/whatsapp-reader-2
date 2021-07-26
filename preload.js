// Bürcke zwischen Backend (Main Process) und Frontend (Renderer Process)

const { contextBridge  } = require('electron');
const chatImport = require('./scripts/importChat.js');
const db = require('./scripts/db.js');

contextBridge.exposeInMainWorld('electron', {
  chatImport,
  db
});


db.getChats();