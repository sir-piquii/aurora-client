import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Sidebar from "../admin/Sidebar";
import Navbar from "../admin/Navbar";
import { Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import ProtectedRoute from "../router/ProtectedRoute";
import FloatingTourButton from "../components/tours/FloatingTourButton";

/**
 * AdminLayout is a protected layout component for the admin section of the application.
 * It provides a sidebar, top navigation bar, main content area, and footer.
 * 
 * Features:
 * - Wraps content in a ProtectedRoute to ensure only authorized users can access.
 * - Displays a Sidebar for navigation (visible on large screens).
 * - Renders a Navbar at the top of the main content area.
 * - Uses <Outlet /> to render nested routes/pages.
 * - Includes a Toaster for notifications.
 * - Shows a footer with copyright.
 * - Provides a floating button to toggle the sidebar on mobile devices.
 * 
 * @component
 * @returns {JSX.Element} The admin layout structure with sidebar, navbar, content, and footer.
 */
const AdminLayout = () => {
  const { toggle } = useSidebar();
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 w-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
          {/* Top Navigation */}
          <Navbar />
          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Outlet />
            <Toaster />
          </main>
          {/* Footer */}
          <footer className="border-t border-gray-100 p-4 text-center text-sm text-gray-500">
            © 2025 Aurora Energy. All rights reserved.
          </footer>
        </div>
        {/* Mobile menu button - fixed at bottom corner for easy access */}
        <button
          onClick={toggle}
          className="lg:hidden fixed bottom-4 right-4 p-3 rounded-full bg-orange-500 text-white shadow-lg z-50 hover:bg-orange-600 active:transform active:scale-95 transition-all"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        {/* Floating Tour Button */}
        <FloatingTourButton userRole="admin" />
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
