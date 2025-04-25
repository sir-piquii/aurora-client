import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	addFeaturedProduct,
	updateFeaturedProduct,
} from '../../api';

const FeaturedProductForm = ({ product, onCancel, onSave }) => {
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		description: '',
		image: null,
		imagePreview: null,
	});
	const [isEditMode, setIsEditMode] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			setIsEditMode(true);
			const fetchProduct = async () => {
				try {
					const data = [];
					setFormData({
						id: data[0].id || '',
						name: data[0].name || '',
						description: data[0].description || '',
						image: data[0].image || null,
						imagePreview: data[0].image || null,
					});
				} catch (error) {
					console.error('Error fetching product:', error);
				}
			};
			fetchProduct();
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const { name, file } = e.target;
		setFormData({
			...formData,
			[name]: file,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		onSave(formData);
	};

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg mb-4">
			<h3 className="text-2xl font-bold mb-4">
				{product ? 'Edit Featured Product' : 'Add Featured Product'}
			</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block font-semibold text-gray-700"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="description"
						className="block font-semibold text-gray-700"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="image"
						className="block font-semibold text-gray-700"
					>
						Image
					</label>
					<input
						type="file"
						id="image"
						name="image"
						accept="image/*"
						onChange={handleFileChange}
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
					{formData.imagePreview && (
						<div className="mt-2">
							<p className="text-sm text-gray-600 mb-1">
								Preview:
							</p>
							<img
								src={formData.imagePreview}
								alt="Preview"
								className="w-32 h-32 object-cover rounded"
							/>
						</div>
					)}
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-orange-500 text-white px-6 py-2 rounded-full"
					>
						{isEditMode
							? 'Update Featured Product'
							: 'Add Featured Product'}
					</button>
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-full"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default FeaturedProductForm;
