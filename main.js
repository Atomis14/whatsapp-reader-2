const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
require('electron-debug')({ showDevTools: true });


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
}

app.whenReady().then(() => {
  createWindow();

  Menu.setApplicationMenu(null);  // damit keine Menübar angezeigt wird

  // wenn kein Fenster offen ist, eines erstellen
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// [macOS] wenn alle Fenster geschlossen -> Programm beenden
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});