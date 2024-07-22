// src/components/Tabs.tsx
import React, { useState } from "react";
import AddIcon from "../../assets/icons/add-outline.svg";

interface TabsProps {
  tabs: string[];
  addNewTab: () => void;
}

const Tabs: React.FC = () => {
  const [tabs, setTabs] = useState(["Tab 1"]);

  const addNewTab = () => {
    setTabs([...tabs, `Tab ${tabs.length + 1}`]);
  };

  return (
    // outer div ensures that the tabs take up the remaining space in whatever view we use
    <div className="flex-1 overflow-hidden">
      <div className="flex overflow-hidden items-center h-8">
        {tabs.map((tab, index) => (
          //  outer div so that when you hover over tab, it does not colour all the way to tab border
          <div
            key={index}
            className="flex basis-40 justify-center items-center h-8 border-r px-1 border-gray-300"
          >
            <div
              className="h-7 basis-36 flex justify-center items-center text-sm whitespace-nowrap overflow-hidden text-ellipsis hover:bg-slate-300 rounded"
              title={tab}
            >
              {tab}
            </div>
          </div>
        ))}
        {/* add styling to button to ensure */}
        <button
          className="ml-2 hover:bg-slate-300 rounded flex items-center justify-center h-7 w-7 flex-shrink-0"
          onClick={addNewTab}
        >
          <img src={AddIcon} alt="Add icon" className="h-5 w-5" />
        </button>
        {/* <button
          className="ml-2 text-xl h-6 w-6 flex items-center justify-center hover:bg-slate-400"
          onClick={addNewTab}
        >
          <span>+</span>
        </button> */}
      </div>
    </div>
  );
};

export default Tabs;
