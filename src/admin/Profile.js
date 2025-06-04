import { useState, useCallback, useEffect } from "react";
import { getLoggedInAdmin, updateProfile, changePassword } from "../api.js";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Users,
  Activity,
  Key,
  Edit3,
  CheckCircle,
} from "lucide-react";

const Profile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    username: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const fetchAccountDetails = useCallback(async () => {
    try {
      const data = await getLoggedInAdmin();
      setUser(data);
      setProfileForm({
        ...profileForm,
        fullName: data.fullName,
        email: data.email,
        username: data.username,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error Fetching Account Details!");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAccountDetails();
  }, [fetchAccountDetails]);

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsEditingProfile(true);
    updateProfile(user.id, profileForm)
      .then(() => {
        toast.success("Profile Updated");
        fetchAccountDetails();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update profile");
      })
      .finally(() => {
        setIsEditingProfile(false);
      });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      setIsChangingPassword(true);
      changePassword(user.id, passwordForm)
        .then(() => {
          toast.success(
            "Your Password have been updated, use new password next time you log in"
          );
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || "Failed to change password!"
          );
        })
        .then(() => {
          setIsChangingPassword(false);
        });
    } else {
      toast.error("Provided passwords do not match!");
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading account data...</p>
        </div>
      </div>
    );
  }
  if (user === null) {
    return (
      <span>Could not fetch user account details, please refresh page</span>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
            <button
              onClick={() => setIsChangingPassword(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Key size={18} />
              Change Password
            </button>
          </div>
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={profileForm.username}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : isChangingPassword ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Update Password
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={40} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {user.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={16} />
                      <span className="text-sm">{user.role_status}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-500" size={20} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="text-gray-500" size={20} />
                    <span>@{user.username}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-500" size={20} />
                    <span>Member since {user.member_since}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 mt-5">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Activity Overview
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="text-orange-500" size={20} />
                      <span>Transactions Processed</span>
                    </div>
                    <span className="font-semibold">
                      {user.total_transactions_processed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="text-orange-500" size={20} />
                      <span>Total Users</span>
                    </div>
                    <span className="font-semibold">{user.total_users}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="text-orange-500" size={20} />
                      <span>Total Admins</span>
                    </div>
                    <span className="font-semibold">{user.total_admins}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Last Activity
                </h4>
                <p className="text-gray-600">
                  {format(new Date(user.last_activity_date), "PPP")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
