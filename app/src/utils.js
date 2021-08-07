function customEvent(name, callback) {
  document.addEventListener(name, callback);
}

export {
  customEvent
}