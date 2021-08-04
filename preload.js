// Bürcke zwischen Backend (Main Process) und Frontend (Renderer Process)

const { contextBridge  } = require('electron');
const utils = require('./scripts/utils.js');
const chatImport = require('./scripts/importChat.js');
const db = require('./scripts/db.js');

contextBridge.exposeInMainWorld('electron', {
  utils,
  chatImport,
  db
});

db.getChats();