// hook which abstract out all things related to file operations, manages all the related state and side effects
import { useEffect, useCallback } from "react";
import {
  createFileInFileSystem,
  deleteFileInFileSystem,
  listFilesInFileSystem,
} from "../utils/fileSystemOperations";
import { useVaultContext } from "../context/VaultContext";
import { useFileContext } from "../context/FileContext";
import path from "path-browserify"; // can add polyfills to webpack for browser env, but this is easier lol

// use callback to ensure that same function used unless the vault path changes
const useFileOperations = () => {
  const { vaultInfo } = useVaultContext();
  const { files, setFilesState, addFileToState, removeFileFromState } =
    useFileContext();

  listFilesInFileSystem(vaultInfo.vaultPath).then((files) => {
    console.log("Files in vault:", files);
  });

  useEffect(() => {
    const fetchFiles = async () => {
      const fileList = await listFilesInFileSystem(vaultInfo.vaultPath);
      setFilesState(fileList);
    };

    fetchFiles();
  }, [vaultInfo.vaultPath]);

  const createFile = useCallback(
    async (fileName: string) => {
      const filePath = path.join(vaultInfo.vaultPath, fileName);
      const fileCreated = await createFileInFileSystem(filePath);
      if (fileCreated) {
        addFileToState(fileName, filePath);
      }
    },
    [vaultInfo.vaultPath]
  );

  const deleteFile = useCallback(
    async (fileName: string) => {
      const filePath = path.join(vaultInfo.vaultPath, fileName);
      const fileDeleted = await deleteFileInFileSystem(filePath);
      if (fileDeleted) {
        removeFileFromState(filePath);
      }
    },
    [vaultInfo.vaultPath]
  );

  return {
    files,
    createFile,
    deleteFile,
  };
};

export default useFileOperations;
