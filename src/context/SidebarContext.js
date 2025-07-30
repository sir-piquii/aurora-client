import { createContext, useState, useEffect } from "react";

export const SidebarContext = createContext({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});
/**
 * Provides sidebar open/close state and controls to its children via context.
 *
 * - Initializes sidebar state based on screen size (open on desktop, closed on mobile).
 * - Listens for window resize events to automatically open sidebar when switching to desktop view.
 * - Exposes `isOpen`, `toggle`, and `close` methods through context.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components that will have access to the sidebar context.
 * @returns {JSX.Element} Sidebar context provider with state and controls.
 */
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
