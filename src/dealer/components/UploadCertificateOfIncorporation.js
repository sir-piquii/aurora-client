import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { uploadIncorporationCertificate } from '../../api';

function UploadCertificateOfIncorporation() {
	const { id } = useParams(); // Assuming you're passing dealer ID in route param
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	useEffect(() => {
		document.title =
			'Upload Certificate of Incorporation | Dealer Registration';
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append('certificate', file);

		setLoading(true);

		try {
			const response = await uploadIncorporationCertificate(formData, id);
			console.log('Upload successful:', response.data);
			alert('Certificate uploaded successfully');
		} catch (error) {
			console.error('Error uploading certificate:', error);
			alert('Failed to upload certificate');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Upload Certificate of Incorporation
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Select Certificate File
					</label>
					<input
						type="file"
						onChange={handleFileChange}
						accept=".pdf, image/*"
						className="w-full border p-2 rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
					disabled={loading}
				>
					{loading ? 'Uploading...' : 'Upload Certificate'}
				</button>
			</form>
		</div>
	);
}

export default UploadCertificateOfIncorporation;
