// hook which abstract out all things related to file operations, manages all the related state and side effects
import { useState, useCallback } from "react";
import {
  createFileInFileSystem,
  deleteFileInFileSystem,
} from "../utils/fileSystemOperations";
import FileInfo from "../models/FileInfo";
import { useVaultContext } from "../context/VaultContext";
import { useFileContext } from "../context/FileContext";

// use callback to ensure that same function used unless the vault path changes
const useFileOperations = () => {
  const { vaultInfo } = useVaultContext();
  const { files, addFile, removeFile } = useFileContext();

  const createFile = useCallback(
    async (fileName: string) => {
      const newFile = await createFileInFileSystem(
        vaultInfo.vaultPath,
        fileName
      );
      addFile(newFile.fileName);
    },
    [vaultInfo.vaultPath]
  );

  const deleteFile = useCallback(
    async (fileName: string) => {
      await deleteFileInFileSystem(vaultInfo.vaultPath, fileName);
      removeFile(fileName);
    },
    [vaultInfo.vaultPath]
  );

  return {
    files,
    createFile,
    removeFile,
  };
};

export default useFileOperations;
