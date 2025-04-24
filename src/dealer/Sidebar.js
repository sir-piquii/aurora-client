import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const user = JSON.parse(localStorage.getItem('user')) ?? null;
	const userId = user?.user?.id;
	const dealerId = user?.user?.dealerId;
	const fullName = user?.user?.fullName;
	const profileImage = user?.user?.profile;
	const isDealer = user?.user.role === 'dealer';

	return (
		<div className="w-64 min-h-screen bg-white shadow-lg p-6">
			<h2 className="text-2xl font-bold text-navy-900 mb-4">Dashboard</h2>

			<div className="flex flex-col items-center mb-6">
				<img
					src={
						profileImage
							? `https://dev-api.auroraenergy.co.zw/profiles/${profileImage}`
							: 'https://ui-avatars.com/api/?name=User&background=orange&color=fff'
					}
					alt="User Profile"
					className="w-16 h-16 rounded-full object-cover mb-2"
				/>
				<p className="text-navy-900 font-medium text-center">
					{fullName}
				</p>
			</div>

			{isDealer && (
				<ul>
					<li>
						<Link
							to={`/dealer/orders/${userId}`}
							className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
						>
							Orders
						</Link>
					</li>
					<li>
						<Link
							to={`/dealer/quotations/${userId}`}
							className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
						>
							Quotations
						</Link>
					</li>
				</ul>
			)}

			{!isDealer && (
				<ul>
					<li>
						<Link
							to={`/dealer/add-dealer/${userId}`}
							className="block px-4 py-2 rounded-lg transition-all text-navy-900 hover:bg-orange-500 hover:text-white"
						>
							Dealer Application
						</Link>
					</li>
					{dealerId && (
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
			)}
		</div>
	);
};

export default Sidebar;
