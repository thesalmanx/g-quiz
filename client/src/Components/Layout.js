import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useToken } from "../Hooks/useToken";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

export default function Layout() {
  const [showSidebarElement, setShowSidebarElement] = useState(true);
  const [addNew, setAddNew] = useState(false);

  const handleAddNew = () => {
    setAddNew(true);
  };

  const handleSidebarToggle = () => {
    setShowSidebarElement((prev) => !prev);
  };

  const isToken = useToken();

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #845589, #161623)",
      }}
    >
      {/* Navbar */}
      <NavBar onToggleSidebar={handleSidebarToggle} />

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar showElement={showSidebarElement} />

        {/* Content Area */}
        <main className="flex-1 relative bg-gradient-to-br from-#1A2230-800 to-#AC4BAF-900 text-white p-8 rounded-tl-lg shadow-inner">
          {/* Add New Floating Button */}

          <Outlet />
        </main>
      </div>
    </div>
  );
}
