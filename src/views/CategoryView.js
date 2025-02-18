import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CategoryView() {
	const { categoryId } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	// Simulate API call to fetch products by category
	useEffect(() => {
		document.title = `Category: ${categoryId} | Aurora`;
		setLoading(true);
		setTimeout(() => {
			// Simulated data based on categoryId
			const data = [
				{
					id: 201,
					name: `${categoryId} Product 1`,
					price: 59.99,
					image: 'https://via.placeholder.com/200',
					description: `Description for ${categoryId} Product 1`,
				},
				{
					id: 202,
					name: `${categoryId} Product 2`,
					price: 89.99,
					image: 'https://via.placeholder.com/200',
					description: `Description for ${categoryId} Product 2`,
				},
				{
					id: 203,
					name: `${categoryId} Product 3`,
					price: 129.99,
					image: 'https://via.placeholder.com/200',
					description: `Description for ${categoryId} Product 3`,
				},
			];
			setProducts(data);
			setLoading(false);
		}, 500);
	}, [categoryId]);

	return (
		<div className="flex flex-col items-center">
			{/* Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center bg-navy-900">
				<h1 className="text-5xl font-bold text-white">
					Category: {categoryId}
				</h1>
			</div>

			<div className="w-10/12 mx-auto mt-6 bg-white p-8 rounded-lg shadow-lg">
				{loading ? (
					<p className="text-gray-600">Loading products...</p>
				) : products.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{products.map((product) => (
							<Link
								key={product.id}
								to={`/product/${product.id}`}
								className="border rounded p-4 hover:shadow-md transition-shadow"
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-40 object-cover rounded mb-2"
								/>
								<h3 className="font-bold text-lg">
									{product.name}
								</h3>
								<p className="text-gray-700">
									${product.price.toFixed(2)}
								</p>
							</Link>
						))}
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
