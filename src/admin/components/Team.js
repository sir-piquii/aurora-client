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
			<h2 className="text-2xl font-bold mb-6 text-navy-900">Manage Team</h2>

			{/* Add Team Member Button */}
			<Link
				to="/admin/team/add"
				className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
			>
				Add Team Member
			</Link>

			<div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="p-3 border">ID</th>
							<th className="p-3 border">Name</th>
							<th className="p-3 border">Position</th>
							<th className="p-3 border">Bio</th>
							<th className="p-3 border">Image</th>
							<th className="p-3 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentMembers.length > 0 ? (
							currentMembers.map((member) => (
								<tr key={member.id} className="hover:bg-gray-50">
									<td className="p-3 border">{member.id}</td>
									<td className="p-3 border">{member.name}</td>
									<td className="p-3 border">{member.position}</td>
									<td className="p-3 border truncate max-w-xs">{member.bio}</td>
									<td className="p-3 border truncate max-w-xs">
										{member.picture && (
											<img
												src={`https://dev-api.auroraenergy.co.zw/team/${member.picture}`}
												alt="Preview"
												className="max-w-full h-auto rounded-lg"
											/>
										)}
									</td>
									<td className="border p-4 flex items-center justify-center space-x-4">
										<Link
											to={`/admin/team/edit/${member.id}`}
											className="text-navy-900"
										>
											<FaEdit size={18} className="cursor-pointer" />
										</Link>
										<FaTrash
											onClick={() => handleDelete(member.id)}
											size={18}
											className="text-orange-500 cursor-pointer"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6" className="p-4 text-center">
									No team members available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6 space-x-2">
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
