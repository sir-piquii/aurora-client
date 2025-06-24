import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import Logo from "./../logo.png";
import {
  LayoutDashboard,
  Package,
  Star,
  Newspaper,
  BookOpen,
  HelpCircle,
  Award,
  Trophy,
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  Shield,
  CheckCircle,
  X,
  ShoppingCart,
} from "lucide-react";
// side bar item
const SidebarItem = ({ item, isActive }) => {
  return (
    <li>
      <Link
        to={item.path}
        className={`
          flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200
          ${
            isActive
              ? "bg-orange-50 text-orange-600 border-l-4 border-orange-500 pl-3"
              : "text-navy-700 hover:bg-gray-50 hover:text-orange-500 transform hover:translate-x-1"
          }
        `}
      >
        <span
          className={`text-lg ${
            isActive ? "text-orange-500" : "text-navy-400"
          }`}
        >
          {item.icon}
        </span>
        <span className="font-medium">{item.name}</span>

        {/* Active indicator dot */}
        {isActive && (
          <span className="ml-auto">
            <span className="h-2 w-2 rounded-full bg-orange-500 block animate-pulse-subtle"></span>
          </span>
        )}
      </Link>
    </li>
  );
};
// side bar
/**
 * Sidebar component for the admin dashboard.
 *
 * Renders a responsive sidebar with navigation links, a logo, and a footer.
 * The sidebar can be toggled open or closed, and automatically closes on navigation
 * when viewed on mobile devices. Displays a backdrop overlay on mobile when open.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered sidebar component.
 *
 * @example
 * // Usage in a layout
 * <Sidebar />
 *
 * @remarks
 * - Uses `SidebarContext` for open/close state management.
 * - Uses `useLocation` from react-router for navigation detection.
 * - Menu items are defined statically within the component.
 * - Responsive design: fixed on desktop, slides in/out on mobile.
 */
const Sidebar = () => {
  const { isOpen, close } = useContext(SidebarContext);
  console.log(isOpen);
  const location = useLocation();
  // Close sidebar on navigation in mobile view
  useEffect(() => {
    if (window.innerWidth < 1024) {
      close();
    }
  }, [location.pathname, close]);
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={20} /> },
    {
      name: "Featured Products",
      path: "/admin/featured-products",
      icon: <Star size={20} />,
    },
    {
      name: "Articles",
      path: "/admin/articles",
      icon: <Newspaper size={20} />,
    },
    { name: "Blogs", path: "/admin/blogs", icon: <BookOpen size={20} /> },
    { name: "FAQs", path: "/admin/faqs", icon: <HelpCircle size={20} /> },
    {
      name: "Certificates",
      path: "/admin/certificates",
      icon: <Award size={20} />,
    },
    { name: "Awards", path: "/admin/awards", icon: <Trophy size={20} /> },
    {
      name: "Case Studies",
      path: "/admin/case-studies",
      icon: <Briefcase size={20} />,
    },
    { name: "Team", path: "/admin/team", icon: <Users size={20} /> },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Quotations",
      path: "/admin/quotations",
      icon: <FileText size={20} />,
    },
    {
      name: "Sales",
      path: "/admin/sales",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "User Management",
      path: "/admin/user-management",
      icon: <Shield size={20} />,
    },
    {
      name: "Dealer Verification",
      path: "/admin/dealers",
      icon: <CheckCircle size={20} />,
    },
  ];

  // Fixed position sidebar classes for large screens and absolute for mobile/tablet
  const sidebarClasses = `
    fixed h-full z-30 bg-white shadow-lg transition-all duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
    lg:w-64 w-[280px]
  `;

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-900/50 z-20 lg:hidden animate-fade-in"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Header with close button on mobile */}
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-2xl font-bold text-navy-900 flex items-center">
              <img src={Logo} alt="Logo" />
            </h2>
            <button
              onClick={close}
              className="lg:hidden p-1 rounded-full hover:bg-gray-100 text-gray-500"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  item={item}
                  isActive={location.pathname === item.path}
                />
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 mt-auto">
            <div className="bg-navy-50 p-3 rounded-lg text-navy-800 text-sm">
              <p className="font-medium">Admin Portal</p>
              <p className="text-xs mt-1 text-navy-600">© 2025 Aurora Energy</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
