import React, { createContext, useContext, useState } from "react";

interface TabsContextProps {
  tabs: string[];
  activeTab: number;
  selectTab: (index: number) => void;
  addNewTab: () => void;
  closeTab: (event: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const useTabs = () => {
  const context = useContext<TabsContextProps | undefined>(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context as TabsContextProps;
};

export const TabsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tabs, setTabs] = useState(["Tab 1"]);
  const [activeTab, setActiveTab] = useState<number>(0);

  const addNewTab = () => {
    setTabs((tabs) => [...tabs, `Tab ${tabs.length + 1}`]);
    setActiveTab(tabs.length);
  };

  const closeTab = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation(); // don't call addNewTab when close button is clicked

    //if only one tab left, do nothing
    if (tabs.length !== 1) {
      setTabs((tabs) => tabs.filter((_, i) => i !== index));
      if (index <= activeTab) {
        setActiveTab(activeTab - 1);
      }
    }
  };

  const selectTab = (index: number) => {
    if (index != activeTab) {
      setActiveTab(index);
    }
  };

  // set the context of this tabs provider
  return (
    <TabsContext.Provider
      value={{
        tabs,
        activeTab,
        selectTab,
        addNewTab,
        closeTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
