import { ipcRenderer } from "electron";
import path from "path";

export const deleteFile = async (vaultPath: string, fileName: string) => {
  const filePath = path.join(vaultPath, fileName);
  const deletedFile = await ipcRenderer.invoke("delete-file", filePath);
  return deletedFile;
};

export const createFile = async (vaultPath: string, fileName: string) => {
  const filePath = path.join(vaultPath, fileName);
  const newFile = await ipcRenderer.invoke("create-file", filePath);
  return newFile;
};
