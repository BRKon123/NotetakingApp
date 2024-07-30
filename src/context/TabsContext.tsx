import React, { createContext, useContext, useState } from "react";
import TabInfo from "../models/TabInfo";

interface TabsContextProps {
  tabs: TabInfo[];
  activeTab: number;
  selectTab: (index: number) => void;
  navigateActiveTab: (tabInfo: TabInfo) => void;
  addNewDefaultTab: () => void;
  addNewTab: (tabInfo: TabInfo) => void;
  closeTab: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const TabsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tabs, setTabs] = useState<TabInfo[]>([
    { fileName: "Default Tab", filePath: null },
  ]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const addNewDefaultTab = () => {
    addNewTab({ fileName: "Default Tab", filePath: null });
  };

  const addNewTab = (tabInfo: TabInfo) => {
    setTabs((tabs) => [...tabs, tabInfo]);
    setActiveTab(() => tabs.length);
  };

  const closeTab = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation(); // don't call addNewTab when close button is clicked

    if (tabs.length !== 1) {
      setTabs((tabs) => tabs.filter((_, i) => i !== index));
      if (index <= activeTab && index > 0) {
        setActiveTab(() => activeTab - 1);
      }
    } else {
      //if only one tab left make this default page
      setTabs((tabs) => [{ fileName: `Default Tab`, filePath: null }]);
    }
  };

  const selectTab = (index: number) => {
    if (index != activeTab) {
      setActiveTab(() => index);
    }
  };

  const navigateActiveTab = (tabInfo: TabInfo) => {
    setTabs((tabs) =>
      tabs.map((item, idx) => (idx === activeTab ? tabInfo : item))
    );
  };

  // set the context of this tabs provider
  return (
    <TabsContext.Provider
      value={{
        tabs,
        activeTab,
        selectTab,
        navigateActiveTab,
        addNewDefaultTab,
        addNewTab,
        closeTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const useTabsContext = () => {
  const context = useContext<TabsContextProps | undefined>(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context as TabsContextProps;
};
