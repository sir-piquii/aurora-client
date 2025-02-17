import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';

export default function Cart() {
	const [cartItems, setCartItems] = useState([]);
	const [error, setError] = useState('');

	// Fetch cart items on component mount
	useEffect(() => {
		document.title = 'Cart | Aurora';
		fetchCartItems();
	}, []);

	// Function to fetch cart data from the API
	const fetchCartItems = async () => {
		try {
			// const response = await fetch('/api/cart');
			// if (!response.ok) {
			// 	throw new Error('Failed to fetch cart items.');
			// }
			// const data = await response.json();

			const data = [
				{
					id: 1,
					name: 'Product 1',
					price: 29.99,
					image: 'https://via.placeholder.com/150',
				},
				{
					id: 2,
					name: 'Product 2',
					price: 49.99,
					image: 'https://via.placeholder.com/150',
				},
				{
					id: 3,
					name: 'Product 3',
					price: 19.99,
					image: 'https://via.placeholder.com/150',
				},
				{
					id: 2,
					name: 'Product 2',
					price: 49.99,
					image: 'https://via.placeholder.com/150',
				},
			];
			setCartItems(data);
		} catch (err) {
			setError(err.message);

			const data = [
				{
					id: 1,
					name: 'Product 1',
					price: 29.99,
					image: 'https://via.placeholder.com/150',
				},
				{
					id: 2,
					name: 'Product 2',
					price: 49.99,
					image: 'https://via.placeholder.com/150',
				},
				{
					id: 3,
					name: 'Product 3',
					price: 19.99,
					image: 'https://via.placeholder.com/150',
				},
			];
			setCartItems(data);
		}
	};

	// Group products by id, consolidating duplicates and tracking quantity
	const groupedProducts = cartItems.reduce((acc, item) => {
		if (acc[item.id]) {
			acc[item.id].quantity += 1;
		} else {
			acc[item.id] = { ...item, quantity: 1 };
		}
		return acc;
	}, {});

	const products = Object.values(groupedProducts);

	// Calculate total price (assuming each product has a "price" property)
	const totalPrice = products.reduce(
		(total, product) => total + product.price * product.quantity,
		0,
	);

	const handleQuantityChange = async (productId, newQuantity) => {
		if (newQuantity < 1) return;

		try {
			const response = await fetch(`/api/cart/${productId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ quantity: newQuantity }),
			});
			if (!response.ok) {
				throw new Error('Failed to update product quantity.');
			}
			fetchCartItems();
		} catch (err) {
			setError(err.message);
		}
	};

	// Delete a product from the cart by calling the delete endpoint
	const handleDelete = async (productId) => {
		try {
			const response = await fetch(`/api/cart/${productId}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Failed to delete product from cart.');
			}
			fetchCartItems();
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex flex-col items-center">
			{/* Navy Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center bg-navy-900">
				<h1 className="text-5xl font-bold text-white">Cart</h1>
			</div>

			{/* Display any error messages */}
			{error && (
				<div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
					{error}
				</div>
			)}

			{/* Container grid: 9 columns for cart items, 3 for order summary */}
			<div className="w-10/12 mx-auto mt-6 grid grid-cols-12 gap-6">
				{/* Cart Items Section (9 columns) */}
				<div className="col-span-12 md:col-span-9 bg-white p-8 rounded-lg shadow-lg">
					<h2
						className="text-2xl font-bold mb-6 text-center"
						style={{ color: '#001f3f' }}
					>
						Your Cart Items
					</h2>
					{products.length === 0 ? (
						<p className="text-center text-gray-600">
							Your cart is empty.
						</p>
					) : (
						products.map((product) => (
							<div
								key={product.id}
								className="flex items-center justify-between py-4 border-b border-gray-200"
							>
								<div className="flex items-center space-x-4">
									<img
										src={product.image}
										alt={product.name}
										className="w-16 h-16 object-cover rounded"
									/>
									<div>
										<h3 className="font-bold">
											{product.name}
										</h3>
										<p className="text-sm text-gray-600">
											ID: {product.id}
										</p>
										<p className="text-sm text-gray-600">
											Price: ${product.price.toFixed(2)}
										</p>
										<div className="flex items-center space-x-2">
											<InputNumber
												min={1}
												value={product.quantity}
												onChange={(value) =>
													handleQuantityChange(
														product.id,
														value,
													)
												}
												className="w-16"
											/>
										</div>
									</div>
								</div>
								<button
									onClick={() => handleDelete(product.id)}
									className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all"
								>
									<FaTrash />
								</button>
							</div>
						))
					)}
				</div>

				{/* Order Summary Section (3 columns) */}
				<div className="col-span-12 md:col-span-3 bg-white p-8 rounded-lg shadow-lg">
					<h2
						className="text-2xl font-bold mb-6 text-center"
						style={{ color: '#001f3f' }}
					>
						Order Summary
					</h2>
					{products.length === 0 ? (
						<p className="text-center text-gray-600">
							No items to summarize.
						</p>
					) : (
						<>
							{/* Display product names, quantities, and total price per item in rows */}
							<div className="space-y-4">
								{products.map((product) => (
									<div
										key={product.id}
										className="flex justify-between items-center"
									>
										<span>
											{product.name} (Qty:{' '}
											{product.quantity})
										</span>
										<span>
											$
											{(
												product.price * product.quantity
											).toFixed(2)}
										</span>
									</div>
								))}
							</div>
							{/* Total Price Calculation */}
							<div className="flex justify-between font-bold text-lg mt-6 border-t pt-4">
								<span>Total:</span>
								<span>${totalPrice.toFixed(2)}</span>
							</div>
							{/* Checkout Button */}
							<div className="flex justify-center mt-8 mx-auto">
								<button className="p-2 w-full bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all">
									Checkout
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
