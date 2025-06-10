import { Routes, Route } from "react-router-dom";
import Products from "../admin/components/Products";
import ProductForm from "../admin/components/ProductForm";
import FeaturedProductForm from "../admin/components/FeaturedProductForm";
import FeaturedProducts from "../admin/components/FeaturedProducts";
import Articles from "../admin/components/Articles";
import ArticleForm from "../admin/components/ArticlesForm";
import Blogs from "../admin/components/Blogs";
import BlogForm from "../admin/components/BlogForm";
import FAQs from "../admin/components/FAQs";
import FAQsForm from "../admin/components/FAQsForm";
import Certificates from "../admin/components/Certificates";
import CertificatesForm from "../admin/components/CertificatesForm";
import Awards from "../admin/components/Awards";
import CaseStudies from "../admin/components/CaseStudies";
import CaseStudyForm from "../admin/components/CaseStudyForm";
import Team from "../admin/components/Team";
import TeamForm from "../admin/components/TeamForm";
import Testimonials from "../admin/components/Testimonials";
import TestimonialsForm from "../admin/components/TestimonialsForm";
import Dealer from "../admin/components/Dealer";
import DealerDetail from "../admin/components/DealerDetail";
import DashboardCards from "../admin/components/DashboardCards";
import UserManagement from "../admin/components/UserManagement";
import Quotations from "../admin/components/Quotations";
import Sidebar from "../admin/Sidebar";
import Navbar from "../admin/Navbar";
import ProtectedRoute from "../router/ProtectedRoute";
import { Toaster } from "sonner";
import { SidebarContext, SidebarProvider } from "../context/SidebarContext";
import { Menu } from "lucide-react";
import { useContext } from "react";
import Sales from "../admin/components/Sales";
import Profile from "../admin/Profile";
/**
 * AdminRoutes component defines the protected admin dashboard layout and routing structure.
 *
 * - Wraps all admin routes with authentication protection via `ProtectedRoute`.
 * - Provides sidebar context using `SidebarProvider`.
 * - Renders a responsive sidebar, top navigation bar, and main content area.
 * - Defines all admin-related routes using React Router's `Routes` and `Route` components.
 * - Includes a floating mobile menu button to toggle the sidebar on smaller screens.
 * - Displays a footer and a global `Toaster` for notifications.
 *
 * @component
 * @returns {JSX.Element} The admin dashboard layout with nested routes and sidebar navigation.
 */
const AdminRoutes = () => {
  const { toggle } = useContext(SidebarContext);
  //const  = useSidebar;
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex bg-gray-50 w-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
            {/* Top Navigation */}
            <Navbar />
            {/* Page Content */}
            <main className="flex-1 h-screen max-w-screen p-4 md:p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<DashboardCards />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/featured-products"
                  element={<FeaturedProducts />}
                />
                <Route path="/articles" element={<Articles />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/awards" element={<Awards />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/team" element={<Team />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/dealers" element={<Dealer />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/dealers/:id" element={<DealerDetail />} />
                <Route path="/products/add" element={<ProductForm />} />
                <Route path="/products/edit/:id" element={<ProductForm />} />
                <Route
                  path="/featured-products/add"
                  element={<FeaturedProductForm />}
                />
                <Route
                  path="/featured-products/edit/:id"
                  element={<FeaturedProductForm />}
                />
                <Route path="/articles/add" element={<ArticleForm />} />
                <Route path="/articles/edit/:id" element={<ArticleForm />} />
                <Route path="/blogs/add" element={<BlogForm />} />
                <Route path="/blogs/edit/:id" element={<BlogForm />} />
                <Route path="/faqs/add" element={<FAQsForm />} />
                <Route path="/faqs/edit/:id" element={<FAQsForm />} />
                <Route
                  path="/certificates/add"
                  element={<CertificatesForm />}
                />
                <Route path="/awards/add" element={<CertificatesForm />} />
                <Route path="/case-studies/add" element={<CaseStudyForm />} />
                <Route
                  path="/case-studies/edit/:id"
                  element={<CaseStudyForm />}
                />
                <Route path="/team/add" element={<TeamForm />} />
                <Route path="/team/edit/:id" element={<TeamForm />} />
                <Route
                  path="/testimonials/add"
                  element={<TestimonialsForm />}
                />
                <Route
                  path="/testimonials/edit/:id"
                  element={<TestimonialsForm />}
                />
                <Route path="/quotations" element={<Quotations />} />
              </Routes>
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
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default AdminRoutes;
