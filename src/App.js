import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavbarComponent';
import Footer from './components/FooterComponent';
import HomeView from './views/HomeView';
import Contact from './views/ContactView';
import About from './views/AboutView';
import Login from './views/LoginView';
import Signup from './views/SignupView';
import Cart from './views/CartView';
import '@fontsource/anta'; // This imports the default weight (typically 400)

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<main className="flex-1 w-full">
					<Routes>
						<Route path="/" element={<HomeView />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/cart" element={<Cart />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
