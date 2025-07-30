import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { Upload, FileText } from "lucide-react";

const EditCertificateModal = ({ isOpen, onClose, certificate, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (certificate) {
      setTitle(certificate.title);
      setType(certificate.type);
      setFile(null);
    }
  }, [certificate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!certificate) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    if (file) {
      formData.append("certificate", file);
    }

    try {
      await onSubmit(certificate.id, formData);
      setFile(null);
      onClose();
    } catch (error) {
      console.error("Error updating certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFile(null);
      onClose();
    }
  };

  if (!certificate) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Certificate">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="hidden">
          <label
            htmlFor="edit-type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Certificate Type
          </label>
          <input
            type="text"
            id="edit-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            readOnly
            placeholder="e.g., Professional, Academic, Skill-based"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="edit-title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Certificate Title
          </label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter certificate title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="edit-file"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Certificate File
          </label>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Current file:{" "}
                <span className="font-medium">
                  {certificate.path.split("/").pop()}
                </span>
              </p>
            </div>
            <div className="relative">
              <input
                type="file"
                id="edit-file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <label
                htmlFor="edit-file"
                className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
              >
                <div className="text-center">
                  {file ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="text-orange-500" size={24} />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto text-gray-400" size={32} />
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-orange-600">
                          Click to upload new file
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, JPG, JPEG, PNG up to 10MB (optional)
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Updating...</span>
              </>
            ) : (
              <span>Update Certificate</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCertificateModal;
