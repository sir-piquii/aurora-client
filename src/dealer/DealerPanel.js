import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { DealerProvider } from "../context/DealerContext";
import Sidebar from "./Sidebar";
import Quotations from "./components/Quotations";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import { Toaster } from "sonner";
import DealerRegPortal from "./components/DealerRegPortal";
import Orders from "./components/Orders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DealerManualPage from "./components/DealerManualPage";

/**
 * DealerPanel component serves as the main layout for the dealer registration section.
 * 
 * - Sets the document title to "Dealer Registration" on mount.
 * - Manages the sidebar open/close state for responsive navigation.
 * - Provides a toggle button for the sidebar, visible on small screens.
 * - Wraps content with DealerProvider for context management.
 * - Renders a Sidebar and main content area with nested routes:
 *    - Dashboard (default)
 *    - LandingPage (index)
 *    - Profile
 *    - DealerRegPortal (register)
 *    - Quotations
 *    - Orders
 * - Displays toast notifications via the Toaster component.
 * - Updated to work with fixed navbar and provide proper scrolling
 * 
 * @component
 * @returns {JSX.Element} The rendered DealerPanel layout with sidebar and routed content.
 */
function DealerPanel() {
  useEffect(() => {
    document.title = "Dealer Registration";
  }, []);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed on mobile

  return (
    <DealerProvider>
      <div className="relative flex min-h-screen">
        {/* Sidebar - fixed on the left, positioned below navbar */}
        <div className="fixed top-[118px] left-0 h-[calc(100vh-118px)] z-40">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            closeSideBar={() => {
              setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-12 top-[118px]"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Toggle button for sidebar (on small screens) */}
        <button
          className={`lg:hidden fixed top-[150px] left-2 ${isSidebarOpen ? "z-0": "z-40"} p-2 rounded-md bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft size={20} className="text-gray-600" />
          ) : (
            <ChevronRight size={20} className="text-gray-600" />
          )}
        </button>

        {/* Main content area */}
        <div className="flex-1 lg:ml-64 min-h-[calc(100vh-118px)] mt-[20px]">
          <div className="h-full overflow-y-auto">
            <div className="p-4 lg:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />}>
                  <Route index element={<LandingPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="register" element={<DealerRegPortal />} />
                  <Route path="quotations/" element={<Quotations />} />
                  <Route path="orders/" element={<Orders />} />
                  <Route path="manual/" element={<DealerManualPage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </DealerProvider>
  );
}

export default DealerPanel;
