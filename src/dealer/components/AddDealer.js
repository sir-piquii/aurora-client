import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addDealer } from '../../api';

function AddDealer() {
	const [formData, setFormData] = useState({
		registeredCompanyName: '',
		tradingName: '',
		companyRegistrationNumber: '',
		VATNumber: '',
		TIN: '',
	});
	const [loading, setLoading] = useState(false);
	const userId = localStorage.getItem('userId');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		document.title = 'Add Dealer | Dealer Registration';
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await addDealer(formData, userId);
			console.log('Dealer added successfully:', response.data);
			// You can also reset the form or navigate if needed
		} catch (error) {
			console.error('Error adding dealer:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Add a Dealer
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-gray-700">
						Registered Company Name
					</label>
					<input
						type="text"
						name="registeredCompanyName"
						value={formData.registeredCompanyName}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700">Trading Name</label>
					<input
						type="text"
						name="tradingName"
						value={formData.tradingName}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700">
						Company Registration Number
					</label>
					<input
						type="text"
						name="companyRegistrationNumber"
						value={formData.companyRegistrationNumber}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-gray-700">
						VAT Number (Optional)
					</label>
					<input
						type="text"
						name="VATNumber"
						value={formData.VATNumber}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label className="block text-gray-700">
						TIN (Optional)
					</label>
					<input
						type="text"
						name="TIN"
						value={formData.TIN}
						onChange={handleChange}
						className="w-full p-2 border rounded"
					/>
				</div>
				<button
					type="submit"
					className="bg-orange-500 text-white px-4 py-2 rounded-full"
					disabled={loading}
				>
					{loading ? 'Submitting...' : 'Submit Dealer'}
				</button>
			</form>
		</div>
	);
}

export default AddDealer;
