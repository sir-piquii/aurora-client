import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../api';
import { FaStar, FaCartPlus } from 'react-icons/fa';

function CategoryView() {
	const { categoryId } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const formatCategory = (slug) => {
		return slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	// Handler to add product to localStorage cart
	const handleAddToCart = (product) => {
		const storedCart = localStorage.getItem('cart');
		let cart = storedCart ? JSON.parse(storedCart) : null;
		const now = Date.now();
		const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

		// Reset cart if it has expired
		if (cart && cart.expires && now > cart.expires) {
			cart = null;
		}

		if (!cart) {
			cart = {
				items: [],
				expires: now + THIRTY_DAYS,
			};
		}

		// Check if product is already in the cart (using product_id or a similar unique identifier)
		const existingItem = cart.items.find(
			(item) => item.productId === product.product_id,
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.items.push({
				productId: product.product_id,
				productName: product.product_name,
				image: product.images.split(',')[0], // Use the first image
				quantity: 1,
			});
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		alert('Product added to cart!');
	};

	useEffect(() => {
		document.title = `${formatCategory(categoryId)} | Aurora`;
		setLoading(true);
		const fetchProducts = async () => {
			try {
				const data = await getProductsByCategory(categoryId);
				setProducts(data);
			} catch (error) {
				console.error('Error fetching products by category:', error);
			}
		};
		fetchProducts();
		setLoading(false);
	}, [categoryId]);

	return (
		<div className="flex flex-col items-center">
			{/* Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center bg-navy-900">
				<h1 className="text-5xl font-bold text-white">
					{formatCategory(categoryId)}
				</h1>
			</div>

			<div className="w-10/12 mx-auto mt-6">
				{loading ? (
					<p className="text-gray-600">Loading products...</p>
				) : products.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
						{products.map((product) => {
							// Handle multiple images by splitting the string
							const imagesArray = product.images
								? product.images.split(',')
								: [];
							const imageUrl =
								imagesArray.length > 0
									? imagesArray[0]
									: 'default-image.jpg';

							return (
								<div
									key={product.product_id}
									className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 flex flex-col"
								>
									<Link to={`/product/${product.product_id}`}>
										<div className="bg-white h-80 overflow-hidden">
											<img
												src={`https://dev-api.auroraenergy.co.zw/products/${imageUrl}`}
												alt={product.product_name}
												className="w-full h-full object-center object-contain " // Ensures the image is contained within the div
											/>
										</div>
									</Link>
									<div className="p-4 flex flex-col flex-grow">
										<h3 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden text-ellipsis line-clamp-2">
											{product.product_name}
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
												onClick={() =>
													handleAddToCart(product)
												}
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
						No products found for this category.
					</p>
				)}
			</div>
		</div>
	);
}

export default CategoryView;
