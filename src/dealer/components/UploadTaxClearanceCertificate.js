import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { uploadTaxCertificate } from '../../api';

function UploadTaxClearanceCertificate() {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const { id } = useParams(); // Assuming you're passing the dealer's user ID in the route

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	useEffect(() => {
		document.title =
			'Upload Tax Clearance Certificate | Dealer Registration';
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append('taxClearance', file);

		try {
			setLoading(true);
			const response = await uploadTaxCertificate(formData, id);
			console.log('Upload success:', response.data);
			alert('Tax clearance certificate uploaded successfully!');
		} catch (error) {
			console.error('Error uploading tax clearance:', error);
			alert('Failed to upload tax clearance certificate.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Upload Tax Clearance Certificate
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Select Tax Clearance File
					</label>
					<input
						type="file"
						accept=".pdf,.jpg,.jpeg,.png"
						onChange={handleFileChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
				>
					{loading ? 'Uploading...' : 'Upload'}
				</button>
			</form>
		</div>
	);
}

export default UploadTaxClearanceCertificate;
