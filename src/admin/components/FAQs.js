import React, { useEffect, useState } from 'react';
import { getFaqs, deleteFaqs } from '../../api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/**
 * FAQs component for the admin panel.
 * 
 * Displays a paginated list of Frequently Asked Questions (FAQs) with options to add, edit, and delete entries.
 * 
 * Features:
 * - Fetches FAQs from the backend on mount.
 * - Supports pagination with configurable FAQs per page.
 * - Allows deletion of FAQs with confirmation.
 * - Provides navigation to add and edit FAQ pages.
 * 
 * State:
 * @typedef {Object} FAQ
 * @property {number|string} id - Unique identifier for the FAQ.
 * @property {string} question - The FAQ question.
 * @property {string} answer - The FAQ answer.
 * 
 * @component
 * @returns {JSX.Element} The rendered FAQs management table with pagination and actions.
 */
const FAQs = () => {
	const [faqs, setFaqs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const faqsPerPage = 10;

	useEffect(() => {
		document.title = 'FAQs | Admin Panel';
		const fetchFaqs = async () => {
			try {
				const data = await getFaqs();
				setFaqs(data);
			} catch (error) {
				console.error('Error fetching FAQs:', error);
			}
		};
		fetchFaqs();
	}, []);

	const indexOfLastFaq = currentPage * faqsPerPage;
	const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
	const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = (FAQId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this FAQ?',
		);
		if (confirmDelete) {
			const deleteFAQs = async () => {
				try {
					await deleteFaqs(FAQId);
					setFaqs(faqs.filter((faq) => faq.id !== FAQId));
					console.log('FAQ deleted successfully.');
				} catch (error) {
					console.error('Error deleting FAQ:', error);
				}
			};
			deleteFAQs();
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Manage FAQs
			</h2>
			<Link
				to="/admin/faqs/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add FAQ
			</Link>
			<div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">ID</th>
							<th className="p-3 border">Question</th>
							<th className="p-3 border">Answer</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentFaqs.length > 0 ? (
							currentFaqs.map((faq) => (
								<tr key={faq.id} className="hover:bg-gray-50">
									<td className="p-3 border">{faq.id}</td>
									<td className="p-3 border">
										{faq.question}
									</td>
									<td className="p-3 border">{faq.answer}</td>
									<td className="border p-4 my-auto flex items-center justify-center space-x-4">
										<Link
											to={`/admin/faqs/edit/${faq.id}`}
											className="text-navy-900"
										>
											<FaEdit
												size={18}
												className="cursor-pointer"
											/>
										</Link>
										<FaTrash
											onClick={() => handleDelete(faq.id)}
											size={18}
											className="text-orange-500 cursor-pointer"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4" className="p-4 text-center">
									No FAQs available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6 space-x-2">
				{Array.from(
					{ length: Math.ceil(faqs.length / faqsPerPage) },
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

export default FAQs;
