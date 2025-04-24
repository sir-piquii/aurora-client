import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	useEffect(() => {
		document.title = 'Products | Admin Panel';
		const fetchProducts = async () => {
			try {
				const data = await getAllProducts();
				setProducts(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};
		fetchProducts();
	}, []);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = (productId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this product?',
		);
		if (confirmDelete) {
			const deleteProductAsync = async () => {
				try {
					await deleteProduct(productId);
					setProducts(
						products.filter(
							(product) => product.product_id !== productId,
						),
					);
					console.log('Product deleted successfully.');
				} catch (error) {
					console.error('Error deleting product:', error);
				}
			};
			deleteProductAsync();
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Manage Products
			</h2>
			<Link
				to="/admin/products/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add Product
			</Link>
			<div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">ID</th>
							<th className="p-3 border">Name</th>
							<th className="p-3 border">Category</th>
							<th className="p-3 border">Description</th>
							<th className="p-3 border">Benefits</th>
							<th className="p-3 border">Warranty</th>
							<th className="p-3 border">Images</th>
							<th className="p-3 border">Datasheet</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentProducts.length > 0 ? (
							currentProducts.map((product) => (
								<tr
									key={product.product_id}
									className="hover:bg-gray-50"
								>
									<td className="p-3 border">
										{product.product_id}
									</td>
									<td className="p-3 border">
										{product.product_name}
									</td>
									<td className="p-3 border">
										{product.category_name}
									</td>
									<td className="p-3 border max-w-xs truncate">
										{product.product_description}
									</td>
									<td className="p-3 border max-w-xs truncate">
										{product.product_benefits || 'N/A'}
									</td>
									<td className="p-3 border">
										{product.product_warranty
											? `${product.product_warranty} years`
											: 'N/A'}
									</td>
									<td className="p-3 border">
										{product.images
											? product.images
													.split(',')
													.map((img, index) => (
														<img
															key={index}
															src={`https://dev-api.auroraenergy.co.zw/products/${img}`}
															alt="Product"
															className="w-16 h-16 object-cover rounded-md inline-block mr-2"
														/>
													))
											: 'No Image'}
									</td>
									<td className="p-3 border">
										{product.datasheet ? (
											<a
												href={`https://dev-api.auroraenergy.co.zw/datasheets/${product.datasheet}`}
												className="text-blue-500 hover:underline"
												target="_blank"
												rel="noopener noreferrer"
											>
												View Datasheet
											</a>
										) : (
											'N/A'
										)}
									</td>
									<td className="border p-4 flex items-center justify-center space-x-4">
										<Link
											to={`/admin/products/edit/${product.product_id}`}
											className="text-navy-900"
										>
											<FaEdit
												size={18}
												className="cursor-pointer"
											/>
										</Link>
										<FaTrash
											onClick={() =>
												handleDelete(product.product_id)
											}
											size={18}
											className="text-orange-500 cursor-pointer"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="9" className="p-4 text-center">
									No products available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6 space-x-2">
				{Array.from(
					{ length: Math.ceil(products.length / productsPerPage) },
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

export default Products;
