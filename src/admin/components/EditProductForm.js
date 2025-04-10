// EditProductForm.js
import React, { useState } from 'react';
import { updateProduct } from '../../api';

const EditProductForm = ({ product, onClose }) => {
	const [formData, setFormData] = useState({
		product_name: product?.product_name || '',
		product_description: product?.product_description || '',
		product_benefits: product?.product_benefits || '',
		product_warranty: product?.product_warranty || '',
		category_name: product?.category_name || '',
		images: product?.images || [],
		datasheet: product?.datasheet || null,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		setFormData({ ...formData, [name]: files });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateProduct(product.product_id, formData);
			onClose();
		} catch (error) {
			console.error('Error updating product:', error);
		}
	};

	return (
		<div className="max-w-3xl mx-auto my-12 bg-white p-6 rounded-lg shadow-lg">
			<h2 className="text-xl font-bold mb-4">
				{product ? 'Edit Product' : 'Add Product'}
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700">Name</label>
					<input
						type="text"
						name="product_name"
						value={formData.product_name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Description</label>
					<textarea
						name="product_description"
						value={formData.product_description}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Benefits</label>
					<textarea
						name="product_benefits"
						value={formData.product_benefits}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">
						Warranty (years)
					</label>
					<input
						type="number"
						name="product_warranty"
						value={formData.product_warranty}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Category</label>
					<input
						type="text"
						name="category_name"
						value={formData.category_name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Images</label>
					<input
						type="file"
						name="images"
						multiple
						onChange={handleFileChange}
						className="w-full p-2 border rounded"
					/>
					<div className="flex mt-2 space-x-2">
						{Array.isArray(formData.images) &&
							formData.images.map((img, index) => (
								<img
									key={index}
									src={URL.createObjectURL(img)}
									alt="Preview"
									className="w-16 h-16 object-cover rounded-md"
								/>
							))}
					</div>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Datasheet</label>
					<input
						type="file"
						name="datasheet"
						onChange={handleFileChange}
						className="w-full p-2 border rounded"
					/>
					{formData.datasheet && (
						<p className="mt-2">
							Uploaded file: {formData.datasheet.name}
						</p>
					)}
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Save
				</button>
				<button
					type="button"
					className="ml-4 bg-gray-400 text-white px-4 py-2 rounded"
					onClick={onClose}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default EditProductForm;
