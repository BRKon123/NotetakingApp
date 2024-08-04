import FileInfo from "../models/FileInfo";

export const createFileInFileSystem = async (
  filePath: string
): Promise<boolean> => {
  const fileCreated = await window.electronAPI.createFile(filePath);
  return fileCreated;
};

export const deleteFileInFileSystem = async (
  filePath: string
): Promise<boolean> => {
  const deletedFilePath = await window.electronAPI.deleteFile(filePath);
  return deletedFilePath;
};

export const loadFileInFileSystem = async (
  filePath: string
): Promise<string> => {
  const ipcResponse = await window.electronAPI.loadFile(filePath);
  console.log("response from loading: ", ipcResponse);
  return ipcResponse.success ? ipcResponse.content : ipcResponse.error;
};

export const listFilesInFileSystem = async (
  directoryPath: string
): Promise<FileInfo[]> => {
  const deletedFilePath = await window.electronAPI.listFiles(directoryPath);
  return deletedFilePath;
};
