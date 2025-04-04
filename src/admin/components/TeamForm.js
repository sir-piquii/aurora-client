import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeamById, addTeamMember, updateTeamMember } from '../../api';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TeamForm = () => {
	const [teamMember, setTeamMember] = useState({
		name: '',
		position: '',
		bio: '',
		picture: null,
	});
	const [isEditing, setIsEditing] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = isEditing
			? 'Edit Team Member | Admin Panel'
			: 'Add Team Member | Admin Panel';

		if (id) {
			const fetchTeamMember = async () => {
				try {
					const data = await getTeamById(id);
					setTeamMember({
						name: data[0].name,
						position: data[0].position,
						bio: data[0].bio,
						picture: data[0].image || null,
					});
					setIsEditing(true);
				} catch (error) {
					console.error('Error fetching team member:', error);
				}
			};
			fetchTeamMember();
		}
	}, [id, isEditing]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTeamMember((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		setTeamMember((prev) => ({
			...prev,
			picture: e.target.files[0],
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', teamMember.name);
		formData.append('position', teamMember.position);
		formData.append('bio', teamMember.bio);
		if (teamMember.image) {
			formData.append('picture', teamMember.image);
		}

		try {
			if (isEditing) {
				await updateTeamMember(id, formData);
				console.log('Team member updated successfully');
			} else {
				await addTeamMember(formData);
				console.log('Team member added successfully');
			}
			navigate('/admin/team'); // Redirect to team list after submitting
		} catch (error) {
			console.error('Error submitting team member:', error);
		}
	};

	return (
		<div className="max-w-7xl mx-auto my-12 px-4">
			<h2 className="text-2xl font-bold mb-6 text-navy-900">
				{isEditing ? 'Edit Team Member' : 'Add Team Member'}
			</h2>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-lg space-y-6"
			>
				<div className="space-y-4">
					<label className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						type="text"
						name="name"
						value={teamMember.name}
						onChange={handleChange}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
				</div>

				<div className="space-y-4">
					<label className="block text-sm font-medium text-gray-700">
						Position
					</label>
					<input
						type="text"
						name="position"
						value={teamMember.position}
						onChange={handleChange}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
				</div>

				<div className="space-y-4">
					<label className="block text-sm font-medium text-gray-700">
						Bio
					</label>
					<textarea
						name="bio"
						value={teamMember.bio}
						onChange={handleChange}
						required
						className="w-full p-3 border border-gray-300 rounded-lg"
						rows="4"
					/>
				</div>

				<div className="space-y-4">
					<label className="block text-sm font-medium text-gray-700">
						Picture
					</label>
					<input
						type="file"
						name="picture"
						onChange={handleImageChange}
						className="w-full p-3 border border-gray-300 rounded-lg"
					/>
					{teamMember.image && (
						<div className="mt-2">
							<img
								src={URL.createObjectURL(teamMember.image)}
								alt="Preview"
								className="max-w-xs h-auto rounded-lg"
							/>
						</div>
					)}
				</div>

				<button
					type="submit"
					className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-400"
				>
					{isEditing ? 'Update Member' : 'Add Member'}
				</button>
			</form>
		</div>
	);
};

export default TeamForm;
