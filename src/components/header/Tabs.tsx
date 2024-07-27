// src/components/Tabs.tsx
import React, { useState } from "react";
import AddIcon from "../../assets/icons/add-outline.svg";
import CloseIcon from "../../assets/icons/close-outline.svg";

interface TabsProps {
  tabs: string[];
  addNewTab: () => void;
}

const Tabs: React.FC = () => {
  const [tabs, setTabs] = useState(["Tab 1"]);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null); //to control the styling of the tab we hover over
  const [activeTab, setActiveTab] = useState<number | null>(0);
  console.log("tab no: ", activeTab);

  const addNewTab = () => {
    setTabs((tabs) => [...tabs, `Tab ${tabs.length + 1}`]);
    setActiveTab(tabs.length); // Set the newly added tab as active, remember tabs not updated yet, not until re render
  };

  const closeTab = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent div

    setTabs((tabs) => tabs.filter((_, i) => i !== index));

    if (tabs.length === 1) {
      addNewTab();
    } else if (index === activeTab) {
      setActiveTab(activeTab - 1); // Set the last tab as active, remember tabs not updated yet,
    } else {
      setActiveTab(tabs.length - 2); // Keep the active tab as it is
    }
  };

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
              onClick={() => setActiveTab(index)}
              title={tab}
            >
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {tab}
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
