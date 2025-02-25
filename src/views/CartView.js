import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';

export default function Cart() {
	const [cartItems, setCartItems] = useState([]);
	const [error, setError] = useState('');

	// Function to load cart items from localStorage
	const fetchCartItems = () => {
		try {
			const storedCart = localStorage.getItem('cart');
			if (storedCart) {
				const parsedCart = JSON.parse(storedCart);
				// Check if the cart has expired
				if (Date.now() > parsedCart.expires) {
					localStorage.removeItem('cart');
					setCartItems([]);
				} else {
					setCartItems(parsedCart.items);
				}
			} else {
				setCartItems([]);
			}
		} catch (err) {
			setError('Failed to load cart items.');
		}
	};

	useEffect(() => {
		document.title = 'Cart | Aurora';
		fetchCartItems();
	}, []);

	// Group products by productId in case there are duplicates
	const groupedProducts = cartItems.reduce((acc, item) => {
		const id = item.productId;
		if (acc[id]) {
			acc[id].quantity += item.quantity;
		} else {
			acc[id] = { ...item };
		}
		return acc;
	}, {});

	// Convert grouped products to an array and add an 'id' property for ease-of-use in the UI
	const products = Object.values(groupedProducts).map((product) => ({
		...product,
		id: product.productId,
	}));

	// Update the quantity for a product in the localStorage cart
	const handleQuantityChange = (productId, newQuantity) => {
		if (newQuantity < 1) return;
		try {
			const storedCart = localStorage.getItem('cart');
			if (storedCart) {
				const cart = JSON.parse(storedCart);
				const index = cart.items.findIndex(
					(item) => item.productId === productId,
				);
				if (index !== -1) {
					cart.items[index].quantity = newQuantity;
					localStorage.setItem('cart', JSON.stringify(cart));
					fetchCartItems();
				}
			}
		} catch (err) {
			setError('Failed to update quantity.');
		}
	};

	// Remove a product from the cart stored in localStorage
	const handleDelete = (productId) => {
		try {
			const storedCart = localStorage.getItem('cart');
			if (storedCart) {
				const cart = JSON.parse(storedCart);
				cart.items = cart.items.filter(
					(item) => item.productId !== productId,
				);
				localStorage.setItem('cart', JSON.stringify(cart));
				fetchCartItems();
			}
		} catch (err) {
			setError('Failed to delete product.');
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
					{cartItems.length === 0 ? (
						<p className="text-center text-gray-600">
							Your cart is empty.
						</p>
					) : (
						cartItems.map((cartItem) => (
							<div
								key={cartItem.productId}
								className="flex items-center justify-between py-4 border-b border-gray-200"
							>
								<div className="flex items-center space-x-4">
									<img
										src={`https://dev-api.auroraenergy.co.zw/products/${cartItem.image}`}
										alt={cartItem.productName}
										className="w-16 h-16 object-cover rounded"
									/>
									<div>
										<h3 className="font-bold">
											{cartItem.productName}
										</h3>
										<p className="text-sm text-gray-600">
											ID: {cartItem.productId}
										</p>
										<div className="flex items-center space-x-2">
											<InputNumber
												min={1}
												value={cartItem.quantity}
												onChange={(value) =>
													handleQuantityChange(
														cartItem.productId,
														value,
													)
												}
												className="w-16"
											/>
										</div>
									</div>
								</div>
								<button
									onClick={() =>
										handleDelete(cartItem.productId)
									}
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
							<div className="space-y-4">
								{cartItems.map((cartItem) => (
									<div
										key={cartItem.productId}
										className="flex justify-between items-center"
									>
										<span>
											{cartItem.productName} (Qty:{' '}
											{cartItem.quantity})
										</span>
									</div>
								))}
							</div>
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
