const utils = require('./utils.js');
const db = utils.setupDB()
require('dotenv').config();

let store = {
  chats: [],
  messages: []
}

function getChats() {
  return db.prepare("SELECT * FROM chats ORDER BY name").all();
}

function loadMessages(id, offset=0) {
  return db.prepare('SELECT * FROM messages WHERE chat=? ORDER BY id DESC LIMIT 50 OFFSET ?').all(id, offset);
}

module.exports = {
  store,
  getChats,
  loadMessages
}