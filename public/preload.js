const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Menu events
  onMenuNewTransaction: (callback) => {
    ipcRenderer.on('menu-new-transaction', callback);
  },
  
  // System info
  platform: process.platform,
  
  // App version
  getVersion: () => {
    return process.env.npm_package_version || '1.0.0';
  },

  // Secure file operations (if needed in the future)
  openPath: (path) => {
    ipcRenderer.invoke('shell:openPath', path);
  },

  // Window controls
  minimize: () => {
    ipcRenderer.invoke('window:minimize');
  },
  
  maximize: () => {
    ipcRenderer.invoke('window:maximize');
  },
  
  close: () => {
    ipcRenderer.invoke('window:close');
  },

  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

// Log that preload script is loaded
console.log('Preload script loaded successfully');