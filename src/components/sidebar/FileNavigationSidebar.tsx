import React from "react";
import useFileOperations from "../../hooks/useFileOperations";
import CreateIcon from "../../assets/icons/create-outline.svg";
import ReorderIcon from "../../assets/icons/reorder-outline.svg";

const FileNavigationSidebar = () => {
  const { files, createFile, deleteFile } = useFileOperations();

  return (
    <div className="border border-gray-300 p-4 overflow-hidden">
      <div className="flex justify-between mb-4">
        <button
          className="text-white py-1 px-3 rounded hover:bg-slate-300"
          onClick={() => createFile("string.txt")}
        >
          <img src={CreateIcon} alt="Create new file" className="h-6 w-6" />
        </button>
        <button
          className="text-white py-1 px-3 rounded hover:bg-slate-300"
          onClick={() => createFile("string.txt")}
        >
          <img src={ReorderIcon} alt="Change sort order" className="h-6 w-6" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {files.map((file) => (
          <div
            key={file.fileName}
            className="flex justify-between items-center py-2 border-b border-gray-200"
          >
            <span>{file.fileName}</span>
            <button
              className="text-red-500 hover:underline"
              onClick={() => deleteFile(file.fileName)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileNavigationSidebar;
