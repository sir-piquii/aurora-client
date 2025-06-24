/**
 * CertificatesForm component allows admins to add a new certificate by submitting a form.
 *
 * Features:
 * - Collects certificate type, title, and file from the user.
 * - Handles form submission and uploads the certificate using the `uploadCertificate` API.
 * - Displays loading state during submission.
 * - Navigates back to the certificates list on success or cancels the operation.
 *
 * State:
 * @state {string} title - The title of the certificate.
 * @state {string} type - The type/category of the certificate.
 * @state {File|null} file - The uploaded certificate file.
 * @state {boolean} loading - Indicates if the form is submitting.
 *
 * @component
 * @returns {JSX.Element} The rendered CertificatesForm component.
 */
import React, { useState } from "react";
import { uploadCertificate } from "../../api";
import { useNavigate } from "react-router-dom";

const CertificatesForm = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("certificate", file); // adjust key name to match backend

    try {
      await uploadCertificate(formData); // Your API should handle FormData
      console.log("Certificate added successfully!");
      navigate("/admin/certificates");
    } catch (error) {
      console.error("Error adding certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">
        Add New Certificate
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-2"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="path"
              className="block text-gray-700 font-medium mb-2"
            >
              Certificate File
            </label>
            <input
              type="file"
              id="path"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 bg-orange-500 text-white rounded-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Certificate"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificatesForm;
