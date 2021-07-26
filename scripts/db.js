const utils = require('./utils.js');
const db = utils.setupDB();

let store = {
  chats: [],
  messages: []
}

function getChats() {
  return db.prepare("SELECT * FROM chats").all();
}

module.exports = {
  getChats,
  store
}