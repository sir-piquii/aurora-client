import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeaturedProducts } from '../api';

function ProductsPage() {
	const navigate = useNavigate();
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Categories (static list)
	const categories = [
		{ id: 'solar-panels', name: 'Solar Panels' },
		{ id: 'inverters', name: 'Inverters' },
		{ id: 'energy-storage', name: 'Energy Storage' },
		{ id: 'mounting-equipment', name: 'Mounting Equipment' },
		{ id: 'cabling', name: 'Cabling' },
		{ id: 'accessories', name: 'Accessories' },
		{ id: 'switch-gear', name: 'Switch Gear' },
	];

	// FAQs (static) – clicking any FAQ item goes to the FAQs page
	const faqs = [
		{
			question: 'What is the return policy?',
			answer: 'You can return any product within 30 days of purchase.',
		},
		{
			question: 'Do you offer international shipping?',
			answer: 'Yes, we ship to most countries worldwide.',
		},
		{
			question: 'How can I track my order?',
			answer: 'Once your order ships, you will receive a tracking number by email.',
		},
		{
			question: 'Are there any discounts available?',
			answer: 'We offer seasonal discounts and promotions. Subscribe to our newsletter for updates.',
		},
	];

	// Fetch featured products on component mount with a delay
	useEffect(() => {
		document.title = 'Products | Aurora';

		const fetchFeaturedProducts = async () => {
			try {
				const data = await getFeaturedProducts();
				setFeaturedProducts(data);
			} catch (error) {
				console.error('Error fetching featured products:', error);
			}
		};

		const timer = setTimeout(() => {
			fetchFeaturedProducts();
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	// Auto-scroll carousel every 7 seconds if there are more than 3 items
	useEffect(() => {
		if (featuredProducts.length <= 3) return;
		const interval = setInterval(() => {
			setCurrentIndex(
				(prevIndex) => (prevIndex + 1) % featuredProducts.length,
			);
		}, 7000);
		return () => clearInterval(interval);
	}, [featuredProducts]);

	// Get the 3 visible featured products
	const getVisibleProducts = () => {
		// If there are 3 or fewer products, just return them
		if (featuredProducts.length <= 3) return featuredProducts;
		// Otherwise, return a sliding window of 3 products
		const visible = [];
		for (let i = 0; i < 3; i++) {
			const index = (currentIndex + i) % featuredProducts.length;
			visible.push(featuredProducts[index]);
		}
		return visible;
	};

	return (
		<div className="flex flex-col items-center">
			{/* Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center bg-navy-900">
				<h1 className="text-5xl font-bold text-white">Products</h1>
			</div>

			<div className="w-10/12 mx-auto mt-6 space-y-10">
				{/* Categories Mini Menu */}
				<div className="bg-white p-4 rounded-lg">
					<div className="flex justify-center space-x-4">
						{categories.map((cat) => (
							<Link
								key={cat.id}
								to={`/category/${cat.id}`}
								className="px-3 py-1 text-base text-gray-700 hover:text-white hover:bg-navy-900 rounded transition-colors"
							>
								{cat.name}
							</Link>
						))}
					</div>
				</div>

				{/* Featured Products Carousel */}
				<div className="bg-navy-900 text-white p-8 rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold mb-4 text-white">
						Featured Products
					</h2>
					{featuredProducts.length > 0 ? (
						<div className="flex space-x-4">
							{getVisibleProducts().map((product) => (
								<div
									key={product.id}
									className="w-1/4 rounded cursor-pointer hover:shadow-md hover:text-orange-500 transition-shadow"
									onClick={() =>
										navigate(`/product/${product.id}`)
									}
								>
									<img
										src={`https://dev-api.auroraenergy.co.zw/featuredProducts/${product.image}`}
										alt={product.name}
										className="w-full h-[28rem] object-cover rounded mb-2 mx-auto"
									/>

									<div className="text-md p-4">
										<p className="font-semibold">
											{product.name}
										</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<p className="text-gray-600">
							Loading featured products...
						</p>
					)}
				</div>

				{/* Products FAQs Section */}
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2
						className="text-3xl font-bold mb-4"
						style={{ color: '#001f3f' }}
					>
						Products FAQs
					</h2>
					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<Link
								key={index}
								to="/faqs"
								className="block border rounded p-4 hover:shadow-md transition-all"
							>
								<h3
									className="font-bold"
									style={{ color: '#001f3f' }}
								>
									{faq.question}
								</h3>
								<p className="text-gray-700">{faq.answer}</p>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductsPage;
