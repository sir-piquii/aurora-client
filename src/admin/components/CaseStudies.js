import React, { useEffect, useState } from 'react';
import { getCaseStudies, deleteCaseStudy } from '../../api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
	const [caseStudies, setCaseStudies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const caseStudiesPerPage = 10;

	useEffect(() => {
		document.title = 'Case Studies | Admin Panel';
		const fetchCaseStudies = async () => {
			try {
				const data = await getCaseStudies();
				setCaseStudies(data);
			} catch (error) {
				console.error('Error fetching case studies:', error);
			}
		};
		fetchCaseStudies();
	}, []);

	const indexOfLastCaseStudy = currentPage * caseStudiesPerPage;
	const indexOfFirstCaseStudy = indexOfLastCaseStudy - caseStudiesPerPage;
	const currentCaseStudies = caseStudies.slice(
		indexOfFirstCaseStudy,
		indexOfLastCaseStudy,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = (caseStudyId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this case study?',
		);
		if (confirmDelete) {
			const deleteCaseStudyAsync = async () => {
				try {
					await deleteCaseStudy(caseStudyId);
					setCaseStudies(
						caseStudies.filter(
							(caseStudy) => caseStudy.id !== caseStudyId,
						),
					);
					console.log('Case study deleted successfully.');
				} catch (error) {
					console.error('Error deleting case study:', error);
				}
			};
			deleteCaseStudyAsync();
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Manage Case Studies
			</h2>
			<Link
				to="/admin/case-studies/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add Case Study
			</Link>
			<div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">ID</th>
							<th className="p-3 border">Project Name</th>
							<th className="p-3 border">Location</th>
							<th className="p-3 border">System Capacity</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentCaseStudies.length > 0 ? (
							currentCaseStudies.map((caseStudy) => (
								<tr
									key={caseStudy.id}
									className="hover:bg-gray-50"
								>
									<td className="p-3 border">
										{caseStudy.id}
									</td>
									<td className="p-3 border">
										{caseStudy.projectName}
									</td>
									<td className="p-3 border">
										{caseStudy.location}
									</td>
									<td className="p-3 border">
										{caseStudy.systemCapacity}
									</td>
									<td className="border p-4 my-auto flex items-center justify-center space-x-4">
										<Link
											to={`/admin/case-studies/edit/${caseStudy.id}`}
											className="text-navy-900"
										>
											<FaEdit
												size={18}
												className="cursor-pointer"
											/>
										</Link>
										<FaTrash
											onClick={() =>
												handleDelete(caseStudy.id)
											}
											size={18}
											className="text-orange-500 cursor-pointer"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="p-4 text-center">
									No case studies available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="flex justify-center mt-6 space-x-2">
				{Array.from(
					{
						length: Math.ceil(
							caseStudies.length / caseStudiesPerPage,
						),
					},
					(_, i) => (
						<button
							key={i}
							onClick={() => paginate(i + 1)}
							className={`px-4 py-2 rounded-full text-white transition-all ${
								currentPage === i + 1
									? 'bg-orange-500'
									: 'bg-navy-900 hover:bg-orange-400'
							}`}
						>
							{i + 1}
						</button>
					),
				)}
			</div>
		</div>
	);
};

export default CaseStudies;
