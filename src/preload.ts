// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

export const electronAPI = {
  createFile: (filePath: string) => ipcRenderer.invoke("create-file", filePath),
  deleteFile: (filePath: string) => ipcRenderer.invoke("delete-file", filePath),
  hello: () => console.log("hello from the electron API"),
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
