// See the Electron documentation for details on how to use preload scripts:

import IpcResponse from "./models/IpcResponse";
import FileInfo from "./models/FileInfo";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

export const electronAPI = {
  createFile: (filePath: string): Promise<boolean> =>
    ipcRenderer.invoke("create-file", filePath),
  deleteFile: (filePath: string): Promise<boolean> =>
    ipcRenderer.invoke("delete-file", filePath),
  listFiles: (directoryPath: string): Promise<FileInfo[]> =>
    ipcRenderer.invoke("list-files", directoryPath),
  loadFile: (filePath: string): Promise<IpcResponse<string>> =>
    ipcRenderer.invoke("load-file", filePath),
  hello: () => console.log("hello from the electron API"),
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
