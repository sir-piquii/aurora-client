import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../api';
import { FaStar, FaCartPlus } from 'react-icons/fa';

function CategoryView() {
	const { categoryId } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const perPage = 10;

	const formatCategory = (slug) => {
		return slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const handleAddToCart = (product) => {
		const storedCart = localStorage.getItem('cart');
		let cart = storedCart ? JSON.parse(storedCart) : null;
		const now = Date.now();
		const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

		if (cart && cart.expires && now > cart.expires) {
			cart = null;
		}

		if (!cart) {
			cart = {
				items: [],
				expires: now + THIRTY_DAYS,
			};
		}

		const existingItem = cart.items.find(
			(item) => item.productId === product.product_id,
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cart.items.push({
				productId: product.product_id,
				productName: product.product_name,
				image: product.images.split(',')[0],
				quantity: 1,
			});
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		alert('Product added to cart!');
	};

	useEffect(() => {
		document.title = `${formatCategory(categoryId)} | Aurora`;
		setCurrentPage(1); // Reset to page 1 when category changes
	}, [categoryId]);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const data = await getProductsByCategory(
					categoryId,
					currentPage,
					perPage,
				);
				setProducts(data.rows);
				setTotalPages(Math.ceil(data.count / perPage));
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [categoryId, currentPage]);

	return (
		<div className="flex flex-col items-center">
			{/* Header */}
			<div className="w-full h-24 flex items-center justify-center bg-navy-900">
				<h1 className="text-5xl font-bold text-white">
					{formatCategory(categoryId)}
				</h1>
			</div>

			<div className="w-10/12 mx-auto mt-6">
				{loading ? (
					<p className="text-gray-600">Loading products...</p>
				) : products.length > 0 ? (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
							{products.map((product) => {
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
										<Link
											to={`/product/${product.product_id}`}
										>
											<div className="bg-white h-80 overflow-hidden">
												<img
													src={`https://dev-api.auroraenergy.co.zw/products/${imageUrl}`}
													alt={product.product_name}
													className="w-full h-full object-center object-contain"
												/>
											</div>
										</Link>
										<div className="p-4 flex flex-col flex-grow">
											<h3 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden text-ellipsis line-clamp-2">
												{product.product_name}
											</h3>
											<div className="flex items-center mb-4">
												{[...Array(5)].map((_, i) => (
													<FaStar
														key={i}
														className="text-yellow-500"
													/>
												))}
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

						{/* Pagination Controls */}
						<div className="flex justify-center mt-6 space-x-2">
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`px-4 py-2 rounded-full text-white transition-all ${
										currentPage === i + 1
											? 'bg-orange-500'
											: 'bg-navy-900 hover:bg-orange-400'
									}`}
								>
									{i + 1}
								</button>
							))}
						</div>
					</>
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
