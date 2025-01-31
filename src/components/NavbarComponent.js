import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './../logo.png';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<nav className="relative bg-white shadow-md">
			<div className="container mx-auto flex items-center justify-between p-4">
				<img src={Logo} alt="Logo" style={{ width: '130px' }} />
				<button
					className="md:hidden"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? (
						<X size={28} className="text-orange-500" />
					) : (
						<Menu size={28} className="text-orange-500" />
					)}
				</button>
				<ul className="hidden md:flex space-x-6 text-navy-900 font-medium">
					<li className="hover:text-orange-500 cursor-pointer">
						<a href="/">Home</a>
					</li>
					<li className="hover:text-orange-500 cursor-pointer">
						<a href="/about">About Us</a>
					</li>
					<li
						className="relative cursor-pointer hover:text-orange-500"
						onMouseEnter={() => setIsDropdownOpen(true)}
						onMouseLeave={() => setIsDropdownOpen(false)}
					>
						<div className="flex items-center">
							Products <ChevronDown size={18} className="ml-1" />
						</div>
						{isDropdownOpen && (
							<ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
								<li className="px-4 py-2 hover:bg-gray-100">
									<a href="/product/solar-panels">
										Solar Panels
									</a>
								</li>
								<li className="px-4 py-2 hover:bg-gray-100">
									<a href="/product/inverters">Inverters</a>
								</li>
								<li className="px-4 py-2 hover:bg-gray-100">
									<a href="/product/energy-storage">
										Energy Storage
									</a>
								</li>
								<li className="px-4 py-2 hover:bg-gray-100">
									<a href="/product/balance-of-systems">
										Balance of Systems
									</a>
								</li>
								<li className="px-4 py-2 hover:bg-gray-100">
									<a href="/product/mounting-equipment">
										Mounting Equipment
									</a>
								</li>
								<li className="px-4 py-2 hover:bg-gray-100">
									<a href="/product/cabling">Cabling</a>
								</li>
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
					className="fixed top-0 left-0 h-full w-4/5 bg-white shadow-lg p-6 flex flex-col space-y-6 z-50"
				>
					<button
						className="self-end"
						onClick={() => setIsOpen(false)}
					>
						<X size={28} className="text-orange-500" />
					</button>
					<ul className="text-navy-900 text-lg font-medium">
						<li
							className="py-2 border-b hover:text-orange-500 cursor-pointer"
							onClick={handleLinkClick}
						>
							<a href="/">Home</a>
						</li>
						<li
							className="py-2 border-b hover:text-orange-500 cursor-pointer"
							onClick={handleLinkClick}
						>
							<a href="/">About Us</a>
						</li>
						<li
							className="py-2 border-b hover:text-orange-500 cursor-pointer"
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<div className="flex justify-between items-center">
								Products{' '}
								<ChevronDown size={18} className="ml-1" />
							</div>
							{isDropdownOpen && (
								<ul className="mt-2 pl-4 space-y-2">
									<li
										className="py-2 hover:text-orange-500"
										onClick={handleLinkClick}
									>
										<a href="/product/solar-panels">
											Solar Panels
										</a>
									</li>
									<li
										className="py-2 hover:text-orange-500"
										onClick={handleLinkClick}
									>
										<a href="/product/inverters">
											Inverters
										</a>
									</li>
									<li
										className="py-2 hover:text-orange-500"
										onClick={handleLinkClick}
									>
										<a href="/product/energy-storage">
											Energy Storage
										</a>
									</li>
									<li
										className="py-2 hover:text-orange-500"
										onClick={handleLinkClick}
									>
										<a href="/product/balance-of-systems">
											Balance of Systems
										</a>
									</li>
									<li
										className="py-2 hover:text-orange-500"
										onClick={handleLinkClick}
									>
										<a href="/product/mounting-equipment">
											Mounting Equipment
										</a>
									</li>
									<li
										className="py-2 hover:text-orange-500"
										onClick={handleLinkClick}
									>
										<a href="/product/cabling">Cabling</a>
									</li>
								</ul>
							)}
						</li>
						<li
							className="py-2 border-b hover:text-orange-500 cursor-pointer"
							onClick={handleLinkClick}
						>
							<a href="/about">Insights</a>
						</li>
						<li
							className="py-2 hover:text-orange-500 cursor-pointer"
							onClick={handleLinkClick}
						>
							<a href="/contact">Contact Us</a>
						</li>
					</ul>
				</motion.div>
			)}
		</nav>
	);
}
