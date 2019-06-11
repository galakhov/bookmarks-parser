import { app, BrowserWindow, dialog } from 'electron' // eslint-disable-line
const fs = require('fs');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow = null;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

// export
const getFilesInFolders = () => {
  const files = dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    buttonLabel: 'Select bookmarks',
    title: 'Selecting bookmarks',
    filters: [
      { name: 'HTML Files', extensions: ['html', 'htm'] },
      // { name: 'Archive Files', extensions: ['zip', 'rar'] },
    ],
  });

  if (!files) return;

  const file = files[0];

  const content = fs.readFileSync(file).toString();

  console.log(content);
};

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    useContentSize: true,
    titleBarStyle: 'hiddenInset',
    show: false,
    frame: false,
    fullscreenable: false,
    webPreferences: {
      backgroundThrottling: false,
    },
  });

  mainWindow.loadURL(winURL);

  getFilesInFolders();

  mainWindow.setVisibleOnAllWorkspaces(true); // put the window on all screens
  mainWindow.focus(); // focus the window up front on the active screen
  mainWindow.setVisibleOnAllWorkspaces(false); // disable all screen behavior

  // to avoid a blank flashing page on start
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
