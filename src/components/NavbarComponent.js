import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown, Instagram, Mail } from 'lucide-react';
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
} from 'react-icons/fa6';
import Logo from './../logo.png';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [insightsDropdownOpen, setInsightsDropdownOpen] = useState(false);
	// New states for mobile dropdowns
	const [mobileProductsDropdownOpen, setMobileProductsDropdownOpen] =
		useState(false);
	const [mobileInsightsDropdownOpen, setMobileInsightsDropdownOpen] =
		useState(false);
	const closeDropdownTimer = useRef(null);
	const insightsCloseTimer = useRef(null);

	// Dummy user for demonstration. Replace with your actual auth logic.
	const user = JSON.parse(localStorage.getItem('user')) ?? null;
	const isAdmin = user?.user.role == 'admin' ?? false;

	// State for basket count, which is derived from the localStorage cart.
	const [basketCount, setBasketCount] = useState(0);

	// Function to update basket count by reading from localStorage
	const updateBasketCount = () => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			const cart = JSON.parse(storedCart);
			if (cart.items && Array.isArray(cart.items)) {
				// Sum the quantities of each item (default quantity to 1 if not set)
				const count = cart.items.reduce(
					(total, item) => total + (item.quantity || 1),
					0,
				);
				setBasketCount(count);
			} else {
				setBasketCount(0);
			}
		} else {
			setBasketCount(0);
		}
	};

	// Update basket count on component mount and listen for custom events.
	useEffect(() => {
		updateBasketCount();

		// Listen for cross-tab storage changes
		const handleStorageChange = (e) => {
			if (e.key === 'cart') {
				updateBasketCount();
			}
		};

		// Listen for a custom "cartUpdated" event fired from other components
		window.addEventListener('storage', handleStorageChange);
		window.addEventListener('cartUpdated', updateBasketCount);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('cartUpdated', updateBasketCount);
		};
	}, []);

	const handleLinkClick = () => {
		setIsOpen(false);
		// Optionally close mobile dropdowns when a link is clicked.
		setMobileProductsDropdownOpen(false);
		setMobileInsightsDropdownOpen(false);
	};

	const handleMouseEnter = () => {
		if (closeDropdownTimer.current)
			clearTimeout(closeDropdownTimer.current);
		setIsDropdownOpen(true);
	};

	const handleMouseLeave = () => {
		closeDropdownTimer.current = setTimeout(() => {
			setIsDropdownOpen(false);
		}, 200);
	};

	// For medium screens / touch devices for Products:
	const handleProductsClick = (event) => {
		// If the dropdown is not already open, intercept the click to open it.
		if (!isDropdownOpen) {
			event.preventDefault();
			setIsDropdownOpen(true);
		}
		// Otherwise, allow navigation on second tap.
	};

	// For Insights & News desktop dropdown
	const handleInsightsClick = (event) => {
		// Prevent default navigation to allow toggling the dropdown
		if (!insightsDropdownOpen) {
			event.preventDefault();
			setInsightsDropdownOpen(true);
		}
	};

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
							<div className="flex items-center space-x-1">
								<FaPhone size={16} />
								<span className="hidden md:inline">
									+263 242 783 999
								</span>
							</div>
						</a>
						<a
							href="mailto:info@auroraenergy.co.zw"
							target="_blank"
							className="flex items-center space-x-1"
						>
							<Mail size={16} />
							<span className="hidden md:inline">
								info@auroraenergy.co.zw
							</span>
						</a>
					</div>

					{/* Social Icons */}
					<div className="flex space-x-3">
						<a
							href="https://www.facebook.com/share/15imcziZ2b/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebook size={16} />
						</a>
						<a
							href="https://x.com/AuroraEnergyZW?s=09"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaXTwitter size={16} />
						</a>
						<a
							href="https://www.instagram.com/auroraenergyzimbabwe?igsh=MXNpOTFvZnRubTljcQ=="
							target="_blank"
							rel="noopener noreferrer"
						>
							<Instagram size={16} />
						</a>
						<a
							href="https://www.linkedin.com/company/aurora-energy1/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedin size={16} />
						</a>
						<a
							href="https://youtube.com/@auroraenergyzimbabwe?si=huqdG42TA1NBS8Iy"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaYoutube size={16} />
						</a>
						<a
							href="https://www.tiktok.com/@aurora_energy_zimbabwe?_t=ZM-8tiPYsaBl0X&_r=1"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTiktok size={16} />
						</a>
					</div>
				</div>
			</div>

			{/* Navbar */}
			<nav className="relative bg-gradient-to-r from-white to-navy-900 shadow-md z-50">
				<div className="container mx-auto flex items-center justify-between p-4">
					<a href="/">
						<img src={Logo} alt="Logo" style={{ width: '175px' }} />
					</a>

					{/* Mobile Menu Button */}
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
						<li className="hover:text-orange-500 cursor-pointer">
							<a href="/">Home</a>
						</li>
						<li className="hover:text-orange-500 cursor-pointer">
							<a href="/about">About Us</a>
						</li>
						<li
							className="relative cursor-pointer"
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
									].map((item, index) => (
										<li
											key={index}
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
						{/* Insights & News Dropdown for Desktop */}
						<li
							className="relative cursor-pointer"
							onMouseEnter={() => {
								if (insightsCloseTimer.current)
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
									Insights &amp; News
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
						<li className="hover:text-orange-500 cursor-pointer">
							<a href="/contact">Contact Us</a>
						</li>

						{/* Conditional Auth Links */}
						{!user ? (
							<>
								<li>
									<a
										href="/login"
										className="bg-gradient-to-r from-orange-500 to-navy-900 text-white px-3 py-1 rounded hover:text-orange-300 transition"
									>
										Login
									</a>
								</li>
								<li>
									<a
										href="/signup"
										className="bg-gradient-to-r from-navy-900 to-orange-500 text-white px-3 py-1 rounded hover:text-orange-300 transition"
									>
										Sign Up
									</a>
								</li>
							</>
						) : isAdmin ? (
							<li>
								<a
									href="/admin"
									className="bg-gradient-to-r from-orange-500 to-navy-900 text-white px-3 py-1 rounded hover:text-orange-300 transition"
								>
									Admin Portal
								</a>
							</li>
						) : (
							<li>
								<a
									href="/dealer"
									className="bg-gradient-to-r from-orange-500 to-navy-900 text-white px-3 py-1 rounded hover:text-orange-300 transition"
								>
									Dealer Registration
								</a>
							</li>
						)}
						{user && (
							<li>
								<a
									href="/"
									onClick={() => {
										localStorage.removeItem('authToken');
										localStorage.removeItem('user');
										window.location.reload(); // Refresh to update UI
									}}
									className="bg-gradient-to-r from-navy-900 to-orange-500 text-white px-3 py-1 rounded hover:text-orange-300 transition"
								>
									Logout
								</a>
							</li>
						)}
						{/* Cart Element */}
						<li>
							<a
								href="/cart"
								className="text-white px-3 py-1 rounded flex items-center hidden md:flex hover:text-orange-500"
							>
								<FaCartShopping size={16} className="mr-1" />
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
							className="fixed inset-0 z-50"
							onClick={() => setIsOpen(false)}
						>
							<motion.div
								onClick={(e) => e.stopPropagation()}
								initial={{ x: '-100%' }}
								animate={{ x: 0 }}
								exit={{ x: '-100%' }}
								transition={{ duration: 0.3 }}
								className="w-4/5 bg-navy-900/75 shadow-lg p-6 flex flex-col space-y-6"
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
										dropdown: true,
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
										dropdown: true,
										subItems: [
											{ name: 'Blogs', href: '/blogs' },
											{
												name: 'Case Studies',
												href: '/case-studies',
											},
										],
									},
									{ name: 'Contact Us', href: '/contact' },
								].map((item, index) => {
									if (item.dropdown) {
										return (
											<React.Fragment key={index}>
												<li className="py-2 border-b flex items-center justify-between">
													<a
														href={item.href}
														className="hover:text-orange-500"
														onClick={
															handleLinkClick
														}
													>
														{item.name}
													</a>
													<button
														onClick={(e) => {
															e.stopPropagation();
															if (
																item.name ===
																'Products'
															) {
																setMobileProductsDropdownOpen(
																	(prev) =>
																		!prev,
																);
															} else if (
																item.name ===
																'Insights & News'
															) {
																setMobileInsightsDropdownOpen(
																	(prev) =>
																		!prev,
																);
															}
														}}
													>
														<ChevronDown
															size={18}
															className="hover:text-orange-500"
														/>
													</button>
												</li>
												{item.name === 'Products' &&
													mobileProductsDropdownOpen && (
														<ul className="pl-4">
															{item.subItems.map(
																(
																	subItem,
																	subIndex,
																) => (
																	<li
																		key={
																			subIndex
																		}
																		className="py-2 border-b hover:text-orange-500 cursor-pointer"
																		onClick={
																			handleLinkClick
																		}
																	>
																		<a
																			href={`/category/${subItem
																				.toLowerCase()
																				.replace(
																					/ /g,
																					'-',
																				)}`}
																		>
																			{
																				subItem
																			}
																		</a>
																	</li>
																),
															)}
														</ul>
													)}
												{item.name ===
													'Insights & News' &&
													mobileInsightsDropdownOpen && (
														<ul className="pl-4">
															{item.subItems.map(
																(
																	subItem,
																	subIndex,
																) => (
																	<li
																		key={
																			subIndex
																		}
																		className="py-2 border-b hover:text-orange-500 cursor-pointer"
																		onClick={
																			handleLinkClick
																		}
																	>
																		<a
																			href={
																				subItem.href
																			}
																		>
																			{
																				subItem.name
																			}
																		</a>
																	</li>
																),
															)}
														</ul>
													)}
											</React.Fragment>
										);
									} else {
										return (
											<li
												key={index}
												className="py-2 border-b hover:text-orange-500 cursor-pointer"
												onClick={handleLinkClick}
											>
												<a href={item.href}>
													{item.name}
												</a>
											</li>
										);
									}
								})}
								{/* Conditional Auth Links for Mobile */}
								{!user?.isLoggedIn ? (
									<>
										<li
											className="py-2 border-b hover:text-orange-500 cursor-pointer"
											onClick={handleLinkClick}
										>
											<a
												href="/login"
												className="text-white px-3 py-1 rounded hover:bg-orange-500 transition"
											>
												Login
											</a>
										</li>
										<li
											className="py-2 border-b hover:text-orange-500 cursor-pointer"
											onClick={handleLinkClick}
										>
											<a
												href="/signup"
												className="text-white px-3 py-1 rounded hover:bg-orange-500 transition"
											>
												Sign Up
											</a>
										</li>
									</>
								) : (
									user?.isAdmin && (
										<li
											className="py-2 border-b hover:text-orange-500 cursor-pointer"
											onClick={handleLinkClick}
										>
											<a
												href="/admin-portal"
												className="text-white px-3 py-1 rounded hover:bg-orange-500 transition"
											>
												Admin Portal
											</a>
										</li>
									)
								)}

								{/* Cart Element (non-clickable) */}
								<li
									className="py-2 border-b"
									onClick={handleLinkClick}
								>
									<a
										href="/cart"
										className="text-white px-3 py-1 flex items-center rounded hover:text-orange-500"
									>
										<FaCartShopping
											size={16}
											className="mr-1"
										/>
										<span>
											Shopping Cart: {basketCount}
										</span>
									</a>
								</li>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
}
