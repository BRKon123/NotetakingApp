import React from "react";
import useFileOperations from "../../hooks/useFileOperations";

const FileNavigationSidebar = () => {
  const { files, createFile, deleteFile } = useFileOperations();

  return (
    <div className="w-80 border border-gray-300 p-4">
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          onClick={() => createFile("string.txt")}
        >
          Add File
        </button>
        {/* Add other options here */}
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
