import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import {
	FaXTwitter,
	FaFacebook,
	FaWhatsapp,
	FaCartShopping,
	FaX,
	FaLinkedin,
	FaPhone,
	FaYoutube,
	FaTiktok,
	FaInstagram,
} from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import Logo from './../logo.png';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [insightsDropdownOpen, setInsightsDropdownOpen] = useState(false);
	const [mobileProductsDropdownOpen, setMobileProductsDropdownOpen] =
		useState(false);
	const [mobileInsightsDropdownOpen, setMobileInsightsDropdownOpen] =
		useState(false);
	const closeDropdownTimer = useRef(null);
	const insightsCloseTimer = useRef(null);

	// Dummy user logic; replace with real auth
	const user = JSON.parse(localStorage.getItem('user')) ?? null;
	const fullName = user?.user?.fullName;
	const isAdmin =
		user?.user?.role === 'admin' || user?.user?.role === 'super';

	const [basketCount, setBasketCount] = useState(0);

	// Update basket count from localStorage
	const updateBasketCount = () => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			try {
				const cart = JSON.parse(storedCart);
				const count = Array.isArray(cart.items)
					? cart.items.reduce(
							(sum, item) => sum + (item.quantity || 1),
							0,
					  )
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
			if (e.key === 'cart') updateBasketCount();
		};
		window.addEventListener('storage', handleStorageChange);
		window.addEventListener('cartUpdated', updateBasketCount);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('cartUpdated', updateBasketCount);
		};
	}, []);

	const handleLinkClick = () => {
		setIsOpen(false);
		setMobileProductsDropdownOpen(false);
		setMobileInsightsDropdownOpen(false);
	};

	const handleMouseEnter = () => {
		clearTimeout(closeDropdownTimer.current);
		setIsDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		closeDropdownTimer.current = setTimeout(() => {
			setIsDropdownOpen(false);
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
		if (!name) return 'U';
		const names = name.trim().split(' ');
		const initials =
			names.length === 1
				? names[0][0]
				: names[0][0] + names[names.length - 1][0];
		return initials.toUpperCase();
	}

	const avatarUrl =
    user?.user.profile == "avatar" || !user?.user.profile
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.user.name || "User"
        )}&background=0D8ABC&color=fff`
      : `https://dev-api.auroraenergy.co.zw/profiles/${user.user.profile}`;

	if (isAdmin) {
		const user = JSON.parse(localStorage.getItem('user'));

		return (
			<nav className="relative bg-gradient-to-r from-white to-navy-900 shadow-md z-50">
				<div className="container mx-auto flex items-center justify-between p-4">
					<a href="/">
						<img src={Logo} alt="Logo" style={{ width: '175px' }} />
					</a>
					<ul className="hidden md:flex space-x-6 text-white font-medium items-center">
						<li className="flex items-center space-x-3 px-3 py-1 rounded">
							<img
								src={avatarUrl}
								alt="Profile"
								className="w-8 h-8 rounded-full object-cover"
							/>
							<span className="text-white">
								{user?.user.fullName || 'Admin'}
							</span>
						</li>
						<li>
							<a
								href="/"
								onClick={() => {
									localStorage.removeItem('authToken');
									localStorage.removeItem('user');
									window.location.reload();
								}}
								className="bg-gradient-to-r from-navy-900 to-orange-500 px-3 py-1 rounded hover:text-orange-300 transition text-white"
							>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</nav>
		);
	}

	return (
		<>
			{/* Top Orange Bar */}
			<div className="bg-orange-500 text-white">
				<div className="container mx-auto flex justify-between items-center py-1 px-4 text-sm">
					<div className="flex items-center space-x-4">
						<a
							href="https://wa.me/263771683662"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="flex items-center space-x-1">
								<FaWhatsapp size={16} />
								<span className="hidden md:inline">
									+263 771 683 662
								</span>
							</div>
						</a>
						<a
							href="tel:+263242783999"
							className="flex items-center space-x-1"
						>
							<FaPhone size={16} />
							<span className="hidden md:inline">
								+263 242 783 999
							</span>
						</a>
						<a
							href="mailto:info@auroraenergy.co.zw"
							className="flex items-center space-x-1"
						>
							<Mail size={16} />
							<span className="hidden md:inline">
								info@auroraenergy.co.zw
							</span>
						</a>
					</div>
					<div className="flex space-x-3">
						<a href="#">
							<FaFacebook size={16} />
						</a>
						<a href="#">
							<FaXTwitter size={16} />
						</a>
						<a href="#">
							<FaInstagram size={16} />
						</a>
						<a href="#">
							<FaLinkedin size={16} />
						</a>
						<a href="#">
							<FaYoutube size={16} />
						</a>
						<a href="#">
							<FaTiktok size={16} />
						</a>
					</div>
				</div>
			</div>

			{/* Main Navbar */}
			<nav className="relative bg-gradient-to-r from-white to-navy-900 shadow-md z-50">
				<div className="container mx-auto flex items-center justify-between p-4">
					<a href="/">
						<img src={Logo} alt="Logo" style={{ width: '175px' }} />
					</a>

					{/* Mobile Toggle */}
					<button
						className="md:hidden"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? (
							<FaX size={28} className="text-orange-500" />
						) : (
							<Menu size={28} className="text-orange-500" />
						)}
					</button>

					{/* Desktop Menu */}
					<ul className="hidden md:flex space-x-6 text-white font-medium items-center">
						<li className="hover:text-orange-500">
							<a href="/">Home</a>
						</li>
						<li className="hover:text-orange-500">
							<a href="/about">About Us</a>
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
									className="hover:text-orange-500"
								>
									Products
								</a>
								<button
									onClick={(e) => {
										e.preventDefault();
										setIsDropdownOpen((prev) => !prev);
									}}
									className="ml-1"
								>
									<ChevronDown
										size={18}
										className="hover:text-orange-500"
									/>
								</button>
							</div>
							{isDropdownOpen && (
								<ul className="absolute left-0 top-full mt-1 w-48 bg-navy-900 shadow-lg rounded-md py-2 z-50">
									{[
										'Solar Panels',
										'Hybrid Inverters',
										'Energy Storage',
										'Mounting Equipment',
										'Cabling',
										'Accessories',
										'Switch Gear',
									].map((item, i) => (
										<li
											key={i}
											className="px-4 py-2 hover:bg-gray-100 hover:text-orange-500"
										>
											<a
												href={`/category/${item
													.toLowerCase()
													.replace(/ /g, '-')}`}
											>
												{item}
											</a>
										</li>
									))}
								</ul>
							)}
						</li>
						<li
							className="relative"
							onMouseEnter={() => {
								clearTimeout(insightsCloseTimer.current);
								setInsightsDropdownOpen(true);
							}}
							onMouseLeave={() => {
								insightsCloseTimer.current = setTimeout(
									() => setInsightsDropdownOpen(false),
									200,
								);
							}}
						>
							<div className="flex items-center">
								<a
									href="/insights"
									onClick={handleInsightsClick}
									className="hover:text-orange-500"
								>
									Insights & News
								</a>
								<button
									onClick={(e) => {
										e.preventDefault();
										setInsightsDropdownOpen(
											(prev) => !prev,
										);
									}}
									className="ml-1"
								>
									<ChevronDown
										size={18}
										className="hover:text-orange-500"
									/>
								</button>
							</div>
							{insightsDropdownOpen && (
								<ul className="absolute left-0 top-full mt-1 w-48 bg-navy-900 shadow-lg rounded-md py-2 z-50">
									<li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-500">
										<a href="/blogs">Blogs</a>
									</li>
									<li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-500">
										<a href="/case-studies">Case Studies</a>
									</li>
								</ul>
							)}
						</li>
						<li className="hover:text-orange-500">
							<a href="/contact">Contact Us</a>
						</li>

						{/* Auth Links */}
						{!user ? (
							<>
								<li>
									<a
										href="/login"
										className="bg-gradient-to-r from-orange-500 to-navy-900 px-3 py-1 rounded hover:text-orange-300 transition text-white"
									>
										Login
									</a>
								</li>
								<li>
									<a
										href="/signup"
										className="bg-gradient-to-r from-navy-900 to-orange-500 px-3 py-1 rounded hover:text-orange-300 transition text-white"
									>
										Sign Up
									</a>
								</li>
							</>
						) : (
							<>
								<li className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-navy-900 px-3 py-1 rounded hover:text-orange-300 transition text-white">
									<a href="/dealer" className="text-white">
										Dashboard
									</a>
									<div className="ml-2 w-8 h-8 rounded-full bg-white text-navy-900 flex items-center justify-center text-sm font-semibold shadow">
										<img
											src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
												getInitials(fullName),
											)}&background=orange&color=fff`}
											alt="User Initials"
											className="w-8 h-8 rounded-full object-cover"
										/>
									</div>
								</li>

								<li>
									<a
										href="/"
										onClick={() => {
											localStorage.removeItem(
												'authToken',
											);
											localStorage.removeItem('user');
											window.location.reload();
										}}
										className="bg-gradient-to-r from-navy-900 to-orange-500 px-3 py-1 rounded hover:text-orange-300 transition text-white"
									>
										Logout
									</a>
								</li>
							</>
						)}
						<li>
							{' '}
							<a
								href="/cart"
								className="flex items-center space-x-1 hover:text-orange-500 text-white"
							>
								<FaCartShopping size={16} />
								<span>{basketCount}</span>
							</a>
						</li>
					</ul>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 z-50 bg-black bg-opacity-50"
							onClick={() => setIsOpen(false)}
						>
							<motion.div
								onClick={(e) => e.stopPropagation()}
								initial={{ x: '-100%' }}
								animate={{ x: 0 }}
								exit={{ x: '-100%' }}
								transition={{ duration: 0.3 }}
								className="w-4/5 h-full bg-navy-900 p-6 flex flex-col space-y-4 overflow-y-auto"
							>
								<button
									className="self-end"
									onClick={() => setIsOpen(false)}
								>
									<FaX
										size={28}
										className="text-orange-500"
									/>
								</button>
								{[
									{ name: 'Home', href: '/' },
									{ name: 'About Us', href: '/about' },
									{
										name: 'Products',
										href: '/products',
										subItems: [
											'Solar Panels',
											'Hybrid Inverters',
											'Energy Storage',
											'Mounting Equipment',
											'Cabling',
											'Accessories',
											'Switch Gear',
										],
									},
									{
										name: 'Insights & News',
										href: '/insights',
										subItems: [
											{ name: 'Blogs', href: '/blogs' },
											{
												name: 'Case Studies',
												href: '/case-studies',
											},
										],
									},
									{ name: 'Contact Us', href: '/contact' },
								].map((item, idx) => (
									<div key={idx}>
										<div
											className="flex justify-between items-center py-2 border-b"
											onClick={handleLinkClick}
										>
											<a
												href={item.href}
												className="text-white text-lg"
											>
												{item.name}
											</a>
											{item.subItems && (
												<button
													onClick={() => {
														if (
															item.name ===
															'Products'
														)
															setMobileProductsDropdownOpen(
																(prev) => !prev,
															);
														if (
															item.name ===
															'Insights & News'
														)
															setMobileInsightsDropdownOpen(
																(prev) => !prev,
															);
													}}
												>
													<ChevronDown className="text-white" />
												</button>
											)}
										</div>
										{item.subItems &&
											item.name === 'Products' &&
											mobileProductsDropdownOpen && (
												<ul className="pl-4 text-white">
													{item.subItems.map(
														(sub, i) => (
															<li
																key={i}
																className="py-2 border-b"
																onClick={
																	handleLinkClick
																}
															>
																<a
																	href={`/category/${sub
																		.toLowerCase()
																		.replace(
																			/ /g,
																			'-',
																		)}`}
																>
																	{sub}
																</a>
															</li>
														),
													)}
												</ul>
											)}
										{item.subItems &&
											item.name === 'Insights & News' &&
											mobileInsightsDropdownOpen && (
												<ul className="pl-4 text-white">
													{item.subItems.map(
														(sub, i) => (
															<li
																key={i}
																className="py-2 border-b"
																onClick={
																	handleLinkClick
																}
															>
																<a
																	href={
																		sub.href
																	}
																>
																	{sub.name}
																</a>
															</li>
														),
													)}
												</ul>
											)}
									</div>
								))}
								{/* Auth */}
								{!user ? (
									<>
										<a
											href="/login"
											className="block text-white bg-orange-500 text-center py-2 rounded"
										>
											Login
										</a>
										<a
											href="/signup"
											className="block text-white bg-orange-500 text-center py-2 rounded"
										>
											Sign Up
										</a>
									</>
								) : (
									<button
										onClick={() => {
											localStorage.removeItem(
												'authToken',
											);
											localStorage.removeItem('user');
											window.location.reload();
										}}
										className="block text-white bg-navy-900 border border-orange-500 text-center py-2 rounded"
									>
										Logout
									</button>
								)}
								<a
									href="/cart"
									className="flex items-center space-x-2 text-white py-2"
								>
									<FaCartShopping size={18} />
									<span>{basketCount}</span>
								</a>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
}
