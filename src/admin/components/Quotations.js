import { getQuotations, changeQuotationStatus } from "../../api";
import { useState, useCallback, useEffect } from "react";
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Loader,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}
    >
      {getStatusText()}
    </span>
  );
};

// Quotations Card
const QuotationCard = ({ quotation, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const totalPrice = quotation.products?.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );
  const handleStatusChange = (status) => {
    onStatusChange({ id: quotation.id, status: status });
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transform transition-all duration-200 hover:shadow-md">
      <div
        className="p-4 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        onClick={toggleExpand}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-indigo-700" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              {quotation.status && <StatusBadge status={quotation.status} />}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {quotation.requester_name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Created on</p>
            <time className="text-sm text-gray-500">
              {new Date(quotation.created_At).toDateString()}
            </time>
          </div>

          <button
            className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 bg-gray-50/50 px-4 sm:px-6 py-4 sm:py-6 transition-all duration-200 ease-in-out">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Customer Information
              </h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Name:</span>{" "}
                  {quotation.requester_name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Address:</span>{" "}
                  {quotation.requester_address}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  {quotation.requester_phone}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {quotation.requester_email}
                </p>
                {quotation.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {quotation.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                Products
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quotation.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm text-gray-900">
                          {product.product}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900 text-center">
                          {product.quantity}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900 text-right">
                          {product.price || "N/A"}
                        </td>
                        <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">
                          {product.quantity * product.price || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-2 text-sm font-medium text-gray-900 text-right"
                      >
                        Total
                      </td>
                      <td className="px-3 py-2 text-sm font-bold text-indigo-700 text-right">
                        {totalPrice}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="flex w-full  justify-end p-2 gap-2">
                {quotation.status !== "Approved" &&
                  quotation.status !== "Rejected" && (
                    <button
                      onClick={() => handleStatusChange("Approved")}
                      className="inline-flex items-center px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </button>
                  )}
                {quotation.status !== "Rejected" &&
                  quotation.status !== "Approved" && (
                    <button
                      onClick={() => handleStatusChange("Rejected")}
                      className="inline-flex items-center px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                  )}
                {quotation.status === "Rejected" && (
                  <button
                    onClick={() => handleStatusChange("Approved")}
                    className="inline-flex items-center px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-small text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <AlertCircle size={16} className="mr-2" />
                    Reapprove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
//Quotations
const Quotations = () => {
  const [loading, setLoading] = useState(false);
  const [quotations, setQuotations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusCounts, setStatusCounts] = useState({
    totalRecords: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const fetchQuotations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getQuotations(selectedStatus, currentPage, pageSize);
      setQuotations(data.quotations);
      setStatusCounts({
        ...statusCounts,
        totalRecords: data.totalRecords,
        approved: data.approvedCount,
        rejected: data.rejectedCount,
        pending: data.pendingCount,
      });
    } catch (error) {
      console.error("Error fetching quotations:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, currentPage, pageSize]);
  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  const totalPages = Math.ceil(statusCounts.totalRecords / pageSize);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  const handleStatusChange = async (statusChange) => {
    setLoading(true);
    try {
      await changeQuotationStatus(statusChange.id, statusChange.status);
      toast.success("Quotation status changed!");
      fetchQuotations();
    } catch (error) {
      console.error(error);
      toast.success("Error Updating Quotation Status");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all quotation requests
          </p>
        </div>
      </div>

      <div className="bg-[#FFFBF5] rounded-lg p-4 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-orange-600" />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Quotation Overview
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Below are all the quotations requested. Click on any quotation to
              view more details or take action.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-200 pt-4">
          <div
            onClick={() => {
              setSelectedStatus("All");
              setCurrentPage(1);
            }}
            className={`bg-white cursor-pointer p-4 rounded-lg border border-gray-200 ${
              selectedStatus === "All"
                ? "ring-2 ring-indigo-400 border-indigo-300"
                : ""
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Total Quotations
            </p>
            <p className="text-2xl font-bold text-indigo-800 mt-1">
              {statusCounts.totalRecords}
            </p>
          </div>

          <div
            onClick={() => {
              setSelectedStatus("Pending");
              setCurrentPage(1);
            }}
            className={`bg-white p-4 cursor-pointer rounded-lg border border-gray-200 ${
              selectedStatus === "Pending"
                ? "ring-2 ring-amber-400 border-amber-200"
                : ""
            }`}
          >
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {statusCounts.pending}
            </p>
          </div>

          <div
            onClick={() => {
              setSelectedStatus("Approved");
              setCurrentPage(1);
            }}
            className={`bg-white cursor-pointer p-4 rounded-lg border border-gray-200 ${
              selectedStatus === "Approved"
                ? "ring-2 ring-green-400 border-green-200"
                : ""
            }`}
          >
            <p className="text-sm font-medium text-gray-500">Approved</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {statusCounts.approved}
            </p>
          </div>

          <div
            onClick={() => {
              setSelectedStatus("Rejected");
              setCurrentPage(1);
            }}
            className={`bg-white cursor-pointer p-4 rounded-lg border border-gray-200 ${
              selectedStatus === "Rejected"
                ? "ring-2 ring-red-400 border-red-200"
                : ""
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              Expired/Rejected
            </p>
            <p className="text-2xl font-bold text-gray-600 mt-1">
              {statusCounts.rejected}
            </p>
          </div>
        </div>
      </div>

      {/* Page size selector */}
      <div className="flex items-center justify-end mb-4">
        <label htmlFor="pageSize" className="mr-2 text-sm text-gray-700">
          Records per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      {quotations.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">No quotations found</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {quotations.map((quotation) => (
            <QuotationCard
              key={quotation.id}
              quotation={quotation}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav
            className="inline-flex rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-300 bg-white text-sm font-medium rounded-l-md ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                  currentPage === idx + 1
                    ? "text-white bg-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-300 bg-white text-sm font-medium rounded-r-md ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Quotations;
