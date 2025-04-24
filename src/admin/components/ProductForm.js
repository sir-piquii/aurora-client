// EditProductForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct, addProduct } from '../../api';

const ProductForm = ({ product, onClose }) => {
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		benefits: '',
		warranty: '',
		category: '',
		images: [],
		datasheet: null,
		price_usd: 0.0,
		price_zwl: 0.0,
		discount: 0.0,
		quantity: 0,
		supplier: '1',
	});
	const [isEditMode, setIsEditMode] = useState(false);
	const [removeDatasheet, setRemoveDatasheet] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			setIsEditMode(true);
			const fetchProduct = async () => {
				try {
					const data = await getProductById(id);
					setFormData({
						name: data[0].product_name || '',
						description: data[0].product_description || '',
						benefits: data[0].product_benefits || '',
						warranty: data[0].product_warranty || '',
						category: data[0].category_name || '',
						images:
							typeof data[0].images === 'string' &&
							data[0].images.length > 0
								? data[0].images.split(',').map((img) => img)
								: [],
						datasheet: data[0].datasheet ? data[0].datasheet : null,
						price_usd: data[0].price_usd || 0.0,
						price_zwl: data[0].price_zwl || 0.0,
						discount: data[0].discount || 0.0,
						quantity: data[0].quantity || 0,
						supplier: data[0].supplier || '1',
					});
				} catch (error) {
					console.error('Error fetching product:', error);
				}
			};
			fetchProduct();
		}
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const cleanedImages = formData.images.map((img) =>
			img instanceof File ? img : img.split('/').pop(),
		);

		const submissionData = {
			...formData,
			images: cleanedImages,
			datasheet: removeDatasheet ? null : formData.datasheet,
		};

		try {
			if (isEditMode) {
				await updateProduct(id, submissionData);
			} else {
				await addProduct(submissionData);
			}
			navigate('/admin/products');
		} catch (error) {
			console.error('Error submitting product:', error);
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		setFormData({ ...formData, [name]: files });
	};

	const handleRemoveImage = (index) => {
		const updatedImages = [...formData.images];
		updatedImages.splice(index, 1);
		setFormData({ ...formData, images: updatedImages });
	};

	const handleRemoveDatasheet = () => {
		setFormData({ ...formData, datasheet: null });
		setRemoveDatasheet(true);
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				{isEditMode ? 'Edit Product' : 'Add Product'}
			</h2>
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<form onSubmit={handleSubmit}>
					{[
						{
							label: 'Name',
							name: 'name',
							type: 'text',
							required: true,
						},
						{
							label: 'Description',
							name: 'description',
							type: 'textarea',
							required: true,
						},
						{
							label: 'Benefits',
							name: 'benefits',
							type: 'textarea',
						},
						{
							label: 'Warranty (years)',
							name: 'warranty',
							type: 'number',
						},
						{ label: 'Category', name: 'category', type: 'text' },
						{
							label: 'Price (USD)',
							name: 'price_usd',
							type: 'number',
						},
						{
							label: 'Price (ZWL)',
							name: 'price_zwl',
							type: 'number',
						},
						{
							label: 'Discount (%)',
							name: 'discount',
							type: 'number',
						},
						{ label: 'Quantity', name: 'quantity', type: 'number' },
						{ label: 'Supplier', name: 'supplier', type: 'text' },
					].map(({ label, name, type, required }) => (
						<div className="mb-4" key={name}>
							<label className="block text-sm font-medium text-gray-700">
								{label}
							</label>
							{type === 'textarea' ? (
								<textarea
									name={name}
									value={formData[name]}
									onChange={handleChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
									required={required}
								/>
							) : (
								<input
									type={type}
									name={name}
									value={formData[name]}
									onChange={handleChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
									required={required}
								/>
							)}
						</div>
					))}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Images
						</label>
						<input
							type="file"
							name="images"
							multiple
							onChange={handleFileChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						/>
						{Array.isArray(formData.images) && (
							<div className="flex mt-2 space-x-2 flex-wrap">
								{formData.images.map((img, index) => (
									<div
										key={index}
										className="relative w-20 h-20"
									>
										<img
											src={`https://dev-api.auroraenergy.co.zw/products/${img}`}
											alt="Preview"
											className="w-full h-full object-cover rounded"
										/>
										<button
											type="button"
											onClick={() =>
												handleRemoveImage(index)
											}
											className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
										>
											X
										</button>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Datasheet
						</label>
						<input
							type="file"
							name="datasheet"
							onChange={handleFileChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						/>
						{formData.datasheet && (
							<div className="mt-2 text-sm text-gray-600 flex items-center space-x-2">
								<span>
									{typeof formData.datasheet === 'string'
										? formData.datasheet.split('/').pop()
										: formData.datasheet.name}
								</span>
								<button
									type="button"
									onClick={handleRemoveDatasheet}
									className="text-red-500 hover:underline"
								>
									Remove
								</button>
							</div>
						)}
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-orange-500 text-white px-6 py-2 rounded-full"
						>
							{isEditMode ? 'Update Product' : 'Add Product'}
						</button>
						<button
							type="button"
							onClick={onClose}
							className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-full"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductForm;
