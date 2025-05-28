import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import { AuthContext } from "./context/AuthContext";
import PublicLayout from "./Layout/PublicLayout";
import HomeView from "./views/HomeView";
import Contact from "./views/ContactView";
import About from "./views/AboutView";
import Blog from "./views/BlogView";
import Blogs from "./views/BlogsView";
import CaseStudy from "./views/CaseStudyView";
import CaseStudies from "./views/CaseStudiesView";
import Insights from "./views/InsightsView";
import Products from "./views/ProductsView";
import Category from "./views/CategoryView";
import ProductDetail from "./views/ProductDetailView";
import Login from "./views/LoginView";
import Signup from "./views/SignupView";
import Cart from "./views/CartView";
import FAQs from "./views/FAQsView";
import DealerPanel from "./dealer/DealerPanel";
import DealerRoute from "./router/DealerRoute";
import ForgottenPassword from "./views/ForgottenPassword";
import Spinner from "./components/Spinner";
import ErrorBoundary from "./components/ErrorBoundary";
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {/*Admin routes */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<Spinner />}>
            <ErrorBoundary>
              <AdminRoutes />
            </ErrorBoundary>
          </Suspense>
        }
      />
      <Route path="/*" element={<PublicLayout />}>
        <Route index element={<HomeView />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="blog/:blogId" element={<Blog />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="case-study/:caseStudyId" element={<CaseStudy />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="products" element={<Products />} />
        <Route path="category/:categoryId" element={<Category />} />
        <Route path="product/:productId" element={<ProductDetail />} />
        <Route path="insights" element={<Insights />} />
        <Route path="cart" element={<Cart />} />
        <Route path="faqs" element={<FAQs />} />

        {/* Redirect login & signup if already logged in */}
        <Route path="login" element={<Login />} />
        <Route
          path="signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route element={<DealerRoute />}>
          <Route path="dealer/*" element={<DealerPanel />} />
        </Route>
        {/* Forgotten password route */}
        <Route path="forgot-password" element={<ForgottenPassword />} />
        {/* Redirect all other paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
