import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaChartLine,
  FaBox,
  FaStar,
  FaNewspaper,
  FaBlog,
  FaCircleQuestion,
  FaCertificate,
  FaAward,
  FaBriefcase,
  FaUsers,
  FaCommentDots,
  FaUserShield,
  FaCircleCheck,
  FaFile,
} from "react-icons/fa6";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaChartLine /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    {
      name: "Featured Products",
      path: "/admin/featured-products",
      icon: <FaStar />,
    },
    { name: "Articles", path: "/admin/articles", icon: <FaNewspaper /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FaBlog /> },
    { name: "FAQs", path: "/admin/faqs", icon: <FaCircleQuestion /> },
    {
      name: "Certificates",
      path: "/admin/certificates",
      icon: <FaCertificate />,
    },
    { name: "Awards", path: "/admin/awards", icon: <FaAward /> },
    {
      name: "Case Studies",
      path: "/admin/case-studies",
      icon: <FaBriefcase />,
    },
    { name: "Team", path: "/admin/team", icon: <FaUsers /> },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: <FaCommentDots />,
    },
    {
      name: "Quotations",
      path: "/admin/quotations",
      icon: <FaFile />,
    },
    {
      name: "User Management",
      path: "/admin/user-management",
      icon: <FaUserShield />,
    },
    {
      name: "Dealer Verification",
      path: "/admin/dealers",
      icon: <FaCircleCheck />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold text-navy-900 mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
