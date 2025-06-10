import { useState, useCallback, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Loader,
  Info,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { BASE_URL, getDealerById, changeDealerStatus } from "../../api";
import { toast } from "sonner";
//document preview
const DocumentPreview = ({ filename, foldername, label }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-center bg-gray-50 h-40 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img
            className="h-full mix-blend-multiply object-contain object-center"
            src={`${BASE_URL}/${foldername}/${filename}`}
            alt={filename}
          />
        </div>
        <div className="p-3 border-t border-gray-200">
          <h4 className="font-medium text-sm text-gray-900 mb-1">{label}</h4>
          <p className="text-xs text-gray-500 truncate">{filename}</p>
          <button
            className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-500 flex items-center"
            onClick={() => setShowModal(true)}
            type="button"
          >
            View Document
          </button>
        </div>
      </div>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setShowModal(false)}
        >
          <img
            className="max-h-[90vh] max-w-[90vw] object-contain"
            src={`${BASE_URL}/${foldername}/${filename}`}
            alt={filename}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setShowModal(false)}
            type="button"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

// status badge
const StatusBadge = ({ status, className = "" }) => {
  // Convert status from string format "Pending_Approval" to code format "3"
  const getStatusCode = (statusString) => {
    const statusLower = statusString.toLowerCase();

    if (
      statusLower === "pending_documents" ||
      statusLower === "pending documents"
    )
      return "1";
    if (
      statusLower === "pending_installations" ||
      statusLower === "pending installations"
    )
      return "2";
    if (
      statusLower === "pending_approval" ||
      statusLower === "pending approval"
    )
      return "3";
    if (statusLower === "approved") return "4";
    if (statusLower === "registered") return "5";
    if (statusLower === "suspended") return "6";

    return "3"; // Default to pending approval
  };

  //const statusCode = getStatusCode(status);
  const colorClasses = "bg-gray-100 text-gray-800";
  const label = status;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
};
//installation card
const InstallationCard = ({ installation, number }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-3">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Zap size={16} className="text-blue-600" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Installation #{number}</h4>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-start">
          <Mail size={16} className="text-gray-400 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-900">{installation.email}</p>
            <p className="text-xs text-gray-500">Contact Email</p>
          </div>
        </div>

        <div className="flex items-start">
          <Phone size={16} className="text-gray-400 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-gray-900">{installation.phoneNumber}</p>
            <p className="text-xs text-gray-500">Contact Phone</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <div className="flex items-start">
          <Info size={16} className="text-gray-400 mr-2 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">System Details</p>
            <p className="text-sm text-gray-600 mt-1">
              Size: {installation.sizeOfSystem}
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              {installation.systemDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// dealer verification
/**
 * DealerVerification component displays detailed information about a dealer,
 * including personal and company information, required documents, and installations.
 * It allows an admin to approve, suspend, or reinstate a dealer's status.
 *
 * Features:
 * - Fetches dealer data by ID from the backend.
 * - Shows loading state while fetching or updating data.
 * - Displays personal and company information of the dealer.
 * - Previews required documents (certificate of incorporation, tax clearance, director IDs).
 * - Lists installations associated with the dealer.
 * - Provides actions to approve, suspend, or reinstate the dealer based on current status.
 *
 * Dependencies:
 * - React hooks: useState, useEffect, useCallback
 * - React Router: useParams
 * - UI components: Loader, ArrowLeft, StatusBadge, CheckCircle, XCircle, AlertCircle, User, Mail, Building2, FileText, DocumentPreview, InstallationCard
 * - Utility functions: getDealerById, changeDealerStatus
 * - Notification: toast
 *
 * @component
 * @returns {JSX.Element} The rendered DealerVerification component.
 */
const DealerVerification = () => {
  const [loading, setLoading] = useState(true);
  const [dealer, setDealer] = useState();
  const { id } = useParams();
  const fetchDealer = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDealerById(id);
      setDealer(data);
    } catch (error) {
      toast.error("Could not get dealer info");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchDealer();
  }, [fetchDealer]);
  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      await changeDealerStatus(dealer.dealer_id, { status: newStatus });
      toast.success("Status changed");
      fetchDealer();
    } catch (error) {
      console.error(error);
      toast.error("Failed to change status");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  const documentIds = dealer?.national_ID_Copies_of_the_Directors
    ? dealer?.national_ID_Copies_of_the_Directors?.split(",")
    : [];
  return (
    <div className="bg-white w-full rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="p-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Dealers List
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {dealer.user_full_name}
              </h1>
              <div className="flex items-center mt-1">
                <StatusBadge status={dealer.reg_status} />
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex space-x-3">
              {dealer.reg_status !== "Approved" &&
                dealer.reg_status !== "Registered" && (
                  <button
                    onClick={() => handleStatusChange(4)}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Approve
                  </button>
                )}

              {dealer.reg_status !== "Suspended" && (
                <button
                  onClick={() => handleStatusChange(6)}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XCircle size={16} className="mr-2" />
                  Suspend
                </button>
              )}

              {dealer.reg_status === "Suspended" && (
                <button
                  onClick={() => handleStatusChange(3)}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <AlertCircle size={16} className="mr-2" />
                  Reinstate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Information */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Full Name
                    </p>
                    <p className="text-sm text-gray-900">
                      {dealer.user_full_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Username
                    </p>
                    <p className="text-sm text-gray-900">
                      {dealer.user_username}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{dealer.user_email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Company Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Building2 size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Registered Company
                    </p>
                    <p className="text-sm text-gray-900">
                      {dealer.registered_company || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Building2 size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Trading Name
                    </p>
                    <p className="text-sm text-gray-900">
                      {dealer.trading_name || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Company Reg Number
                    </p>
                    <p className="text-sm text-gray-900">
                      {dealer.company_reg_number || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      VAT Number
                    </p>
                    <p className="text-sm text-gray-900">
                      {dealer.VAT_number || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">TIN</p>
                    <p className="text-sm text-gray-900">
                      {dealer.TIN || "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Required Documents
              </h2>

              <div className="space-y-6">
                {dealer.certificate_of_incorporation && (
                  <DocumentPreview
                    filename={dealer.certificate_of_incorporation}
                    foldername={"incorporationCertificates"}
                    label="Certificate of Incorporation"
                  />
                )}

                {dealer.tax_clearance && (
                  <DocumentPreview
                    filename={dealer.tax_clearance}
                    foldername={"taxClearanceCertificates"}
                    label="Tax Clearance"
                  />
                )}
                <h3 className="text-md font-medium text-gray-900 mt-6 mb-3">
                  Director IDs
                </h3>
                {documentIds && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {documentIds?.map((docId, index) => (
                      <DocumentPreview
                        key={index}
                        foldername={"IDsOfDirectors"}
                        filename={docId}
                        label={`Director ID ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Installations */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Installations (
                {dealer?.installations ? dealer.installations?.length : 0})
              </h2>

              {dealer.installations === null ||
              dealer.installations?.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded text-center">
                  <p className="text-gray-500">No installations added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(typeof dealer.installations === "string"
                    ? JSON.parse(dealer.installations)
                    : dealer.installations
                  )?.map((installation, index) => (
                    <InstallationCard
                      key={installation.installation_id}
                      installation={installation}
                      number={index + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerVerification;
