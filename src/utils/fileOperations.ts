import { ipcRenderer } from "electron";
import path from "path";

export const deleteFile = async (vaultPath: string, fileName: string) => {
  const filePath = path.join(vaultPath, fileName);
  const deletedFile = await ipcRenderer.invoke("delete-file", filePath);
  return deletedFile;
};

export const openFile = async (vaultPath: string, fileName: string) => {
  const filePath = path.join(vaultPath, fileName);
  const newFile = await ipcRenderer.invoke("open-file", filePath);
  return newFile;
};
