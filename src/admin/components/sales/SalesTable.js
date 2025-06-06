import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  Search,
  Calendar,
  Filter,
} from "lucide-react";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";
const SalesTable = ({ sales, onEdit, onDelete }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("transaction_date");
  const [sortDirection, setSortDirection] = useState("asc");
  const toggleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getSaleTypeVariant = (type) => {
    switch (type) {
      case "walk-in":
        return "success";
      case "website":
        return "info";
      default:
        return "default";
    }
  };

  // Filter and sort sales
  const filteredAndSortedSales = [...sales]
    .filter(
      (sale) =>
        sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customer_company
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        sale.transaction.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search sales..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<Calendar size={16} />}>
            Date Range
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
            Filters
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                onClick={() => handleSort("transaction_date")}
              >
                <div className="flex items-center">
                  Date
                  {sortField === "transaction_date" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                onClick={() => handleSort("transaction")}
              >
                <div className="flex items-center">
                  Transaction ID
                  {sortField === "transaction" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                onClick={() => handleSort("customer_name")}
              >
                <div className="flex items-center">
                  Customer
                  {sortField === "customer_name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                onClick={() => handleSort("total_amount")}
              >
                <div className="flex items-center">
                  Amount
                  {sortField === "total_amount" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                onClick={() => handleSort("sale_type")}
              >
                <div className="flex items-center">
                  Type
                  {sortField === "sale_type" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAndSortedSales.length > 0 ? (
              filteredAndSortedSales.map((sale) => (
                <React.Fragment key={sale.transaction}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatDate(sale.transaction_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {sale.transaction.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {sale.customer_name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {sale.customer_company}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600 dark:text-orange-400">
                      {formatCurrency(sale.total_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getSaleTypeVariant(sale.sale_type)}>
                        {sale.sale_type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpandRow(sale.transaction)}
                        rightIcon={
                          expandedRow === sale.transaction ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )
                        }
                      >
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(sale)}
                        leftIcon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(sale)}
                        leftIcon={<Trash size={16} />}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                  {expandedRow === sale.transaction && (
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-gray-100 animate-fadeIn">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                            Sale Details
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Recorder:
                              </p>
                              <p>{sale.recorder_name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Contact:
                              </p>
                              <p>{sale.customer_email}</p>
                              <p>{sale.customer_phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Transaction:
                              </p>
                              <p className="font-mono">{sale.transaction}</p>
                            </div>
                          </div>

                          <h4 className="font-semibold text-blue-900 dark:text-blue-400 mt-4 mb-2">
                            Products
                          </h4>
                          <div className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Product
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Price
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Quantity
                                  </th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Subtotal
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {(typeof sale.products === "string"
                                  ? JSON.parse(sale.products)
                                  : sale.products
                                )?.map((product, idx) => (
                                  <tr
                                    key={idx}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                  >
                                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                      {product.product}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                      ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                      {product.quantity}
                                    </td>
                                    <td className="px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                                      ${product.subtotal.toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                                <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
                                  <td
                                    colSpan={3}
                                    className="px-4 py-2 text-right text-sm text-gray-900 dark:text-white"
                                  >
                                    Total:
                                  </td>
                                  <td className="px-4 py-2 text-sm font-bold text-orange-600 dark:text-orange-400">
                                    {formatCurrency(sale.total_amount)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No sales found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing{" "}
            <span className="font-medium">{filteredAndSortedSales.length}</span>{" "}
            of <span className="font-medium">{sales.length}</span> sales
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={filteredAndSortedSales.length === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={filteredAndSortedSales.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
