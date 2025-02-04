import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, ChevronDown, Instagram, Mail, Twitter } from 'lucide-react';
import { FaXTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
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

	return (
		<>
			{/* Top Orange Bar */}
			<div className="bg-orange-500 text-white">
				<div className="container mx-auto flex justify-between items-center py-2 px-4 text-sm">
					{/* Contact Details */}
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-1">
							<FaWhatsapp size={16} />
							<span>+263 771 683 662</span>
						</div>
						<div className="flex items-center space-x-1">
							<Mail size={16} />
							<span>info@auroraenergy.co.zw</span>
						</div>
					</div>

					{/* Social Icons */}
					<div className="flex space-x-3">
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebook size={16} />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaXTwitter size={16} />
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Instagram size={16} />
						</a>
					</div>
				</div>
			</div>

			{/* Navbar */}
			<nav className="relative bg-black/40 shadow-md z-50">
				<div className="container mx-auto flex items-center justify-between p-4">
					<img src={Logo} alt="Logo" style={{ width: '130px' }} />

					{/* Mobile Menu Button */}
					<button
						className="md:hidden"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? (
							<FaXTwitter size={28} className="text-orange-500" />
						) : (
							<Menu size={28} className="text-orange-500" />
						)}
					</button>

					{/* Desktop Menu */}
					<ul className="hidden md:flex space-x-6 text-white font-medium">
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
								<ul
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									className="absolute left-0 top-full mt-1 w-48 bg-navy-900 shadow-lg rounded-md py-2 z-50"
								>
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
							<a href="/about">Insights</a>
						</li>
						<li className="hover:text-orange-500 cursor-pointer">
							<a href="/contact">Contact Us</a>
						</li>
					</ul>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<motion.div
						initial={{ x: '-100%' }}
						animate={{ x: 0 }}
						exit={{ x: '-100%' }}
						transition={{ duration: 0.3 }}
						className="fixed top-0 left-0 h-full w-4/5 bg-black/40 shadow-lg p-6 flex flex-col space-y-6 z-50"
					>
						<button
							className="self-end"
							onClick={() => setIsOpen(false)}
						>
							<FaXTwitter size={28} className="text-orange-500" />
						</button>
						<ul className="text-white text-lg font-medium">
							{['Home', 'About Us', 'Insights', 'Contact Us'].map(
								(item, index) => (
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
								),
							)}
							<li
								className="py-2 border-b hover:text-orange-500 cursor-pointer"
								onClick={() =>
									setIsDropdownOpen(!isDropdownOpen)
								}
							>
								<div className="flex justify-between items-center">
									Products{' '}
									<ChevronDown size={18} className="ml-1" />
								</div>
								{isDropdownOpen && (
									<ul className="mt-2 pl-4 space-y-2">
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
												className="py-2 hover:text-orange-500"
												onClick={handleLinkClick}
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
						</ul>
					</motion.div>
				)}
			</nav>
		</>
	);
}
