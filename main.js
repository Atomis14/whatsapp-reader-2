const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
require('dotenv').config();
require('electron-debug')({ showDevTools: true });
try {
	require('electron-reloader')(module);
} catch {}


async function windowStateKeeper() {
  let windowState;

  if(await appConfig.has('windowState')) {
      windowState = await appConfig.get('windowState');
  } else {
    windowState = {
      x: null,
      y: null,
      width: 600,
      height: 500,
      isMaximized: false
    };
  }

  async function setState(state) {
    await appConfig.set('windowState', state).catch(err => {});
  }
  
  function track(win) {
    ['resize', 'move', 'close'].forEach(event => {
      win.on(event, function() {
        windowState = {
          ...win.getBounds(),
          isMaximized: win.isMaximized()
        };
        setState(windowState);
      });
    });
  }

  return {
    ...windowState,
    track
  };
}

async function createWindow() {
  const windowState = await windowStateKeeper();
  const win = new BrowserWindow({
    title: 'WhatsApp Reader',
    width: windowState.width,
    height: windowState.height,
    minWidth: 900,
    minHeight: 700,
    x: windowState.x,
    y: windowState.y,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  if(windowState.isMaximized) {
    win.maximize();
  }
  windowState.track(win);
  //console.log(appConfig.file());

  win.loadFile('app/public/index.html');

  return win;
}

app.whenReady().then(() => {
  const win = createWindow();

  Menu.setApplicationMenu(null);  // hide menubar

  ipcMain.handle('openDialog', (event, type) => {
    switch(type) {
      case 'file':
        return dialog.showOpenDialogSync({
          properties: ['openFile', 'multiSelections'],
          filters: [
            { name: 'Text', extensions: ['txt'] },
          ]
        });
      case 'directory':
        return dialog.showOpenDialogSync({
          properties: ['openDirectory', 'multiSelections'],
        });
    }
  });

  ipcMain.on('getPath', (event, name) => {
    event.returnValue = app.getPath(name);
  });

  //console.log(app.getPath('userData')); // ort f??r user uploaded content

  // wenn kein Fenster offen ist, eines erstellen
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// [macOS] wenn alle Fenster geschlossen -> Programm beenden
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});