import React, { createContext, useContext, useState } from "react";

interface File {
  fileName: string;
  filePath: string;
}

interface FileContextProps {
  files: File[];
  activeFile: number | null;
  addFile: (file: File) => void;
  deleteFile: (fileName: string) => void;
  openFile: (fileName: string) => void;
  closeFile: () => void;
}

const FileContext = createContext<FileContextProps | undefined>(undefined);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const vaultPath = "path/to/vault";
  const [files, setFiles] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState<number | null>(null);

  const addFile = (file: File) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const deleteFile = async (fileName: string) => {
    const deletedFile = await ipcRenderer.invoke("create-file", fileName);
  };

  const openFile = async (fileName: string) => {
    const newFile = await ipcRenderer.invoke("create-file", fileName);
  };

  const closeFile = () => {
    setActiveFile(null);
  };

  return (
    <FileContext.Provider
      value={{ files, activeFile, addFile, deleteFile, openFile, closeFile }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
