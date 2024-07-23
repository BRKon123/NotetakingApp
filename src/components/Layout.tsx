import React, { useState } from "react";
import LeftSidebarIcon from "../assets/icons/left-sidebar.svg";
import RightSidebarIcon from "../assets/icons/right-sidebar.svg";
import DefaultPage from "./maincontent/DefaultPage";
import Tabs from "./header/Tabs";

const Layout: React.FC = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <div
      className="h-screen grid grid-rows-[auto_1fr] grid-cols-[auto_auto_1fr_auto]"
      style={{
        gridTemplateAreas: `
          ". . header ."
          "leftSidebarMenu leftSidebar mainContent rightSidebar"
        `,
      }}
    >
      {/* Header */}
      <header
        className="bg-gray-50 px-2 pt-3 flex justify-between items-center border-b border-gray-300 overflow-hidden"
        style={{ gridArea: "header" }}
      >
        <div className="h-6 w-6 mr-4">
          <button onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}>
            <img
              src={LeftSidebarIcon}
              alt="Toggle Left Sidebar"
              className="h-6 w-6"
            />
          </button>
        </div>
        <Tabs />
        <div className="h-6 w-6 ml-4">
          <button onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}>
            <img
              src={RightSidebarIcon}
              alt="Toggle Right Sidebar"
              className="h-6 w-6"
            />
          </button>
        </div>
      </header>

      {/* Left Sidebar Menu, fixed width */}
      <div
        className="bg-gray-100 p-4 w-8 border-r border-gray-300"
        style={{ gridArea: "leftSidebarMenu" }}
      ></div>

      {/* Left Sidebar, width adjustable */}
      <div
        className={`bg-gray-100 transition-all duration-300 ${
          isLeftSidebarOpen ? "w-64 border-r border-gray-300" : "w-0"
        }`}
        style={{ gridArea: "leftSidebar" }}
      ></div>

      {/* Main Content */}
      <main className="bg-white p-4" style={{ gridArea: "mainContent" }}>
        <DefaultPage />
      </main>

      {/* Right Sidebar, width adjustable, content is scrollable */}
      <div
        className={`bg-gray-100 transition-all duration-300 ${
          isRightSidebarOpen ? "w-64 border-l border-gray-300" : "w-0"
        }`}
        style={{ gridArea: "rightSidebar" }}
      ></div>
    </div>
  );
};

export default Layout;
