import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  ChevronDown,
  X,
  ShoppingCart,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import Logo from "./../logo.png";
/**
 * Navbar component for Aurora Energy client.
 *
 * Renders a responsive navigation bar with:
 * - Top contact/social bar
 * - Main navigation links (Home, About, Products, Insights, Contact)
 * - Dropdown menus for Products and Insights (desktop and mobile)
 * - User authentication links (Login, Signup, Dashboard, Logout)
 * - Shopping cart icon with item count
 * - Admin-specific navbar when user is admin/super
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [insightsDropdownOpen, setInsightsDropdownOpen] = useState(false);
  const [mobileProductsDropdownOpen, setMobileProductsDropdownOpen] =
    useState(false);
  const [mobileInsightsDropdownOpen, setMobileInsightsDropdownOpen] =
    useState(false);
  const closeDropdownTimer = useRef(null);
  const insightsCloseTimer = useRef(null);
  // Dummy user logic; replace with real auth
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const fullName = user?.user?.fullName;
  const isAdmin = user?.user?.role === "admin" || user?.user?.role === "super";

  const [basketCount, setBasketCount] = useState(0);

  // Update basket count from localStorage
  const updateBasketCount = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart);
        const count = Array.isArray(cart.items)
          ? cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
          : 0;
        setBasketCount(count);
      } catch {
        setBasketCount(0);
      }
    } else {
      setBasketCount(0);
    }
  };

  useEffect(() => {
    updateBasketCount();
    const handleStorageChange = (e) => {
      if (e.key === "cart") updateBasketCount();
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", updateBasketCount);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", updateBasketCount);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setMobileProductsDropdownOpen(false);
    setMobileInsightsDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (closeDropdownTimer.current) {
      clearTimeout(closeDropdownTimer.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeDropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleInsightsMouseEnter = () => {
    if (insightsCloseTimer.current) {
      clearTimeout(insightsCloseTimer.current);
    }
    setInsightsDropdownOpen(true);
  };

  const handleInsightsMouseLeave = () => {
    insightsCloseTimer.current = setTimeout(() => {
      setInsightsDropdownOpen(false);
    }, 200);
  };

  const handleProductsClick = (e) => {
    if (!isDropdownOpen) {
      e.preventDefault();
      setIsDropdownOpen(true);
    }
  };

  const handleInsightsClick = (e) => {
    if (!insightsDropdownOpen) {
      e.preventDefault();
      setInsightsDropdownOpen(true);
    }
  };

  function getInitials(name) {
    if (!name) return "U";
    const names = name.trim().split(" ");
    const initials =
      names.length === 1
        ? names[0][0]
        : names[0][0] + names[names.length - 1][0];
    return initials.toUpperCase();
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.user?.name || "User"
  )}&background=f97316&color=fff`;

  // Admin navbar
  if (isAdmin) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-white to-blue-900 shadow-lg z-50 border-b border-orange-500">
        <div className="container mx-auto flex items-center justify-between p-4">
          <a href="/" className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              AE
            </div>
            <span className="ml-2 text-xl font-bold text-blue-900">
              Aurora Energy
            </span>
          </a>
          <ul className="hidden md:flex space-x-6 text-white font-medium items-center">
            <li className="flex items-center space-x-3 px-3 py-1 rounded">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-blue-900">
                {user?.user?.fullName || "Admin"}
              </span>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
                className="bg-gradient-to-r from-blue-900 to-orange-500 px-4 py-2 rounded hover:from-blue-800 hover:to-orange-600 transition text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Top Orange Bar */}
      <div className="fixed top-0 left-0 w-full bg-orange-500 text-white z-[60] border-b border-orange-600">
        <div className="mx-auto flex justify-between items-center py-2 px-4 text-sm">
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/263771683662"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center space-x-1"
            >
              <MessageCircle size={16} />
              <span className="hidden md:inline">+263 771 683 662</span>
            </a>
            <a
              href="tel:+263242783999"
              className="flex items-center space-x-1 hover:underline"
            >
              <Phone size={16} />
              <span className="hidden md:inline">+263 242 783 999</span>
            </a>
            <a
              href="mailto:info@auroraenergy.co.zw"
              className="flex items-center space-x-1 hover:underline"
            >
              <Mail size={16} />
              <span className="hidden md:inline">info@auroraenergy.co.zw</span>
            </a>
          </div>
          <div className="flex space-x-3">
            <a
              href="https://www.facebook.com/share/15imcziZ2b/"
              className="hover:text-blue-900 transition"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://x.com/AuroraEnergyZW?s=09"
              className="hover:text-blue-900 transition"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://www.instagram.com/auroraenergyzimbabwe?igsh=MXNpOTFvZnRubTljcQ=="
              className="hover:text-blue-900 transition"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com/company/aurora-energy1/"
              className="hover:text-blue-900 transition"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://youtube.com/@auroraenergyzimbabwe?si=huqdG42TA1NBS8Iy"
              className="hover:text-blue-900 transition"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="fixed top-[42px] left-0 w-full bg-gradient-to-r from-white to-blue-900 shadow-lg z-50 border-b border-orange-500 transition-all duration-300">
        <div className="mx-auto flex items-center justify-between py-3 px-4">
          <a href="/" className="flex items-center">
            <img className="w-[175px]" src={Logo} alt="Aurora Energy" />
          </a>
          {/* Mobile Toggle */}
          <button
            className="md:hidden focus:outline-none p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={24} className="text-orange-500" />
            ) : (
              <Menu size={24} className="text-orange-500" />
            )}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-2 text-blue-900 font-semibold items-center">
            <li>
              <a
                href="/"
                className="px-3 py-2 rounded hover:bg-orange-100 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="px-3 py-2 rounded hover:bg-orange-100 transition"
              >
                About Us
              </a>
            </li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <a
                  href="/products"
                  onClick={handleProductsClick}
                  className="px-3 py-2 rounded hover:bg-orange-100 transition"
                >
                  Products
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDropdownOpen((prev) => !prev);
                  }}
                  className="ml-1 p-1"
                >
                  <ChevronDown size={16} className="hover:text-orange-500" />
                </button>
              </div>

              {/* Products Dropdown */}
              <div
                className={`absolute left-0 top-full mt-2 w-56 bg-white shadow-xl rounded-lg py-2 z-50 border border-orange-100 transition-all duration-200 ${
                  isDropdownOpen
                    ? "opacity-100 visible transform translate-y-0"
                    : "opacity-0 invisible transform -translate-y-2"
                }`}
              >
                {[
                  "Solar Panels",
                  "Hybrid Inverters",
                  "Energy Storage",
                  "Mounting Equipment",
                  "Cabling",
                  "Accessories",
                  "Switch Gear",
                ].map((item, i) => (
                  <a
                    key={i}
                    href={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </li>
            <li
              className="relative"
              onMouseEnter={handleInsightsMouseEnter}
              onMouseLeave={handleInsightsMouseLeave}
            >
              <div className="flex items-center">
                <a
                  href="/insights"
                  onClick={handleInsightsClick}
                  className="px-3 py-2 rounded hover:bg-orange-100 transition"
                >
                  Insights & News
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setInsightsDropdownOpen((prev) => !prev);
                  }}
                  className="ml-1 p-1"
                >
                  <ChevronDown size={16} className="hover:text-orange-500" />
                </button>
              </div>

              {/* Insights Dropdown */}
              <div
                className={`absolute left-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-50 border border-orange-100 transition-all duration-200 ${
                  insightsDropdownOpen
                    ? "opacity-100 visible transform translate-y-0"
                    : "opacity-0 invisible transform -translate-y-2"
                }`}
              >
                <a
                  href="/blogs"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                >
                  Blogs
                </a>
                <a
                  href="/case-studies"
                  className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                >
                  Case Studies
                </a>
              </div>
            </li>
            <li>
              <a
                href="/contact"
                className="px-3 py-2 rounded hover:bg-orange-100 transition"
              >
                Contact Us
              </a>
            </li>

            {/* Auth Links */}
            {!user ? (
              <>
                <li>
                  <a
                    href="/login"
                    className="bg-gradient-to-r from-orange-500 to-blue-900 px-4 py-2 rounded hover:from-orange-600 hover:to-blue-800 text-white shadow transition"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/signup"
                    className="bg-gradient-to-r from-blue-900 to-orange-500 px-4 py-2 rounded hover:from-blue-800 hover:to-orange-600 text-white shadow transition"
                  >
                    Sign Up
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center bg-gradient-to-r from-orange-500 to-blue-900 px-3 py-2 rounded hover:from-orange-600 hover:to-blue-800 text-white shadow transition">
                  <a
                    href="/dealer"
                    className="text-white font-semibold flex items-center"
                  >
                    Dashboard
                  </a>
                  <div className="ml-2 w-6 h-6 rounded-full bg-white text-blue-900 flex items-center justify-center text-xs font-semibold shadow">
                    {getInitials(fullName)}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                    className="bg-gradient-to-r from-blue-900 to-orange-500 px-3 py-2 rounded hover:from-blue-800 hover:to-orange-600 transition text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            <li>
              <a
                href="/cart"
                className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-orange-100 transition relative"
              >
                <ShoppingCart size={18} />
                {basketCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {basketCount}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white border-t border-orange-200 transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto py-4 px-4 space-y-2">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
              {
                name: "Products",
                href: "/products",
                subItems: [
                  "Solar Panels",
                  "Hybrid Inverters",
                  "Energy Storage",
                  "Mounting Equipment",
                  "Cabling",
                  "Accessories",
                  "Switch Gear",
                ],
              },
              {
                name: "Insights & News",
                href: "/insights",
                subItems: [
                  { name: "Blogs", href: "/blogs" },
                  { name: "Case Studies", href: "/case-studies" },
                ],
              },
              { name: "Contact Us", href: "/contact" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.href}
                    className="block py-2 px-3 text-blue-900 font-medium hover:bg-orange-50 hover:text-orange-500 rounded transition flex-1"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </a>
                  {item.subItems && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.name === "Products") {
                          setMobileProductsDropdownOpen((prev) => !prev);
                        } else if (item.name === "Insights & News") {
                          setMobileInsightsDropdownOpen((prev) => !prev);
                        }
                      }}
                      className="p-2"
                    >
                      <ChevronDown
                        size={16}
                        className={`text-blue-900 transition-transform ${
                          (item.name === "Products" &&
                            mobileProductsDropdownOpen) ||
                          (item.name === "Insights & News" &&
                            mobileInsightsDropdownOpen)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Products Dropdown */}
                {item.name === "Products" && mobileProductsDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.subItems.map((sub, i) => (
                      <a
                        key={i}
                        href={`/category/${sub
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                        className="block py-2 px-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                        onClick={handleLinkClick}
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}

                {/* Mobile Insights Dropdown */}
                {item.name === "Insights & News" &&
                  mobileInsightsDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.subItems.map((sub, i) => (
                        <a
                          key={i}
                          href={sub.href}
                          className="block py-2 px-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 rounded transition"
                          onClick={handleLinkClick}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              {!user ? (
                <>
                  <a
                    href="/login"
                    className="block w-full text-center bg-gradient-to-r from-orange-500 to-blue-900 px-4 py-2 rounded hover:from-orange-600 hover:to-blue-800 text-white shadow transition"
                    onClick={handleLinkClick}
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="block w-full text-center bg-gradient-to-r from-blue-900 to-orange-500 px-4 py-2 rounded hover:from-blue-800 hover:to-orange-600 text-white shadow transition"
                    onClick={handleLinkClick}
                  >
                    Sign Up
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/dealer"
                    className="block w-full text-center bg-gradient-to-r from-orange-500 to-blue-900 px-4 py-2 rounded hover:from-orange-600 hover:to-blue-800 text-white shadow transition"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                    className="block w-full text-center bg-gradient-to-r from-blue-900 to-orange-500 px-4 py-2 rounded hover:from-blue-800 hover:to-orange-600 text-white shadow transition"
                  >
                    Logout
                  </button>
                </>
              )}
              <a
                href="/cart"
                className="flex items-center justify-center space-x-2 w-full py-2 px-3 text-blue-900 font-medium hover:bg-orange-50 hover:text-orange-500 rounded transition"
                onClick={handleLinkClick}
              >
                <ShoppingCart size={18} />
                <span>Cart ({basketCount})</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
