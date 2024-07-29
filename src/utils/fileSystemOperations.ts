import path from "path-browserify"; // can add polyfills to webpack for browser env, but this is easier lol
import FileInfo from "../models/FileInfo";

export const deleteFileInFileSystem = async (
  filePath: string
): Promise<string> => {
  const deletedFilePath = await window.electronAPI.deleteFile(filePath);
  return deletedFilePath;
};

export const createFileInFileSystem = async (
  filePath: string
): Promise<boolean> => {
  const fileCreated = await window.electronAPI.createFile(filePath);
  return fileCreated;
};
