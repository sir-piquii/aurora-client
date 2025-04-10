import React, { useEffect, useState } from 'react';
import { getTestimonials, deleteTestimonial } from '../../api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Testimonials = () => {
	const [testimonials, setTestimonials] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const testimonialsPerPage = 10;

	useEffect(() => {
		document.title = 'Testimonials | Admin Panel';
		const fetchTestimonials = async () => {
			try {
				const data = await getTestimonials();
				setTestimonials(data);
			} catch (error) {
				console.error('Error fetching testimonials:', error);
			}
		};
		fetchTestimonials();
	}, []);

	const indexOfLastTestimonial = currentPage * testimonialsPerPage;
	const indexOfFirstTestimonial =
		indexOfLastTestimonial - testimonialsPerPage;
	const currentTestimonials = testimonials.slice(
		indexOfFirstTestimonial,
		indexOfLastTestimonial,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = (testimonialId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this testimonial?',
		);

		if (confirmDelete) {
			const deleteTestimonialAsync = async () => {
				try {
					await deleteTestimonial(testimonialId);
					setTestimonials(
						testimonials.filter(
							(testimonial) => testimonial.id !== testimonialId,
						),
					);
					console.log('Testimonial deleted successfully.');
				} catch (error) {
					console.error('Error deleting testimonial:', error);
				}
			};
			deleteTestimonialAsync();
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Manage Testimonials
			</h2>

			<Link
				to="/admin/testimonials/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add Testimonial
			</Link>

			<div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">ID</th>
							<th className="p-3 border">Person</th>
							<th className="p-3 border">Image</th>
							<th className="p-3 border">Role</th>
							<th className="p-3 border">Message</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentTestimonials.length > 0 ? (
							currentTestimonials.map((testimonial) => (
								<tr
									key={testimonial.id}
									className="hover:bg-gray-50"
								>
									<td className="p-3 border">
										{testimonial.id}
									</td>
									<td className="p-3 border">
										{testimonial.person}
									</td>
									<td className="p-3 border truncate max-w-xs">
										{testimonial.image && (
											<img
												src={`https://dev-api.auroraenergy.co.zw/testimonials/${testimonial.image}`}
												alt="Preview"
												className="max-w-full h-auto rounded-lg"
											/>
										)}
									</td>
									<td className="p-3 border">
										{testimonial.person_role}
									</td>
									<td className="p-3 border truncate max-w-xs">
										{testimonial.message}
									</td>
									<td className="border p-4 flex items-center justify-center space-x-4">
										<Link
											to={`/admin/testimonials/edit/${testimonial.id}`}
											className="text-navy-900"
										>
											<FaEdit
												size={18}
												className="cursor-pointer"
											/>
										</Link>
										<FaTrash
											onClick={() =>
												handleDelete(testimonial.id)
											}
											size={18}
											className="text-orange-500 cursor-pointer"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6" className="p-4 text-center">
									No testimonials available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6 space-x-2">
				{Array.from(
					{
						length: Math.ceil(
							testimonials.length / testimonialsPerPage,
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

export default Testimonials;
