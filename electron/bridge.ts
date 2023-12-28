/* eslint-disable import/no-extraneous-dependencies */
import { ISearch } from '@/types';
import { contextBridge, ipcRenderer, shell } from 'electron';

export const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },

  openDialog: () => {
    ipcRenderer.send('open-folder');
  },

  changeBookmarkFolder: (oldFolderPath: string, newFolderPath: string) => {
    ipcRenderer.send(
      'move-to-new-folder-bookmark',
      oldFolderPath,
      newFolderPath,
    );
  },

  toggleBookmark: (
    thumb: ISearch,
    folderPath: string,
    alreadyExists: boolean,
  ) => {
    ipcRenderer.send('toggle-bookmark', thumb, folderPath, alreadyExists);
  },

  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  close: () => {
    ipcRenderer.send('close');
  },

  minimize: () => {
    ipcRenderer.send('minimize');
  },

  platform: process.platform,

  checkDownloadedBookmarks: (downloadsPath: string) => {
    ipcRenderer.send('check-downloaded-bookmarks', downloadsPath);
  },

  openBrowser: (url: string) => {
    shell.openExternal(url);
  },
};

contextBridge.exposeInMainWorld('Main', api);
