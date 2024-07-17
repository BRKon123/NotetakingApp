import React, { useState } from "react";
import LeftSidebarIcon from "../assets/icons/left-sidebar.svg";
import RightSidebarIcon from "../assets/icons/right-sidebar.svg";

const Layout: React.FC = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-[auto_auto_1fr_auto]">
      {/* Header */}
      <header className="col-span-4 bg-gray-200 p-4 flex justify-between items-center">
        <div>
          <button onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}>
            <img
              src={LeftSidebarIcon}
              alt="Toggle Left Sidebar"
              className="h-6 w-6"
            />
          </button>
        </div>
        <div>Header with Tabs</div>
        <div>
          <button onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}>
            <img
              src={RightSidebarIcon}
              alt="Toggle Left Sidebar"
              className="h-6 w-6"
            />
          </button>
        </div>
      </header>

      {/* Left Sidebar Menu, fixed width */}
      <div className="bg-gray-200 p-4 w-8"></div>

      {/* Left Sidebar, width adjustable */}
      <div
        className={`bg-gray-100 transition-all duration-300 ${
          isLeftSidebarOpen ? "w-64" : "w-0"
        }`}
      ></div>

      {/* Main Content */}
      <main className="bg-white p-4 col-span-1">Main Content</main>

      {/* Right Sidebar, width adjustable, content is scrollable */}
      <div
        className={`bg-gray-100 transition-all duration-300 ${
          isRightSidebarOpen ? "w-64" : "w-0"
        }`}
      ></div>
    </div>
  );
};

export default Layout;
