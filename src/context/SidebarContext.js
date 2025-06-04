import { createContext, useState, useEffect } from "react";

export const SidebarContext = createContext({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set initial state based on screen size
    setIsOpen(window.innerWidth >= 1024);
    let lastIsDesktop = window.innerWidth >= 1024;
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      // Only open sidebar if switching from mobile to desktop
      if (isDesktop && !lastIsDesktop) {
        setIsOpen(true);
      }
      lastIsDesktop = isDesktop;
    };
    window.addEventListener("resize", handleResize);
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
