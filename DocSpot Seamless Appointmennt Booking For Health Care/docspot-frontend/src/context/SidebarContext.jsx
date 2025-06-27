// src/context/SidebarContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Load sidebar state from localStorage (default true)
    const saved = localStorage.getItem("sidebar-open");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Toggle function
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, setSidebarOpen: setIsSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Hook to use in components
export const useSidebar = () => useContext(SidebarContext);
