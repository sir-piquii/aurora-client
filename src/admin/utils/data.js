export const STATUS_CODES = {
  PENDING_DOCUMENTS: "1",
  PENDING_INSTALLATIONS: "2",
  PENDING_APPROVAL: "3",
  APPROVED: "4",
  REGISTERED: "5",
  SUSPENDED: "6",
};

export const STATUS_LABELS = {
  [STATUS_CODES.PENDING_DOCUMENTS]: "Pending Documents",
  [STATUS_CODES.PENDING_INSTALLATIONS]: "Pending Installations",
  [STATUS_CODES.PENDING_APPROVAL]: "Pending Approval",
  [STATUS_CODES.APPROVED]: "Approved",
  [STATUS_CODES.REGISTERED]: "Registered",
  [STATUS_CODES.SUSPENDED]: "Suspended",
};

export const STATUS_COLORS = {
  [STATUS_CODES.PENDING_DOCUMENTS]: "bg-yellow-100 text-yellow-800",
  [STATUS_CODES.PENDING_INSTALLATIONS]: "bg-purple-100 text-purple-800",
  [STATUS_CODES.PENDING_APPROVAL]: "bg-blue-100 text-blue-800",
  [STATUS_CODES.APPROVED]: "bg-green-100 text-green-800",
  [STATUS_CODES.REGISTERED]: "bg-green-100 text-green-800",
  [STATUS_CODES.SUSPENDED]: "bg-red-100 text-red-800",
};
