import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeaturedProducts } from '../api';
import { FaStar, FaCartPlus } from 'react-icons/fa';

function ProductsPage() {
	const navigate = useNavigate();
	const [featuredProducts, setFeaturedProducts] = useState([]);

	// Categories (static list)
	const categories = [
		{ id: 'solar-panels', name: 'Solar Panels' },
		{ id: 'hybrid-inverters', name: 'Hybrid Inverters' },
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

	// Handler to add product to localStorage cart
	const handleAddToCart = (product) => {
		const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
		existingCart.push(product);
		localStorage.setItem('cart', JSON.stringify(existingCart));
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

				<div className="bg-navy-900 p-8 rounded-lg shadow-lg">
					<h2 className="text-3xl text-white font-bold mb-4">
						Featured Products
					</h2>
					{featuredProducts.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
							{featuredProducts.map((product) => {
								// Assuming product.image contains the image filename
								const imageUrl =
									product.image || 'default-image.jpg';

								return (
                  <div
                    key={product.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={`https://dev-api.auroraenergy.co.zw/featuredProducts/${imageUrl}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden text-ellipsis line-clamp-1">
                        {product.name}
                      </h3>
                      {/* Star Reviews */}
                      <div className="flex items-center mb-4">
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition duration-300"
                        >
                          <FaCartPlus className="mr-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
							})}
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
