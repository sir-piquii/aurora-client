import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Home, User, FileText, LogOut, Award } from "lucide-react";

/**
 * Sidebar component for the dealer dashboard.
 *
 * Renders a sidebar with navigation links, a logo, and a logout button.
 * Navigation items are conditionally rendered based on the user's role.
 * Includes options for dealers, pending dealers, and users who can register as dealers.
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

  return (
    <aside
      className={`
      fixed lg:static top-32 bottom-0 left-0 z-[100]
      w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
      flex flex-col
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16">
        <div className="flex items-center">
          <span className="ml-2 text-xl text-gray-950 font-bold">
            My Dashboard
          </span>
        </div>
      </div>
      <hr />
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={closeSideBar}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
              location.pathname === item.path
                ? "bg-gray-800 text-orange-500"
                : "text-gray-800"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}

        {!isDealer && !isPendingDealer && (
          <Link
            to="/dealer/register"
            className="flex items-center p-3 mt-6 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            <Award size={20} className="mr-3" />
            <span>Become a Dealer</span>
          </Link>
        )}

        {isPendingDealer && (
          <div className="flex items-center p-3 mt-6 rounded-lg bg-yellow-100 text-yellow-800">
            <span className="text-sm">Verification in progress</span>
          </div>
        )}
      </nav>

      {/* Profile Section */}

      {/* Logout */}
      <button className="flex items-center p-4 text-gray-300 hover:text-white transition-colors border-t border-gray-800">
        <LogOut size={20} className="mr-3" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
/* <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={20} className="text-gray-300" />
            </div>
          )}
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">
              {user.role === 2 ? "Verified Dealer" : "Regular User"}
            </p>
          </div>
        </div>
      </div> */
