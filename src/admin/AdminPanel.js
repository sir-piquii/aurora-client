import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import Sidebar from "./Sidebar";
import Products from "./components/Products";
import ProductForm from "./components/ProductForm";
import FeaturedProductForm from "./components/FeaturedProductForm";
import FeaturedProducts from "./components/FeaturedProducts";
import Articles from "./components/Articles";
import ArticleForm from "./components/ArticlesForm";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import FAQs from "./components/FAQs";
import FAQsForm from "./components/FAQsForm";
import Certificates from "./components/Certificates";
import CertificatesForm from "./components/CertificatesForm";
import Awards from "./components/Awards";
import CaseStudies from "./components/CaseStudies";
import CaseStudyForm from "./components/CaseStudyForm";
import Team from "./components/Team";
import TeamForm from "./components/TeamForm";
import Testimonials from "./components/Testimonials";
import TestimonialsForm from "./components/TestimonialsForm";
import Dealer from "./components/Dealer";
import DealerDetail from "./components/DealerDetail";
import DashboardCards from "./components/DashboardCards";
import { Toaster } from "sonner";
import UserManagement from "./components/UserManagement";
import Quotations from "./components/Quotations";
import Navbar from "./Navbar";

/**
 * AdminPanel component renders the main admin dashboard layout, including the sidebar,
 * navbar, and all admin routes for managing products, articles, blogs, FAQs, certificates,
 * awards, case studies, team, testimonials, dealers, user management, and quotations.
 *
 * - Sets the document title to "Admin Panel" on mount.
 * - Provides a responsive sidebar toggle button for mobile devices.
 * - Uses React Router's <Routes> to render different admin sections based on the URL.
 * - Displays a toast notification container.
 *
 * @component
 * @returns {JSX.Element} The rendered admin panel layout with navigation and route-based content.
 */
function AdminPanel() {
  const { toggle } = useSidebar();
  useEffect(() => {
    document.title = "Admin Panel";
  }, []);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardCards />} />
            <Route path="products" element={<Products />} />
            <Route path="featured-products" element={<FeaturedProducts />} />
            <Route path="articles" element={<Articles />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="awards" element={<Awards />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="team" element={<Team />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="dealers" element={<Dealer />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="dealers/:id" element={<DealerDetail />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route
              path="featured-products/add"
              element={<FeaturedProductForm />}
            />
            <Route
              path="featured-products/edit/:id"
              element={<FeaturedProductForm />}
            />
            <Route path="articles/add" element={<ArticleForm />} />
            <Route path="articles/edit/:id" element={<ArticleForm />} />
            <Route path="blogs/add" element={<BlogForm />} />
            <Route path="blogs/edit/:id" element={<BlogForm />} />
            <Route path="faqs/add" element={<FAQsForm />} />
            <Route path="faqs/edit/:id" element={<FAQsForm />} />
            <Route path="certificates/add" element={<CertificatesForm />} />
            <Route path="awards/add" element={<CertificatesForm />} />
            <Route path="case-studies/add" element={<CaseStudyForm />} />
            <Route path="case-studies/edit/:id" element={<CaseStudyForm />} />
            <Route path="team/add" element={<TeamForm />} />
            <Route path="team/edit/:id" element={<TeamForm />} />
            <Route path="testimonials/add" element={<TestimonialsForm />} />
            <Route
              path="testimonials/edit/:id"
              element={<TestimonialsForm />}
            />
            <Route path="quotations" element={<Quotations />} />
          </Routes>
        </main>
      </div>
      <button
        onClick={toggle}
        className="lg:hidden fixed bottom-4 right-4 p-3 rounded-full bg-orange-500 text-white shadow-lg z-50 hover:bg-orange-600 active:transform active:scale-95 transition-all"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>
      <Toaster />
    </div>
  );
}

export default AdminPanel;
