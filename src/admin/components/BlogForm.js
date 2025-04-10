import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, updateBlog } from '../../api';

const BlogForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [blog, setBlog] = useState({
		tite: '',
		author: '',
		story: '',
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (id) {
			const fetchBlog = async () => {
				try {
					const data = await getBlogById(id);
					setBlog(data[0]);
				} catch (error) {
					console.error('Error fetching blog:', error);
				} finally {
					setLoading(false);
				}
			};
			fetchBlog();
		} else {
			setLoading(false);
		}
	}, [id]);

	const handleChange = (e) => {
		setBlog({ ...blog, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateBlog(id, blog);
			alert('Blog updated successfully!');
			navigate('/admin/blogs');
		} catch (error) {
			console.error('Error updating blog:', error);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				{id ? 'Edit Blog' : 'Add Blog'}
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700">Title</label>
					<input
						type="text"
						name="title"
						value={blog.tite}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-lg"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Author</label>
					<input
						type="text"
						name="author"
						value={blog.author}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-lg"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Story</label>
					<textarea
						name="story"
						value={blog.story}
						onChange={handleChange}
						className="w-full px-4 py-2 border rounded-lg h-32"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-orange-500 text-white px-4 py-2 rounded-lg"
				>
					{id ? 'Update Blog' : 'Add Blog'}
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
