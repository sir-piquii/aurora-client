/**
 * Team component for managing team members in the admin panel.
 *
 * Features:
 * - Fetches and displays a paginated list of team members.
 * - Allows adding, editing, and deleting team members.
 * - Supports updating member images.
 * - Displays loading state and success/error notifications.
 *
 * State:
 * @typedef {Object} TeamMember
 * @property {number|string} id - Unique identifier for the team member.
 * @property {string} name - Name of the team member.
 * @property {string} position - Position/title of the team member.
 * @property {string} bio - Short biography of the team member.
 * @property {string} [picture] - Filename or URL of the member's picture.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Team management UI.
 */
import React, { useEffect, useState, useCallback } from "react";
import {
  getTeam,
  deleteTeamMember,
  addTeamMember,
  updateTeamMember,
  updateTeamMemberImage,
} from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import TeamForm from "./TeamForm";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const membersPerPage = 10;
  const getFetchTeam = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTeam();
      setTeam(data);
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    document.title = "Team | Admin Panel";
    getFetchTeam();
  }, [getFetchTeam]);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = team.slice(indexOfFirstMember, indexOfLastMember);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (memberId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team member?"
    );
    if (confirmDelete) {
      const deleteTeamMemberAsync = async () => {
        try {
          setLoading(true);
          await deleteTeamMember(memberId);
          toast.success("Member Deleted");
          getFetchTeam();
        } catch (error) {
          toast.error("Failed to delete member");
          console.error("Error deleting team member:", error);
        } finally {
          setLoading(false);
        }
      };
      deleteTeamMemberAsync();
    }
  };
  const handleFormClose = () => {
    setSelectedMember(null);
    setFormOpen(false);
  };
  const handleSubmit = async ({ id, formDataToSubmit: data }) => {
    if (id) {
      const image = data.get("image");
      data.delete("image");
      await updateTeamMember(id, data);
      toast.success("Member data updated!");
      updateMemberImage(id, image);
      try {
      } catch (error) {
        toast.error("Failed to update Team Member!");
        console.error(error);
      } finally {
        setLoading(false);
        getFetchTeam();
      }
    } else {
      try {
        setLoading(true);
        await addTeamMember(data);
        toast.success("Member Added!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add member!");
      } finally {
        getFetchTeam();
        setLoading(false);
      }
    }
  };
  const updateMemberImage = async (id, image) => {
    try {
      await updateTeamMemberImage(id, { image: image });
      toast.success("Team Image Uploaded");
    } catch (error) {
      toast.error("Failed to updated member image");
      console.error(error);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">Manage Team</h2>

      <button
        onClick={() => {
          setFormOpen(true);
          setSelectedMember(null);
        }}
        className="bg-orange-500 text-white px-4 py-2 rounded-full mb-6 inline-block"
      >
        Add Team Member
      </button>

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
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedMember(member);
                      setFormOpen(true);
                    }}
                    className="text-navy-900"
                  >
                    <FaEdit className="cursor-pointer" />
                  </button>
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
      <TeamForm
        member={selectedMember}
        isOpen={formOpen}
        onClose={handleFormClose}
        onSave={handleSubmit}
      />
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
                  ? "bg-orange-500"
                  : "bg-navy-900 hover:bg-orange-400"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Team;
