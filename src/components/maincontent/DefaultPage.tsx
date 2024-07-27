import React from "react";
import { useTabs } from "../../context/TabsContext";

const DefaultPage: React.FC = () => {
  const { tabs, activeTab, selectTab, addNewTab, closeTab } = useTabs(); // Hook up closeTab function from TabsContext
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-2xl font-bold mb-4">No file is open</h1>
      <div className="space-y-2 text-pink-500">
        <button className="block hover:underline">Create new note (⌘ N)</button>
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
