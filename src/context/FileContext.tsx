import React, { createContext, useContext, useState } from "react";
import File from "../models/File";
import { useVaultContext } from "../context/VaultContext";

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
  const vaultPath = useVaultContext().vaultInfo.vaultPath;
  const [files, setFiles] = useState<File[]>([]);
  const [activeFile, setActiveFile] = useState<number | null>(null);

  const addFile = (file: File) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const deleteFile = async (fileName: string) => {
    const filePath = path.join(vaultPath, fileName);
    const deletedFile = await ipcRenderer.invoke("create-file", filePath);
  };

  const openFile = async (fileName: string) => {
    const filePath = path.join(vaultPath, fileName);
    const newFile = await ipcRenderer.invoke("create-file", filePath);
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
