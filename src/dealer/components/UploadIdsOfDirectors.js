import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { uploadNationalId } from '../../api';

function UploadIdsOfDirectors() {
	const { id } = useParams();
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleFileChange = (e) => {
		setFiles(e.target.files);
	};

	useEffect(() => {
		document.title = 'Upload National ID Copies | Dealer Panel';
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (files.length < 3 || files.length > 4) {
			alert('Please upload between 3 and 4 ID copies.');
			return;
		}

		setLoading(true);
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('IDsOfDirectors', files[i]);
		}

		try {
			const response = await uploadNationalId(formData, id);
			console.log('Upload successful:', response.data);
			alert('IDs uploaded successfully!');
		} catch (error) {
			console.error('Error uploading IDs:', error);
			alert('There was an error uploading the files.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Upload National ID Copies of Directors
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-gray-700 mb-1">
						Upload between 3 and 4 ID files
					</label>
					<input
						type="file"
						multiple
						onChange={handleFileChange}
						accept=".pdf,.jpg,.jpeg,.png"
						className="w-full border p-2 rounded"
						required
					/>
				</div>

				<button
					type="submit"
					className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
					disabled={loading}
				>
					{loading ? 'Uploading...' : 'Upload IDs'}
				</button>
			</form>
		</div>
	);
}

export default UploadIdsOfDirectors;
