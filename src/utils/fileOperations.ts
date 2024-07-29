import path from "path-browserify"; // can add polyfills to webpack for browser env, but this is easier lol

export const deleteFile = async (vaultPath: string, fileName: string) => {
  const filePath = path.join(vaultPath, fileName);
  const deletedFile = await window.electronAPI.deleteFile(filePath);
  return deletedFile;
};

export const createFile = async (vaultPath: string, fileName: string) => {
  const filePath = path.join(vaultPath, fileName);
  const newFile = await window.electronAPI.createFile(filePath);
  return newFile;
};
