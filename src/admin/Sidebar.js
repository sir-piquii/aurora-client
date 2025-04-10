import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const menuItems = [
		{ name: 'Products', path: '/admin/products' },
		{ name: 'Featured Products', path: '/admin/featured-products' },
		{ name: 'Articles', path: '/admin/articles' },
		{ name: 'Blogs', path: '/admin/blogs' },
		{ name: 'FAQs', path: '/admin/faqs' },
		{ name: 'Certificates', path: '/admin/certificates' },
		{ name: 'Awards', path: '/admin/awards' },
		{ name: 'Case Studies', path: '/admin/case-studies' },
		{ name: 'Team', path: '/admin/team' },
		{ name: 'Testimonials', path: '/admin/testimonials' },
	];

	return (
		<div className="w-64 min-h-screen bg-white shadow-lg p-6">
			<h2 className="text-2xl font-bold text-navy-900 mb-6">
				Admin Panel
			</h2>
			<ul className="space-y-4">
				{menuItems.map((item, index) => (
					<li key={index}>
						<Link
							to={item.path}
							className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
						>
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
