import React from "react";
import { useTabsContext } from "../../context/TabsContext";
import useFileOperations from "../../hooks/useFileOperations";

const DefaultPage: React.FC = () => {
  const { files, createFile } = useFileOperations();
  const { navigateActiveTab } = useTabsContext();
  const createNewNoteHandler = async () => {
    const newFileInfo = await createFile(`Untitiled ${files.length + 1}.md`);
    navigateActiveTab(newFileInfo); // Navigate to newly created note
  };

  const { tabs, activeTab, selectTab, addNewTab, closeTab } = useTabsContext(); // Hook up closeTab function from TabsContext
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-2xl font-bold mb-4">No file is open</h1>
      <div className="space-y-2 text-pink-500">
        <button
          className="block hover:underline"
          onClick={() => createNewNoteHandler()}
        >
          Create new note (⌘ N)
        </button>
        <button className="block hover:underline">Go to file (⌘ O)</button>
        <button className="block hover:underline">
          See recent files (⌘ O)
        </button>
        <button
          className="block hover:underline"
          onClick={(e) => closeTab(e, activeTab)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DefaultPage;
