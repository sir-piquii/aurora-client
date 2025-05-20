import { useState, useEffect, useRef } from "react";
import { X, Upload } from "lucide-react";
import { BASE_URL, getPositions } from "../../api";

const TeamForm = ({ member, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    picture: "",
    position: 0,
    bio: "",
  });

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    getPositions()
      .then((data) => {
        setRoles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (member) {
      setFormData({
        id: member.id,
        name: member.name,
        picture: member.picture,
        bio: member.bio,
        position: member.position_id,
      });
    } else {
      setFormData({
        id: null,
        name: "",
        image: "",
        position: 0,
        bio: "",
      });
    }
  }, [member]);
  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("bio", formData.bio);
    formDataToSubmit.append("position", formData.position);
    formDataToSubmit.append("image", formData.picture);
    onSave({ id: formData.id, formDataToSubmit });
    onClose();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, picture: file });
    }
  };
  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, picture: file });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-orange-800">
              {member ? "Edit Team Member" : "Add New Team Member"}
            </h2>
            <button
              type="button"
              aria-label="Close"
              title="close"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  placeholder="John Doe"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="grid grid-cols-2 md:grid-cols-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center basis-1/2">
                    <input
                      type="radio"
                      id={`role-${role.id}`}
                      name="role"
                      value={role.id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          position: parseInt(e.target.value, 10),
                        })
                      }
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-orange-500"
                      required
                      checked={formData.position === role.id}
                    />
                    <label
                      htmlFor={`role-${role.id}`}
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      {role.position}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/*Member Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Member Image
              </label>
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                  isDragging
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300 hover:border-orange-500"
                }`}
              >
                <input
                  title="image"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />

                {formData.picture ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        typeof formData.picture === "string"
                          ? `${BASE_URL}/team/${formData.picture}`
                          : URL.createObjectURL(formData.picture)
                      }
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, picture: "" })}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="p-4 rounded-full bg-gray-100 mb-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      <span className="text-orange-600 font-medium">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                placeholder="A short bio about the team member"
                title="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
              >
                {member ? "Update" : "Add"} Team Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TeamForm;
