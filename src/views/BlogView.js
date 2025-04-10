import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../api';

function BlogDetail() {
	const { blogId } = useParams();
	const [blog, setBlog] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		document.title = `Blog Detail | Aurora`;
		setLoading(true);
		const fetchBlog = async () => {
			try {
				const response = await getBlogById(blogId);
				setBlog(response[0]);
				console.log(response);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching blog by ID:', error);
			}
		};

		fetchBlog();
		setLoading(false);
	}, [blogId]);

	return (
    <div className="p-6 max-w-3xl mx-auto">
      <a className="text-blue-600 hover:underline mb-4" href="/blogs">
        ← Back to Blogs
      </a>

      <h1 className="text-3xl font-bold">{blog.tite}</h1>
      <p className="text-gray-500">
        By {blog.author} | {new Date(blog.createdAt).toDateString()}
      </p>
      <p className="mt-4 text-gray-800 whitespace-pre-wrap">{blog.story}</p>
    </div>
  );
}

export default BlogDetail;
