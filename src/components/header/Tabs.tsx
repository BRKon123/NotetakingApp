// src/components/Tabs.tsx
import React, { useState } from "react";
import { useTabs } from "../../context/TabsContext";
import AddIcon from "../../assets/icons/add-outline.svg";
import CloseIcon from "../../assets/icons/close-outline.svg";

interface TabsProps {
  tabs: string[];
  addNewTab: () => void;
}

const Tabs: React.FC = () => {
  const { tabs, activeTab, selectTab, addNewTab, closeTab } = useTabs(); // Hook up closeTab function from TabsContext
  const [hoveredTab, setHoveredTab] = useState<number | null>(null); //to control the styling of the tab we hover over
  console.log("tab no: ", activeTab);

  return (
    // outer div makes sure that the tabs take up the remaining space in whatever view we use
    <div className="flex-1 overflow-hidden">
      <div className="flex overflow-hidden items-center h-8">
        {tabs.map((tab, index) => (
          // outer div so that when you hover over tab, it does not colour all the way to tab border
          // active tab gets border on top that is rounded
          // tabs other than one to left of active get a right border
          <div
            key={index}
            className={`flex basis-40 justify-center items-center h-8 px-1 border-gray-300 overflow-hidden ${
              (activeTab === index &&
                "bg-white border-t border-l border-r rounded-t-md") ||
              (activeTab !== index + 1 && "border-r")
            } `}
          >
            {/* if not active tab then become grey when we hover the tab */}
            <div
              className={`h-7 basis-36 flex items-center justify-between text-sm rounded overflow-hidden ${
                activeTab !== index && "hover:bg-slate-300"
              }`}
              onMouseEnter={() => setHoveredTab(index)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => selectTab(index)}
              title={tab.fileName}
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {tab.fileName}
              </span>
              {/* if this is the button we are hovering over, show close button */}
              {index === hoveredTab && (
                <button
                  className="justify-center items-center flex-shrink-0"
                  onClick={(e) => closeTab(e, index)}
                >
                  <img
                    src={CloseIcon}
                    alt="Close tab"
                    className="h-5 w-5 flex-shrink-0"
                  />
                </button>
              )}
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
      </div>
    </div>
  );
};

export default Tabs;
