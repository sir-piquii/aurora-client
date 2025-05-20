import { ChevronRight, Building2, Mail, User } from "lucide-react";

//status badge

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

const DealerCard = ({ dealer }) => {
  return (
    <a
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
      href={`/admin/dealers/${dealer.id}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {dealer.user_full_name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <User size={16} className="mr-2 flex-shrink-0" />
              <span>{dealer.user_username}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Mail size={16} className="mr-2 flex-shrink-0" />
              <span>{dealer.user_email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Building2 size={16} className="mr-2 flex-shrink-0" />
              <span>{dealer.trading_name}</span>
            </div>
          </div>
          <StatusBadge status={dealer.reg_status} className="ml-2" />
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 flex justify-end items-center border-t border-gray-100">
        <div className="flex items-center text-sm font-medium text-orange-600 hover:text-orange-500">
          View Details
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
    </a>
  );
};

export default DealerCard;
