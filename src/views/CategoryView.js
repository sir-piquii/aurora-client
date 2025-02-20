import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../api';

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

	// Simulate API call to fetch products by category
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
		const timer = setTimeout(() => {
			fetchProducts();
			setLoading(false);
		}, 500);
		return () => clearTimeout(timer);
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
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
								<Link
									key={product.product_id}
									to={`/product/${product.product_id}`}
									className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
								>
									<img
										src={`https://dev-api.auroraenergy.co.zw/products/${imageUrl}`}
										alt={product.product_name}
										className="w-[80%] h-56 object-cover"
									/>
									<div className="p-4">
										<h3 className="text-xl font-bold text-gray-800">
											{product.product_name}
										</h3>
										<p className="mt-2 text-gray-600 text-sm">
											{product.product_description
												.length > 100
												? product.product_description.substring(
														0,
														100,
												  ) + '...'
												: product.product_description}
										</p>
									</div>
								</Link>
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
