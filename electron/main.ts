/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron';
import { download } from 'electron-dl';
import fs from 'fs';
import path from 'path';

require('update-electron-app')();

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath();

const isDarwin = process.platform === 'darwin';

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1200,
    height: 800,
    backgroundColor: '#000',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    titleBarStyle: 'hidden',
    roundedCorners: true,
  });
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const sendSenderError = (event: IpcMainEvent, error: string) => {
  event.sender.send('toast-error', error);
};

async function registerListeners() {
  ipcMain.on('minimize', () => {
    if (mainWindow?.isMinimizable()) {
      mainWindow?.minimize();
    }
  });

  ipcMain.on('close', () => {
    mainWindow?.close();
  });

  ipcMain.on('message', (_, message) => {
    console.log(message);
  });
  ipcMain.on('open-folder', event => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
      event.sender.send('sel-dir', result.filePaths);
    });
  });
  ipcMain.on(
    'move-to-new-folder-bookmark',
    (event, oldFolderPath, newFolderPath) => {
      try {
        const oldDirFiles = fs.readdirSync(oldFolderPath, {
          withFileTypes: true,
        });
        oldDirFiles
          .filter(file => file.isFile())
          .forEach(file => {
            fs.rename(
              path.join(oldFolderPath, file.name),
              path.join(newFolderPath, file.name),
              error => {
                if (error) {
                  // TODO: Try event again
                  sendSenderError(
                    event,
                    'Error moving your bookmarks to new folder.',
                  );
                }
              },
            );
          });
      } catch (e) {
        // TODO: Try event again
        console.log(e);
        sendSenderError(event, 'Error moving your bookmarks to new folder.');
      }
    },
  );
  ipcMain.on(
    'toggle-bookmark',
    async (event, thumb, folderPath, alreadyExists) => {
      const defaultError = 'Error bookmarking this wallpaper.';
      try {
        if (mainWindow) {
          const fileId = thumb.id;
          const fileType = thumb.file_type.split('/')[1];
          const fileName = `${fileId}.${fileType}`;
          const fullPath = `${folderPath}/${fileName}`;
          const existFile = fs.existsSync(fullPath);

          if (alreadyExists && existFile) {
            try {
              fs.unlinkSync(fullPath);
            } catch {
              // TODO: Try event again
              sendSenderError(
                event,
                'Error removing file from bookmark folder.',
              );
            }
          } else if (!alreadyExists && !existFile) {
            try {
              await download(mainWindow, thumb.path, {
                directory: folderPath,
                filename: fileName,
                onProgress: e => {
                  const percent = Math.round(e.percent * 100);
                  event.sender.send('bookmark-download-progress', {
                    id: thumb.id,
                    progress: percent,
                  });
                },
                onCompleted: () =>
                  event.sender.send('bookmark-downloaded', {
                    id: thumb.id,
                  }),
              });
              event.sender.send('check-downloaded-bookmarks', [thumb.id]);
            } catch {
              // TODO: Try event again
              sendSenderError(
                event,
                'Error downloading file to bookmark folder.',
              );
            }
          }
        } else {
          sendSenderError(event, defaultError);
        }
      } catch {
        sendSenderError(event, defaultError);
      }
    },
  );
  ipcMain.on('check-downloaded-bookmarks', (event, folderPath) => {
    try {
      const dirFiles = fs.readdirSync(folderPath, { withFileTypes: true });
      const downloadedBookmarks = dirFiles
        .filter(file => file.isFile())
        .map(file => file.name.split('.')[0]);
      event.sender.send('check-downloaded-bookmarks', downloadedBookmarks);
    } catch {
      event.sender.send('check-downloaded-bookmarks', []);
      // TODO: Handle error
    }
  });
}

app.disableHardwareAcceleration();

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (isDarwin) {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
