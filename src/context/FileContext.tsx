// FileContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import FileInfo from "../models/FileInfo";
import { useVaultContext } from "./VaultContext";
import { listFilesInFileSystem } from "../utils/fileSystemOperations";

// Define the shape of the context state
interface FileContextProps {
  files: FileInfo[];
  setFilesState: (files: FileInfo[]) => void;
  addFileToState: (filename: string, filePath: string) => void;
  removeFileFromState: (fileName: string) => void;
}

// Create the context with default values
const FileContext = createContext<FileContextProps | undefined>(undefined);

// Create the provider component
const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { vaultInfo } = useVaultContext();
  const [files, setFilesState] = useState<FileInfo[]>([]);

  const addFileToState = (fileName: string, filePath: string) => {
    const file: FileInfo = {
      fileName,
      filePath,
    };
    setFilesState((prevFiles) => [...prevFiles, file]);
  };

  const removeFileFromState = (filePath: string) => {
    setFilesState((prevFiles) =>
      prevFiles.filter((file) => file.filePath !== filePath)
    );
  };

  return (
    <FileContext.Provider
      value={{
        files,
        setFilesState,
        addFileToState,
        removeFileFromState,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

// Custom hook to use the FileContext
const useFileContext = (): FileContextProps => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};

export { FileProvider, useFileContext };
