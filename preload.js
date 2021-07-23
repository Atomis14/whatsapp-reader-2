// Wenn Serverseitige Informationen auf Webpage geschrieben werden sollen, wird die preload.js gebraucht

const { ipcRenderer, contextBridge  } = require('electron');

contextBridge.exposeInMainWorld('ipccc', {
  test: {
    sendPing(message) {
      ipcRenderer.send('ping2', message);
    },
    testString: "Hello"
  },
  files: {

  }
});

ipcRenderer.on('ping', (event, message) => {
  console.log(message);
});




/*
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
})
*/