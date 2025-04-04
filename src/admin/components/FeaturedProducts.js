import React, { useEffect, useState } from 'react';
import {
	getFeaturedProducts,
	deleteProduct,
	updateFeaturedProducts,
	addFeaturedProducts,
} from '../../api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import FeaturedProductForm from './FeaturedProductForm'; // The form component

const FeaturedProducts = () => {
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isEditing, setIsEditing] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);
	const productsPerPage = 10;

	useEffect(() => {
		document.title = 'Featured Products | Admin Panel';

		const fetchFeaturedProducts = async () => {
			try {
				const products = await getFeaturedProducts();
				setFeaturedProducts(products);
			} catch (error) {
				console.error('Error fetching featured products:', error);
			}
		};

		fetchFeaturedProducts();
	}, []);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentItems = featuredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = async (productId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this product?',
		);
		if (confirmDelete) {
			try {
				await deleteProduct(productId);
				setFeaturedProducts(
					featuredProducts.filter(
						(product) => product.id !== productId,
					),
				);
			} catch (error) {
				console.error('Error deleting product:', error);
			}
		}
	};

	const handleEdit = (productId) => {
		setIsEditing(true);
		const productToEdit = featuredProducts.find(
			(product) => product.id === productId,
		);
		setCurrentProduct(productToEdit);
	};

	const handleAdd = () => {
		setIsEditing(true);
		setCurrentProduct(null); // Clear form for adding new product
	};

	return (
		<div className="admin-featured-products mt-4">
			<h2 className="text-2xl font-bold mb-4">Featured Products</h2>

			{/* Add Featured Product Button */}
			<button
				onClick={handleAdd}
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add Featured Product
			</button>

			{/* Show the Form for Adding/Editing Featured Product */}
			{isEditing && (
				<FeaturedProductForm
					product={currentProduct}
					onCancel={() => setIsEditing(false)}
					onSave={async (updatedProduct) => {
						if (updatedProduct.id) {
							// Update existing product
							await updateFeaturedProducts(updatedProduct);
						} else {
							// Add new product
							await addFeaturedProducts(updatedProduct);
						}
						setIsEditing(false);
					}}
				/>
			)}

			{/* Display the list of featured products */}
			{!isEditing && (
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							<th className="border border-gray-300 px-4 py-2">
								ID
							</th>
							<th className="border border-gray-300 px-4 py-2">
								Image
							</th>
							<th className="border border-gray-300 px-4 py-2">
								Name
							</th>
							<th className="border border-gray-300 px-4 py-2">
								Description
							</th>
							<th className="border border-gray-300 px-4 py-2">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.map((product) => (
							<tr key={product.id} className="text-center">
								<td className="border border-gray-300 px-4 py-2">
									{product.id}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									<img
										src={`https://dev-api.auroraenergy.co.zw/featuredProducts/${product.image}`}
										alt={product.name}
										className="h-16 w-16 object-cover mx-auto"
									/>
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{product.name}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{product.description}
								</td>
								<td className="border border-gray-300 px-4 py-2 flex items-center justify-center space-x-4">
									<FaEdit
										onClick={() => handleEdit(product.id)}
										size={18}
										className="text-navy-900 cursor-pointer"
									/>
									<FaTrash
										onClick={() => handleDelete(product.id)}
										size={18}
										className="text-orange-500 cursor-pointer"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6 space-x-2">
				{Array.from(
					{
						length: Math.ceil(
							featuredProducts.length / productsPerPage,
						),
					},
					(_, i) => (
						<button
							key={i}
							onClick={() => paginate(i + 1)}
							className={`px-4 py-2 rounded-full text-white transition-all ${
								currentPage === i + 1
									? 'bg-orange-500'
									: 'bg-navy-900 hover:bg-orange-400'
							}`}
						>
							{i + 1}
						</button>
					),
				)}
			</div>
		</div>
	);
};

export default FeaturedProducts;
