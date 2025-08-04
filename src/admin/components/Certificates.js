/**
 * Certificates component for the admin panel.
 *
 * Displays a paginated list of certificates, allows viewing and deleting certificates,
 * and provides a link to add new certificates.
 *
 * Features:
 * - Fetches certificates from the API on mount.
 * - Supports pagination with configurable certificates per page.
 * - Allows deletion of certificates with confirmation.
 * - Displays certificate title and actions (view, delete).
 * - Responsive and styled with Tailwind CSS.
 *
 * @component
 * @returns {JSX.Element} The rendered Certificates management UI.
 */
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { getCertificates, deleteCertificate } from "../../api";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
=======
import { toast } from "sonner";
import {
  getCertificates,
  deleteCertificate,
  uploadCertificate,
  updateCertificate,
} from "../../api";
import { useEffect, useState } from "react";
import { Eye, Trash2, Edit, Plus, FileText } from "lucide-react";
import AddCertificateModal from "./certificates/AddCertificateModal";
import EditCertificateModal from "./certificates/EditCertificateModal";
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
=======
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
  const certificatesPerPage = 10;

  useEffect(() => {
    document.title = "Certificates | Admin Panel";
<<<<<<< HEAD
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };
    fetchCertificates();
  }, []);

=======
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = certificates.slice(
    indexOfFirstCertificate,
    indexOfLastCertificate
  );

<<<<<<< HEAD
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (certificateId) => {
=======
  const totalPages = Math.ceil(certificates.length / certificatesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddCertificate = async (formData) => {
    try {
      await uploadCertificate(formData);
      toast.success("Certificate Uploaded");
      await fetchCertificates();
    } catch (error) {
      console.error(error);
      toast.error("Error uploading Certificate");
    }
  };

  const handleEditCertificate = async (id, formData) => {
    try {
      await updateCertificate(id, formData);
      toast.success("Certificate Updated");
      await fetchCertificates();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update certificate");
    }
  };

  const handleDelete = async (certificateId) => {
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (confirmDelete) {
<<<<<<< HEAD
      const deleteCertificateAsync = async () => {
        try {
          await deleteCertificate(certificateId);
          setCertificates(
            certificates.filter(
              (certificate) => certificate.id !== certificateId
            )
          );
          console.log("Certificate deleted successfully.");
        } catch (error) {
          console.error("Error deleting certificate:", error);
        }
      };
      deleteCertificateAsync();
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">
        Manage Certificates
      </h2>
      <Link
        to="/admin/certificates/add"
        className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
      >
        Add Certificate
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCertificates.length > 0 ? (
              currentCertificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{certificate.title}</td>

                  <td className="border p-4 flex items-center justify-center space-x-4">
                    <a
                      href={certificate.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEye
                        size={18}
                        className="text-navy-900 cursor-pointer"
                      />
                    </a>
                    <FaTrash
                      onClick={() => handleDelete(certificate.id)}
                      size={18}
                      className="text-orange-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  No certificates available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from(
          {
            length: Math.ceil(certificates.length / certificatesPerPage),
          },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-full text-white transition-all ${
                currentPage === i + 1
                  ? "bg-orange-500"
                  : "bg-navy-900 hover:bg-orange-400"
=======
      try {
        await deleteCertificate(certificateId);
        setCertificates(
          certificates.filter((cert) => cert.id !== certificateId)
        );
      } catch (error) {
        console.error("Error deleting certificate:", error);
      }
    }
  };

  const openEditModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto my-12 px-4 h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Manage Certificates
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Certificate
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCertificates.length > 0 ? (
                currentCertificates.map((certificate, index) => (
                  <tr
                    key={certificate.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <FileText className="h-8 w-8 text-orange-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {certificate.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {certificate.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() =>
                            window.open(certificate.path, "_blank")
                          }
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Certificate"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openEditModal(certificate)}
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                          title="Edit Certificate"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(certificate.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete Certificate"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <FileText className="h-12 w-12 text-gray-400" />
                      <p className="text-gray-500 text-lg">
                        No certificates available
                      </p>
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-orange-600 hover:text-orange-800 font-medium"
                      >
                        Add your first certificate
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 space-x-2">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
              }`}
            >
              {i + 1}
            </button>
<<<<<<< HEAD
          )
        )}
      </div>
=======
          ))}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      <AddCertificateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCertificate}
      />

      <EditCertificateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        certificate={selectedCertificate}
        onSubmit={handleEditCertificate}
      />
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
    </div>
  );
};

<<<<<<< HEAD
export default Certificates;
=======
export default Certificates;
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
