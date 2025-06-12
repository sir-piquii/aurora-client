import { ChevronRight, Building2, Mail, User } from "lucide-react";

//status badge

const STATUS_MAP = {
  1: { label: "NOT STARTED", color: "bg-gray-200 text-gray-700" },
  2: { label: "PENDING DOCUMENTS", color: "bg-yellow-100 text-yellow-800" },
  3: { label: "PENDING INSTALLATIONS", color: "bg-blue-100 text-blue-800" },
  4: { label: "APPROVED", color: "bg-green-100 text-green-800" },
  5: { label: "PENDING APPROVAL", color: "bg-orange-100 text-orange-800" },
  6: { label: "REJECTED", color: "bg-red-100 text-red-800" },
  7: { label: "SUSPENDED", color: "bg-gray-400 text-white" },
};

const STATUS_LABEL_TO_ID = {
  "not started": "1",
  "pending documents": "2",
  pending_installations: "3",
  "pending installations": "3",
  approved: "4",
  "pending approval": "5",
  pending_approval: "5",
  rejected: "6",
  suspended: "7",
};

const StatusBadge = ({ status, className = "" }) => {
  // Normalize status to id
  let statusId = STATUS_LABEL_TO_ID[String(status).toLowerCase()] || status;
  if (!STATUS_MAP[statusId]) {
    // fallback to "NOT STARTED"
    statusId = "1";
  }
  const { label, color } = STATUS_MAP[statusId];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}
    >
      {label}
    </span>
  );
};

/**
 * DealerCard component displays a card with dealer information and a link to the dealer's details page.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.dealer - Dealer object containing user and trading information.
 * @param {number|string} props.dealer.id - Unique identifier for the dealer.
 * @param {string} props.dealer.user_full_name - Full name of the dealer's user.
 * @param {string} props.dealer.user_username - Username of the dealer's user.
 * @param {string} props.dealer.user_email - Email address of the dealer's user.
 * @param {string} props.dealer.trading_name - Trading name of the dealer.
 * @param {string} props.dealer.reg_status - Registration status of the dealer.
 * @returns {JSX.Element} A clickable card displaying dealer details and a status badge.
 */
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
          <StatusBadge
            status={dealer.reg_status || "NOT STARTED"}
            className="ml-2"
          />
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
