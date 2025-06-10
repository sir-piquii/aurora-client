import { useContext } from "react";
import { Menu, LogOut } from "lucide-react";
import { SidebarContext } from "../context/SidebarContext";
import { BASE_URL } from "../api";
/**
 * Navbar component for the admin dashboard.
 *
 * Renders a sticky header with:
 * - A sidebar toggle button (visible on mobile)
 * - The dashboard title
 * - User profile section with avatar and full name
 * - Logout button
 *
 * Avatar is generated using ui-avatars.com if no profile image is set.
 * Handles user logout by clearing localStorage and reloading the page.
 *
 * Context:
 * - Uses `SidebarContext` to toggle sidebar visibility.
 *
 * @component
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  const useSidebar = useContext(SidebarContext);
  const user = JSON.parse(localStorage.getItem("user")) ?? null;
  const fullName = user?.user?.fullName;
  const avatarUrl =
    user?.user.profile === "avatar" || !user?.user.profile
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.user.name || "User"
        )}&background=0D8ABC&color=fff`
      : `${BASE_URL}/profiles/${user.user.profile}`;
  const { toggle } = useSidebar;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
          className="lg:hidden p-2 rounded-lg text-navy-500 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        <div>
          <span className="font-bold text-blue-700">Admin Dashboard.</span>
        </div>
        {/* Right side navigation items */}
        <div className="flex items-center space-x-4">
          {/* User profile */}
          <div className="flex items-center">
            <a
              href="/admin/profile"
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100"
            >
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-600"
              />
              <span className="hidden md:inline-block text-sm font-medium text-navy-700">
                {fullName}
              </span>
            </a>
          </div>
          {/*Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              localStorage.removeItem("user");
              window.location.reload();
            }}
            className="p-1.5 rounded-lg text-navy-500 hover:bg-gray-100 relative"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
