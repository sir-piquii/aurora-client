import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { getCaseStudyById, updateCaseStudy, addCaseStudy } from '../../api';

const CaseStudyForm = () => {
	const [caseStudy, setCaseStudy] = useState({
		projectName: '',
		location: '',
		systemCapacity: '',
	});
	const [isEditing, setIsEditing] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate(); // Replace useHistory with useNavigate()

	useEffect(() => {
		if (id) {
			setIsEditing(true);
			const fetchCaseStudy = async () => {
				try {
					const data = await getCaseStudyById(id);
					if (data) {
						setCaseStudy({
							projectName: data[0].projectName || '',
							location: data[0].location || '',
							systemCapacity: data[0].systemCapacity || '',
						});
					} else {
						console.error('Case study not found.');
					}
				} catch (error) {
					console.error('Error fetching case study:', error);
				}
			};
			fetchCaseStudy();
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCaseStudy({ ...caseStudy, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (isEditing) {
				await updateCaseStudy(id, caseStudy);
			} else {
				await addCaseStudy(caseStudy);
			}
			navigate('/admin/case-studies');
		} catch (error) {
			console.error('Error saving case study:', error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				{isEditing ? 'Edit Case Study' : 'Add Case Study'}
			</h2>
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-lg"
			>
				<div className="mb-4">
					<label
						htmlFor="projectName"
						className="block text-sm font-medium text-gray-700"
					>
						Project Name
					</label>
					<input
						type="text"
						id="projectName"
						name="projectName"
						value={caseStudy.projectName || ''}
						onChange={handleChange}
						className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="location"
						className="block text-sm font-medium text-gray-700"
					>
						Location
					</label>
					<input
						type="text"
						id="location"
						name="location"
						value={caseStudy.location || ''}
						onChange={handleChange}
						className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="systemCapacity"
						className="block text-sm font-medium text-gray-700"
					>
						System Capacity
					</label>
					<input
						type="text"
						id="systemCapacity"
						name="systemCapacity"
						value={caseStudy.systemCapacity || ''}
						onChange={handleChange}
						className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
					/>
				</div>
				<div className="mt-6 justify-end">
					<button
						type="submit"
						className="bg-orange-500 text-white px-6 py-2 rounded-full"
					>
						{isEditing ? 'Update Case Study' : 'Add Case Study'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CaseStudyForm;
