import { useState, useContext, useEffect } from "react";
import { User, Mail, Shield, Key, X, Edit2 } from "lucide-react";

const UserForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    profile: null,
    email: "",
    fullName: "",
    password: "",
    role: 3,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("username", formData.username.trim());
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("fullName", formData.fullName);
    formDataToSubmit.append(
      "password",
      formData.fullName.replace(/\s+/g, "").toUpperCase()
    );
    formDataToSubmit.append("role", formData.role);
    if (formData.profile) {
      formDataToSubmit.append("image", formData.profile);
    }
    onSubmit(formDataToSubmit);
    setFormData({
      username: "",
      profile: null,
      email: "",
      fullName: "",
      password: "",
      role: 3,
    });
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              Add New Account
            </h3>
            <button
              type="button"
              title="Close"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Error Message */}
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={
                      formData.profile
                        ? URL.createObjectURL(formData.profile)
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            formData.fullName
                          )}&background=1E3A8A&color=fff`
                    }
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  id="profileImage"
                  name="profileImage"
                  title="Profile Image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, profile: e.target.files[0] })
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    placeholder="@johndoe"
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    placeholder="John Doe"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    placeholder="johndoe@gmail.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
