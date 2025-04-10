import React, { useEffect, useState } from 'react';
import { getBlogs, getBlogById } from '../../api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const blogsPerPage = 10;
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Blogs | Admin Panel';
		const fetchBlogs = async () => {
			try {
				const data = await getBlogs();
				setBlogs(data);
			} catch (error) {
				console.error('Error fetching blogs:', error);
			}
		};
		fetchBlogs();
	}, []);

	const indexOfLastBlog = currentPage * blogsPerPage;
	const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
	const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleEdit = async (blogId) => {
		try {
			const blogData = await getBlogById(blogId);
			navigate(`/admin/blogs/edit/${blogId}`, { state: { blogData } });
		} catch (error) {
			console.error('Error fetching blog details:', error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Manage Blogs
			</h2>
			<Link
				to="/admin/blogs/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add Blog
			</Link>
			<div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">ID</th>
							<th className="p-3 border">Title</th>
							<th className="p-3 border">Author</th>
							<th className="p-3 border">Story</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentBlogs.length > 0 ? (
							currentBlogs.map((blog) => (
								<tr key={blog.id} className="hover:bg-gray-50">
									<td className="p-3 border">{blog.id}</td>
									<td className="p-3 border max-w-xs truncate">
										{blog.title}
									</td>
									<td className="p-3 border">
										{blog.author}
									</td>
									<td className="p-3 border">{blog.story}</td>
									<td className="border p-4 flex items-center justify-center space-x-4">
										<FaEdit
											onClick={() => handleEdit(blog.id)}
											size={18}
											className="text-navy-900 cursor-pointer"
										/>
										<FaTrash
											size={18}
											className="text-orange-500 cursor-pointer"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="5" className="p-4 text-center">
									No blogs available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className="flex justify-center mt-6 space-x-2">
				{Array.from(
					{ length: Math.ceil(blogs.length / blogsPerPage) },
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

export default Blogs;
