// FileContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import FileInfo from "../models/FileInfo";

// Define the shape of the context state
interface FileContextState {
  files: FileInfo[];
  addFile: (file: FileInfo) => void;
  removeFile: (fileName: string) => void;
}

// Create the context with default values
const FileContext = createContext<FileContextState | undefined>(undefined);

// Create the provider component
const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  const addFile = (file: FileInfo) => {
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
const useFileContext = (): FileContextState => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};

export { FileProvider, useFileContext };
