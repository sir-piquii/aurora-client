import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className="w-64 min-h-screen bg-white shadow-lg p-6">
			<h2 className="text-2xl font-bold text-navy-900 mb-6">
				Dealer Panel
			</h2>
			<ul>
				<li>
					<Link
						to="/dealer/add-dealer"
						className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
					>
						Add Dealer
					</Link>
				</li>
				<li>
					<Link
						to="/dealer/add-installations"
						className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
					>
						Add Installations
					</Link>
				</li>
				<li>
					<Link
						to="/dealer/upload-certificate"
						className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
					>
						Upload Certificate of Incorporation
					</Link>
				</li>
				<li>
					<Link
						to="/dealer/upload-tax-clearance"
						className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white0"
					>
						Upload Tax Clearance Certificate
					</Link>
				</li>
				<li>
					<Link
						to="/dealer/upload-ids-of-directors"
						className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
					>
						Upload IDs of Directors
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
