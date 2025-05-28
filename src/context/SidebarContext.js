import React, { createContext, useState, useEffect } from "react";

export const SidebarContext = createContext({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize sidebar state based on screen size
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    // Set initial state
    handleResize();
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
};
