import React, { useEffect, useState } from 'react';
import { addDealerInstallation } from '../../api';
import axios from 'axios';

function AddInstallations() {
	const [installations, setInstallations] = useState([
		{ systemDescription: '', sizeOfSystem: '', email: '', phoneNumber: '' },
	]);
	const [loading, setLoading] = useState(false);
	const id = localStorage.getItem('userId');

	const handleChange = (index, e) => {
		const newInstallations = [...installations];
		newInstallations[index][e.target.name] = e.target.value;
		setInstallations(newInstallations);
	};

	const handleAddInstallation = () => {
		setInstallations([
			...installations,
			{
				systemDescription: '',
				sizeOfSystem: '',
				email: '',
				phoneNumber: '',
			},
		]);
	};

	useEffect(() => {
		document.title = 'Add Dealer Installation | Dealer Registration';
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await addDealerInstallation(installations, id);
			console.log(response.data);
		} catch (error) {
			console.error('Error adding installations:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Add Dealer Installation
			</h2>
			<p className="text-gray-600 mb-4">
				You need at least three prior installations to be considered.
				You can add multiple installations by clicking the button below.
			</p>
			<form onSubmit={handleSubmit} className="space-y-6">
				{installations.map((installation, index) => (
					<div
						key={index}
						className="border p-4 rounded-lg bg-gray-50"
					>
						<h4 className="font-semibold mb-2">
							Installation #{index + 1}
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-gray-700">
									System Description
								</label>
								<input
									type="text"
									name="systemDescription"
									value={installation.systemDescription}
									onChange={(e) => handleChange(index, e)}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div>
								<label className="block text-gray-700">
									Size of System
								</label>
								<input
									type="text"
									name="sizeOfSystem"
									value={installation.sizeOfSystem}
									onChange={(e) => handleChange(index, e)}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div>
								<label className="block text-gray-700">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={installation.email}
									onChange={(e) => handleChange(index, e)}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div>
								<label className="block text-gray-700">
									Phone Number
								</label>
								<input
									type="tel"
									name="phoneNumber"
									value={installation.phoneNumber}
									onChange={(e) => handleChange(index, e)}
									className="w-full p-2 border rounded"
									required
								/>
							</div>
						</div>
					</div>
				))}

				<div className="flex gap-4">
					<button
						type="button"
						onClick={handleAddInstallation}
						className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300"
					>
						Add Another Installation
					</button>
					<button
						type="submit"
						className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
						disabled={loading}
					>
						{loading ? 'Submitting...' : 'Submit Installations'}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddInstallations;
