import { useState, useEffect } from "react";
import { X, Award as AwardIcon, UploadCloudIcon } from "lucide-react";
import { BASE_URL } from "../../api";
const AwardForm = ({ award, onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (award) {
      setFormData({
        name: award.name,
        image: award.image,
      });
    } else {
      // Reset form when adding new
      setFormData({
        name: "",
        image: "",
      });
    }
  }, [award, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    if (formData.image) {
      submissionData.append("award", formData.image);
    }
    onSubmit(submissionData);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl animate-slideUp overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            {award ? "Edit Award" : "Add New Award"}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Image Preview/Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Award Image
              </label>
              <div className="mt-1 flex flex-col items-center">
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                  {formData.image ? (
                    <img
                      src={
                        typeof formData.image === "string"
                          ? `${BASE_URL}/awards/${formData.image}`
                          : URL.createObjectURL(formData.image)
                      }
                      alt="Award preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <AwardIcon
                        className="mx-auto h-12 w-12 text-gray-400"
                        aria-hidden="true"
                      />
                      <label
                        htmlFor="image"
                        className="mt-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <UploadCloudIcon className="h-5 w-5 text-gray-400 inline-block mr-1" />
                        Drag and drop or click to upload
                      </label>
                    </div>
                  )}
                </div>
                <input
                  id="image"
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="hidden"
                />
              </div>
            </div>

            {/* Award Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Award Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950`}
                placeholder="Enter award name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-950 rounded-md text-white hover:bg-blue-800 transition-colors"
            >
              {award ? "Update Award" : "Add Award"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AwardForm;
