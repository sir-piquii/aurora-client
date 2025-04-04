import React, { useState, useEffect } from 'react';

const FeaturedProductForm = ({ product, onCancel, onSave }) => {
	const [formData, setFormData] = useState({
		id: '',
		name: '',
		description: '',
		image: '',
	});

	useEffect(() => {
		if (product) {
			setFormData({
				id: product.id,
				name: product.name,
				description: product.description,
				image: product.image,
			});
		}
	}, [product]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
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
						Image URL
					</label>
					<input
						type="text"
						id="image"
						name="image"
						value={formData.image}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div className="flex justify-end space-x-4">
					<button
						type="button"
						onClick={onCancel}
						className="bg-navy-900 text-white px-6 py-2 rounded-full"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-orange-500 text-white px-6 py-2 rounded-full"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default FeaturedProductForm;
