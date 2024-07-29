// FileContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import FileInfo from "../models/FileInfo";
import {
  createFileInFileSystem,
  deleteFileInFileSystem,
} from "../utils/fileSystemOperations";
import { useVaultContext } from "./VaultContext";

// Define the shape of the context state
interface FileContextProps {
  files: FileInfo[];
  addFile: (file: string) => void;
  removeFile: (fileName: string) => void;
}

// Create the context with default values
const FileContext = createContext<FileContextProps | undefined>(undefined);

// Create the provider component
const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { vaultInfo } = useVaultContext();
  const [files, setFiles] = useState<FileInfo[]>([]);

  const addFile = (fileName: string) => {
    const file: FileInfo = {
      fileName,
    };
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.fileName !== fileName)
    );
  };

  return (
    <FileContext.Provider value={{ files, addFile, removeFile }}>
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
