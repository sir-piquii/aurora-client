import React, { useEffect, useState } from 'react';
import { getTeam, deleteTeamMember } from '../../api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Team = () => {
	const [team, setTeam] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const membersPerPage = 10;

	useEffect(() => {
		document.title = 'Team | Admin Panel';
		const fetchTeam = async () => {
			try {
				const data = await getTeam();
				setTeam(data);
			} catch (error) {
				console.error('Error fetching team:', error);
			}
		};
		fetchTeam();
	}, []);

	const indexOfLastMember = currentPage * membersPerPage;
	const indexOfFirstMember = indexOfLastMember - membersPerPage;
	const currentMembers = team.slice(indexOfFirstMember, indexOfLastMember);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleDelete = (memberId) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this team member?',
		);
		if (confirmDelete) {
			const deleteTeamMemberAsync = async () => {
				try {
					await deleteTeamMember(memberId);
					setTeam(team.filter((member) => member.id !== memberId));
					console.log('Team member deleted successfully.');
				} catch (error) {
					console.error('Error deleting team member:', error);
				}
			};
			deleteTeamMemberAsync();
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				Manage Team
			</h2>

			<Link
				to="/admin/team/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-6 inline-block"
			>
				Add Team Member
			</Link>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{currentMembers.length > 0 ? (
					currentMembers.map((member) => (
						<div
							key={member.id}
							className="bg-white rounded-lg shadow-lg p-4 relative"
						>
							<div className="flex items-start justify-between">
								<div className="flex items-center space-x-4">
									{member.picture && (
										<img
											src={`https://dev-api.auroraenergy.co.zw/team/${member.picture}`}
											alt={member.name}
											className="w-14 h-14 object-cover rounded-full"
										/>
									)}
									<div>
										<h3 className="font-semibold text-lg text-navy-900">
											{member.name}
										</h3>
										<p className="text-sm text-gray-600">
											{member.position}
										</p>
									</div>
								</div>
								<div className="flex space-x-3">
									<Link
										to={`/admin/team/edit/${member.id}`}
										className="text-navy-900"
									>
										<FaEdit className="cursor-pointer" />
									</Link>
									<FaTrash
										onClick={() => handleDelete(member.id)}
										size={16}
										className="text-orange-500 cursor-pointer"
									/>
								</div>
							</div>
							<p className="mt-4 text-gray-700 whitespace-pre-wrap">
								{member.bio}
							</p>
						</div>
					))
				) : (
					<p className="text-center col-span-full text-gray-600">
						No team members available.
					</p>
				)}
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-10 space-x-2">
				{Array.from(
					{ length: Math.ceil(team.length / membersPerPage) },
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

export default Team;
