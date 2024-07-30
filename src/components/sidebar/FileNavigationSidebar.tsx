import React from "react";
import useFileOperations from "../../hooks/useFileOperations";
import CreateIcon from "../../assets/icons/create-outline.svg";
import ReorderIcon from "../../assets/icons/reorder-outline.svg";
import { useTabsContext } from "../../context/TabsContext";
import FileInfo from "../../models/FileInfo";

const FileNavigationSidebar = () => {
  const { files, createFile, deleteFile } = useFileOperations();
  const { tabs, activeTab, addNewTab, navigateActiveTab } = useTabsContext();

  const createNewNoteHandler = async () => {
    const newFileInfo = await createFile(`Untitiled ${files.length + 1}.md`);
    if (tabs[activeTab].filePath === null) {
      navigateActiveTab(newFileInfo); // Navigate to newly created note
    } else {
      addNewTab(newFileInfo);
    }
  };

  const selectFileButtonHandler = (fileInfo: FileInfo) => {
    navigateActiveTab(fileInfo);
  };

  const deleteFileButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    fileName: string
  ) => {
    event.stopPropagation(); //do try to select this file when delete
    deleteFile(fileName);
  };

  return (
    <div className="p-4 overflow-hidden">
      <div className="flex justify-between mb-4">
        <button
          className="text-white py-1 px-3 rounded hover:bg-slate-300"
          onClick={createNewNoteHandler}
        >
          <img src={CreateIcon} alt="Create new file" className="h-6 w-6" />
        </button>
        <button className="text-white py-1 px-3 rounded hover:bg-slate-300">
          <img src={ReorderIcon} alt="Change sort order" className="h-6 w-6" />
        </button>
      </div>
      <div className="overflow-y-auto">
        {files.map((file) => (
          <div key={file.filePath}>
            <div className="flex items-center py-1 px-2 border-b border-gray-200 hover:bg-slate-300 rounded-md text-sm">
              <button
                className="flex-grow text-left"
                onClick={() => selectFileButtonHandler(file)}
              >
                {file.fileName}
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => deleteFile(file.fileName)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileNavigationSidebar;
