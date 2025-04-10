import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const user = JSON.parse(localStorage.getItem('user')) ?? null;
	const userId = user?.user?.id;
	const dealerId = user?.user?.dealerId;
	return (
		<div className="w-64 min-h-screen bg-white shadow-lg p-6">
			<h2 className="text-2xl font-bold text-navy-900 mb-6">
				Dealer Registration
			</h2>
			<ul>
				<li>
					<Link
						to={`/dealer/add-dealer/${userId}`}
						className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
					>
						Add Dealer
					</Link>
				</li>
				{!dealerId && (
					<>
						<li>
							<Link
								to={`/dealer/add-installations/${dealerId}`}
								className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
							>
								Add Installations
							</Link>
						</li>
						<li>
							<Link
								to={`/dealer/upload-certificate/${dealerId}`}
								className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
							>
								Upload Certificate of Incorporation
							</Link>
						</li>
						<li>
							<Link
								to={`/dealer/upload-tax-clearance/${dealerId}`}
								className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
							>
								Upload Tax Clearance Certificate
							</Link>
						</li>
						<li>
							<Link
								to={`/dealer/upload-ids-of-directors/${dealerId}`}
								className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
							>
								Upload IDs of Directors
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Sidebar;
