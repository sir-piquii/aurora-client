import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown, Instagram, Mail } from 'lucide-react';
import {
	FaXTwitter,
	FaFacebook,
	FaWhatsapp,
	FaCartShopping,
	FaX,
	FaLinkedin,
} from 'react-icons/fa6';
import Logo from './../logo.png';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const closeDropdownTimer = useRef(null);

	const handleLinkClick = () => setIsOpen(false);

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

	// Dummy basket count for demonstration purposes
	const basketCount = 0;

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
								<span>+263 771 683 662</span>
							</div>
						</a>
						<div className="flex items-center space-x-1">
							<Mail size={16} />
							<span>info@auroraenergy.co.zw</span>
						</div>
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
					</div>
				</div>
			</div>

			{/* Navbar */}
			<nav className="relative bg-gradient-to-r from-white to-navy-900 shadow-md z-50">
				<div className="container mx-auto flex items-center justify-between p-4">
					<img src={Logo} alt="Logo" style={{ width: '175px' }} />

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
							<div className="flex items-center hover:text-orange-500">
								Products{' '}
								<ChevronDown size={18} className="ml-1" />
							</div>
							{isDropdownOpen && (
								<ul className="absolute left-0 top-full mt-1 w-48 bg-navy-900 shadow-lg rounded-md py-2 z-50">
									{[
										'Solar Panels',
										'Inverters',
										'Energy Storage',
										'Balance of Systems',
										'Mounting Equipment',
										'Cabling',
									].map((item, index) => (
										<li
											key={index}
											className="px-4 py-2 hover:bg-gray-100 hover:text-orange-500"
										>
											<a
												href={`/product/${item
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
						<li className="hover:text-orange-500 cursor-pointer">
							<a href="/insights">Insights</a>
						</li>
						<li className="hover:text-orange-500 cursor-pointer">
							<a href="/contact">Contact Us</a>
						</li>
						{/* Dealer Portal Button */}
						<li>
							<a
								href="/dealer-portal"
								className="bg-orange-200 text-navy-900 px-3 py-1 rounded hover:bg-orange-300 transition"
							>
								Dealer Portal
							</a>
						</li>
						{/* Cart Element (non-clickable) */}
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
							// Clicking on the backdrop will close the menu
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
								<ul className="text-white text-lg font-medium">
									{[
										'Home',
										'About Us',
										'Insights',
										'Contact Us',
									].map((item, index) => (
										<li
											key={index}
											className="py-2 border-b hover:text-orange-500 cursor-pointer"
											onClick={handleLinkClick}
										>
											<a
												href={`/${item
													.toLowerCase()
													.replace(/ /g, '')}`}
											>
												{item}
											</a>
										</li>
									))}
									{/* Dealer Portal Button */}
									<li
										className="py-2 border-b hover:text-orange-500 cursor-pointer"
										onClick={handleLinkClick}
									>
										<a
											href="/dealer-portal"
											className="text-white px-3 py-1 rounded hover:bg-orange-500 transition"
										>
											Dealer Portal
										</a>
									</li>
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
								</ul>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
}
