function customEvent(name, callback) {
  document.addEventListener(name, callback);
}

function createMessageLink(message) {
  return '/' + window.electron.utils.store.userDataPath + '/chats/' + message.chat + '/' + message.content;
}

export {
  customEvent,
  createMessageLink
}