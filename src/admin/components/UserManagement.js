import { useCallback, useState, useEffect } from "react";
import { BASE_URL, getAdmins, addAdmin, deleteAdmin } from "../../api";
import { toast } from "sonner";
import { Loader, Plus, Users, Trash2, Check, X } from "lucide-react";
import UserForm from "./UserForm";

const AdminListItem = ({ admin, onDeleteClick }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              src={
                admin.profile == "avatar" || !admin.profile
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      admin.fullName
                    )}&background=1E3A8A&color=fff`
                  : `${BASE_URL}/profiles/${admin.profile}`
              }
              alt={admin.fullName}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {admin.fullName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {admin.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {admin.username}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {admin.emailVerified ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <Check size={12} className="mr-1" /> Verified
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <X size={12} className="mr-1" /> Unverified
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
          {admin.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {" "}
        <button
          onClick={onDeleteClick}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <Trash2 size={18} />
          <span className="sr-only">Delete</span>
        </button>
      </td>
    </tr>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");
  const fetchUsers = useCallback(async () => {
    try {
      const response = await getAdmins();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  const handleDeleteClick = async (admin) => {
    if (window.confirm(`Are you sure you want to delete ${admin.fullName}?`)) {
      setLoading(true);
      try {
        await deleteAdmin(admin.id);
        toast.success("Admin Removed!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to remove admin. Check permissions.");
      } finally {
        fetchUsers();
        setLoading(false);
      }
    }
  };
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await addAdmin(formData);
      toast.success("User added successfully");
      await fetchUsers();
    } catch (error) {
      toast.error("Error adding user");
      console.error("Error submitting form:", error);
    } finally {
      setShowForm(false);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-blue-800 text-white shadow-md">
        <h1 className="text-2xl font-bold flex items-center mb-4 md:mb-0">
          <Users className="mr-2" size={24} />
          Admin Management
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow-md"
        >
          <Plus className="mr-2" size={18} />
          Add Admin
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((admin) => (
              <AdminListItem
                key={admin.id}
                admin={admin}
                onDeleteClick={() => handleDeleteClick(admin)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <UserForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserManagement;
