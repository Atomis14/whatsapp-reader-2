// Bürcke zwischen Backend (Main Process) und Frontend (Renderer Process)

const { contextBridge  } = require('electron');
const chatImport = require('./scripts/chatImport.js');

contextBridge.exposeInMainWorld('electron', {
  chatImport
});