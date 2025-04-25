import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/NavbarComponent';
import Footer from './components/FooterComponent';
import HomeView from './views/HomeView';
import Contact from './views/ContactView';
import About from './views/AboutView';
import Blog from './views/BlogView';
import Blogs from './views/BlogsView';
import CaseStudy from './views/CaseStudyView';
import CaseStudies from './views/CaseStudiesView';
import Insights from './views/InsightsView';
import Products from './views/ProductsView';
import Category from './views/CategoryView';
import ProductDetail from './views/ProductDetailView';
import Login from './views/LoginView';
import Signup from './views/SignupView';
import Cart from './views/CartView';
import FAQs from './views/FAQsView';
import AdminPanel from './admin/AdminPanel';
import DealerPanel from './dealer/DealerPanel';
import DealerRoute from './router/DealerRoute';
import ProtectedRoute from './router/ProtectedRoute';
import '@fontsource/anta';

function App() {
	const { user } = useContext(AuthContext);

	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="flex-1 w-full">
					<Routes>
						<Route path="/" element={<HomeView />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/about" element={<About />} />
						<Route path="/blog/:blogId" element={<Blog />} />
						<Route path="/blogs" element={<Blogs />} />
						<Route
							path="/case-study/:caseStudyId"
							element={<CaseStudy />}
						/>
						<Route path="/case-studies" element={<CaseStudies />} />
						<Route path="/products" element={<Products />} />
						<Route
							path="/category/:categoryId"
							element={<Category />}
						/>
						<Route
							path="/product/:productId"
							element={<ProductDetail />}
						/>
						<Route path="/insights" element={<Insights />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/faqs" element={<FAQs />} />

						{/* Redirect login & signup if already logged in */}
						<Route path="/login" element={<Login />} />
						<Route
							path="/signup"
							element={user ? <Navigate to="/" /> : <Signup />}
						/>
						<Route element={<ProtectedRoute />}>
							<Route path="/admin/*" element={<AdminPanel />} />
						</Route>
						<Route element={<DealerRoute />}>
							<Route path="/dealer/*" element={<DealerPanel />} />
						</Route>
						{/* Redirect all other paths to home */}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
