import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../api';

/**
 * BlogsView component displays a list of blog articles fetched from an API.
 *
 * - Sets the document title to "Blogs | Aurora" on mount.
 * - Fetches blog data asynchronously and stores it in local state.
 * - Renders a responsive grid of blog cards, each showing the title, creation date, and a story excerpt.
 * - Each blog card links to a detailed view of the blog post.
 *
 * @component
 * @returns {JSX.Element} The rendered BlogsView component.
 */
function BlogsView() {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		document.title = `Blogs | Aurora`;
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

	return (
    <div className="flex flex-col items-center">
      <div className="w-full h-24 flex items-center justify-center bg-navy-900 text-white text-5xl font-bold">
        Blog Articles
      </div>

      <div className="w-10/12 mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
          >
            <Link to={`/blog/${blog.id}`}>
              <h3 className="font-bold text-xl">{blog.title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {new Date(blog.createdAt).toDateString()}
              </p>
              <p className="text-gray-700 mt-3 line-clamp-3">
                {blog.story.substring(0, 150)}...
              </p>
              <span className="text-blue-600 underline hover:text-blue-800 block mt-2">
                Read More
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsView;
