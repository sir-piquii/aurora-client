import React, { useEffect, useState } from 'react';
import { getDealers } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Dealer = () => {
	const [dealers, setDealers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const dealersPerPage = 10;
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Dealers | Admin Panel';
		const fetchDealers = async () => {
			try {
				const data = await getDealers();
				setDealers(data);
			} catch (error) {
				console.error('Error fetching dealers:', error);
			}
		};
		fetchDealers();
	}, []);

	const indexOfLastDealer = currentPage * dealersPerPage;
	const indexOfFirstDealer = indexOfLastDealer - dealersPerPage;
	const currentDealers = dealers.slice(indexOfFirstDealer, indexOfLastDealer);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Dealer Applications
			</h2>

			<Link
				to="/admin/dealers/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-6 inline-block"
			>
				Add Dealer
			</Link>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-lg shadow">
					<thead>
						<tr className="text-left text-sm font-semibold text-navy-900 border-b">
							<th className="p-4">Full Name</th>
							<th className="p-4">Email</th>
							<th className="p-4">Company</th>
							<th className="p-4">Trading Name</th>
							<th className="p-4">Status</th>
							<th className="p-4 text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{currentDealers.map((dealer) => (
							<tr
								key={dealer.id}
								onClick={() =>
									navigate(`/admin/dealers/${dealer.id}`)
								}
								className="cursor-pointer hover:bg-gray-100 border-b text-sm"
							>
								<td className="p-4">{dealer.user_full_name}</td>
								<td className="p-4">{dealer.user_email}</td>
								<td className="p-4">
									{dealer.registered_company}
								</td>
								<td className="p-4">{dealer.trading_name}</td>
								<td className="p-4">{dealer.reg_status}</td>
								<td className="p-4 text-center">
									<FaCheckCircle className="text-green-500" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-10 space-x-2">
				{Array.from(
					{ length: Math.ceil(dealers.length / dealersPerPage) },
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

export default Dealer;
