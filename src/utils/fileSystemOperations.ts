import path from "path-browserify"; // can add polyfills to webpack for browser env, but this is easier lol
import FileInfo from "../models/FileInfo";

export const deleteFileInFileSystem = async (
  vaultPath: string,
  fileName: string
): Promise<string> => {
  const filePath = path.join(vaultPath, fileName);
  const deletedFilePath = await window.electronAPI.deleteFile(filePath);
  return deletedFilePath;
};

export const createFileInFileSystem = async (
  vaultPath: string,
  fileName: string
): Promise<FileInfo> => {
  const filePath = path.join(vaultPath, fileName);
  const newFile = await window.electronAPI.createFile(filePath);
  return newFile;
};
