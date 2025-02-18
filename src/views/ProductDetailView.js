import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailView() {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	// Simulate API call to fetch product details
	useEffect(() => {
		document.title = `Product Detail | Aurora`;
		setLoading(true);
		setTimeout(() => {
			// Example static data; replace with your API call
			const data = {
				id: productId,
				name: 'Product Detail Example',
				price: 149.99,
				image: 'https://via.placeholder.com/400',
				description:
					'This is a detailed description of the product. It includes all relevant information, features, and specifications for the user.',
				specifications: 'Key specifications of the product go here.',
				reviews: [
					{ user: 'Alice', comment: 'Great product!' },
					{
						user: 'Bob',
						comment: 'Really enjoyed using this product.',
					},
				],
			};
			setProduct(data);
			setLoading(false);
		}, 500);
	}, [productId]);

	return (
		<div className="flex flex-col items-center">
			{/* Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center bg-navy-900">
				<h1 className="text-5xl font-bold text-white">
					Product Detail
				</h1>
			</div>

			<div className="w-10/12 mx-auto mt-6 bg-white p-8 rounded-lg shadow-lg">
				{loading ? (
					<p className="text-gray-600">Loading product details...</p>
				) : product ? (
					<div className="space-y-6">
						<img
							src={product.image}
							alt={product.name}
							className="w-full h-80 object-cover rounded"
						/>
						<h2
							className="text-3xl font-bold"
							style={{ color: '#001f3f' }}
						>
							{product.name}
						</h2>
						<p className="text-xl font-semibold">
							${product.price.toFixed(2)}
						</p>
						<p>{product.description}</p>
						<div>
							<h3 className="font-bold">Specifications:</h3>
							<p>{product.specifications}</p>
						</div>
						<div>
							<h3 className="font-bold">Reviews:</h3>
							{product.reviews.map((review, idx) => (
								<div key={idx} className="border-b py-2">
									<p className="font-semibold">
										{review.user}:
									</p>
									<p>{review.comment}</p>
								</div>
							))}
						</div>
					</div>
				) : (
					<p className="text-gray-600">Product not found.</p>
				)}
			</div>
		</div>
	);
}

export default ProductDetailView;
