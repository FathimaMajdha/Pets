import React, { createContext, useContext, useState } from "react";

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <LayoutContext.Provider value={{ isSidebarOpen, setIsSidebarOpen , isSearchOpen, setIsSearchOpen }}>
      {children}
    </LayoutContext.Provider>
  );
};
