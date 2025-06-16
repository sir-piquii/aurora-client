import { getQuotationsByUser } from "../../api";
import { useState, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FileText, ChevronDown, ChevronUp, Loader } from "lucide-react";
import StatusBadge from "./ui/StatusBadge";

/**
 * QuotationCard component displays a summary and detailed view of a quotation.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.quotation - The quotation data to display.
 * @param {string} props.quotation.requester_name - Name of the requester.
 * @param {string} props.quotation.requester_address - Address of the requester.
 * @param {string} props.quotation.requester_phone - Phone number of the requester.
 * @param {string} props.quotation.requester_email - Email address of the requester.
 * @param {string} [props.quotation.notes] - Additional notes for the quotation.
 * @param {string|Array<Object>} props.quotation.products - List of products (as array or JSON string).
 * @param {string} props.quotation.created_At - Creation date of the quotation.
 * @param {string} [props.quotation.status] - Status of the quotation (e.g., "approved").
 *
 * @returns {JSX.Element} The rendered QuotationCard component.
 */
const QuotationCard = ({ quotation }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const totalPrice =
    (typeof quotation.products === "string"
      ? JSON.parse(quotation.products)
      : quotation.products
    )?.reduce((total, product) => {
      const price = parseFloat(product.price) || 0;
      const quantity = parseInt(product.quantity, 10) || 0;
      return total + price * quantity;
    }, 0) || 0;

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
                    {(typeof quotation.products === "string"
                      ? JSON.parse(quotation.products)
                      : quotation.products
                    ).map((product, index) => (
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
                          {product.price * product.quantity}
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
            </div>
          </div>

          {/* <div className="mt-4 flex flex-wrap gap-2 justify-end">
            <button className="inline-flex items-center px-3 py-1.5 border border-indigo-600 text-xs font-medium rounded text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200">
              <Printer size={16} className="mr-1" />
              Print
            </button>
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
              <Download size={16} className="mr-1" />
              Download PDF
            </button>
            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200">
              <ExternalLink size={16} className="mr-1" />
              View Full Quotation
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

//Quotations
const Quotations = () => {
  const [loading, setLoading] = useState(false);
  const [quotations, setQuotations] = useState([]);
  const useAuth = useContext(AuthContext);
  const { user: userData } = useAuth;
  const fetchQuotations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getQuotationsByUser(
        userData.user.email,
        userData.user.id
      );
      setQuotations(data);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if (quotations.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-500">No quotations found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Quotations</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all your quotation requests
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
              Below are all the quotations you've requested. Click on any
              quotation to view more details or take action.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-200 pt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">
              Total Quotations
            </p>
            <p className="text-2xl font-bold text-indigo-800 mt-1">
              {quotations.length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">
              {quotations.filter((q) => q.status === "pending").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Approved</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {quotations.filter((q) => q.status === "approved").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-500">
              Expired/Rejected
            </p>
            <p className="text-2xl font-bold text-gray-600 mt-1">
              {
                quotations.filter(
                  (q) => q.status === "expired" || q.status === "rejected"
                ).length
              }
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {quotations.map((quotation) => (
          <QuotationCard key={quotation.id} quotation={quotation} />
        ))}
      </div>
    </div>
  );
};

export default Quotations;
