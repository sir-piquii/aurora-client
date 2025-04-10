import React, { useState } from 'react';
import { uploadCertificate } from '../../api';
import { useNavigate } from 'react-router-dom';

const CertificatesForm = () => {
	const [title, setTitle] = useState('');
	const [type, setType] = useState('');
	const [path, setPath] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Add a new certificate
			await uploadCertificate({ title, type, path });
			console.log('Certificate added successfully!');
			navigate('/admin/certificates');
		} catch (error) {
			console.error('Error adding certificate:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Add New Certificate
			</h2>
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="type"
							className="block text-gray-700 font-medium mb-2"
						>
							Type
						</label>
						<input
							type="text"
							id="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
							required
							className="w-full p-3 border border-gray-300 rounded-lg"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="title"
							className="block text-gray-700 font-medium mb-2"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className="w-full p-3 border border-gray-300 rounded-lg"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="path"
							className="block text-gray-700 font-medium mb-2"
						>
							Path
						</label>
						<input
							type="text"
							id="path"
							value={path}
							onChange={(e) => setPath(e.target.value)}
							required
							className="w-full p-3 border border-gray-300 rounded-lg"
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							className={`px-4 py-2 bg-orange-500 text-white rounded-lg ${
								loading ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={loading}
						>
							{loading ? 'Adding...' : 'Add Certificate'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CertificatesForm;
