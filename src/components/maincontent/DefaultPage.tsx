import React from "react";
import { useTabsContext } from "../../context/TabsContext";
import { useVaultContext } from "../../context/VaultContext";
import { createFile } from "../../utils/fileOperations";

const DefaultPage: React.FC = () => {
  const { vaultInfo } = useVaultContext();

  const { tabs, activeTab, selectTab, addNewTab, closeTab } = useTabsContext(); // Hook up closeTab function from TabsContext
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-2xl font-bold mb-4">No file is open</h1>
      <div className="space-y-2 text-pink-500">
        <button
          className="block hover:underline"
          onClick={() => createFile(vaultInfo.vaultPath, "newly.txt")}
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
