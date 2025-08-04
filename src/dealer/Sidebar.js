import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Home, User, FileText, LogOut, Award, X, Book } from "lucide-react";

/**
 * Sidebar component for the dealer dashboard.
 *
 * Renders a sidebar with navigation links, a logo, and a logout button.
 * Navigation items are conditionally rendered based on the user's role.
 * Includes options for dealers, pending dealers, and users who can register as dealers.
 * Updated to work with fixed navbar positioning and improved mobile experience.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isSidebarOpen - Determines if the sidebar is open (visible) on mobile.
 * @param {Function} props.closeSideBar - Function to close the sidebar (used on navigation link click).
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
const Sidebar = ({ isSidebarOpen, closeSideBar }) => {
  const location = useLocation();
  const useAuth = useContext(AuthContext);
  const { user: userData } = useAuth;
  const isDealer = userData.user?.role_id === 2;
  const isPendingDealer = false;

  const navItems = [
    { name: "Home", path: "/dealer", icon: <Home size={20} /> },
    { name: "Profile", path: "/dealer/profile", icon: <User size={20} /> },
    { name: "Help Manual", path: "/dealer/manual", icon: <Book size={20} /> },
    ...(isDealer
      ? [
          {
            name: "Quotations",
            path: "/dealer/quotations",
            icon: <FileText size={20} />,
          },
        ]
      : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <aside
      className={`

        w-64 h-full bg-white shadow-xl flex flex-col border-r border-gray-200
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0 z-30" : "-translate-x-full"}
      `}
    >
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-blue-50">
        <span className="text-xl font-bold text-gray-800 tracking-wide">
          Dashboard
        </span>
        <button
          onClick={closeSideBar}
          className="lg:hidden p-1 rounded-md hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* User Info Section */}
      <div className="px-4 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {userData.user?.fullName?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userData.user?.fullName || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {isDealer ? "Dealer" : "Member"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={closeSideBar}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg group transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-orange-500 to-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 hover:text-gray-900"
              }
            `}
          >
            <span
              className={`transition-colors ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-500 group-hover:text-orange-500"
              }`}
            >
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}

        {/* Dealer Registration Section */}
        <div className="pt-6">
          {!isDealer && !isPendingDealer && (
            <Link
              to="/dealer/register"
              onClick={closeSideBar}
              className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-blue-600 text-white font-semibold shadow-lg hover:from-orange-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <Award size={20} />
              <span>Become a Dealer</span>
            </Link>
          )}

          {isPendingDealer && (
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-yellow-100 text-yellow-800 font-medium border border-yellow-200">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Verification in progress</span>
            </div>
          )}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-lg font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;