/**
 * InventoryStatus component displays a summary and detailed table of inventory status.
 *
 * @component
 * @param {Object[]} inventoryData - Array of inventory data objects for each category.
 * @param {string} inventoryData[].category_name - Name of the inventory category.
 * @param {number} inventoryData[].current_inventory - Current inventory count for the category.
 * @param {number} inventoryData[].low_stock_items - Number of items low in stock for the category.
 * @param {number} inventoryData[].stock_in - Number of items stocked in for the category.
 * @param {number} inventoryData[].stock_out - Number of items stocked out for the category.
 * @param {number} inventoryData[].stock_adjusted - Number of items adjusted for the category.
 * @param {'increasing'|'decreasing'|'stable'} inventoryData[].stock_trend - Stock trend status for the category.
 * @param {Object} summaryData - Summary data for the inventory.
 * @param {number} summaryData.low_stock_items - Total number of items low in stock across all categories.
 * @param {number} summaryData.current_inventory - Total current inventory across all categories.
 *
 * @returns {JSX.Element} The rendered InventoryStatus component.
 */
import {
  AlertCircle as CircleAlert,
  PackageCheck,
  Truck,
  PackageOpen,
  ArrowDown,
  ArrowUp,
  MinusCircle,
} from "lucide-react";

const InventoryStatus = ({ inventoryData, summaryData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      {summaryData && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Inventory Status
              </h3>
              <p className="text-sm text-gray-500">
                Current stock levels and alerts
              </p>
            </div>

            <div className="flex items-center">
              <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                <CircleAlert className="h-3.5 w-3.5 mr-1" />
                <span>{summaryData?.low_stock_items} items low in stock</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <PackageCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Current Inventory
                  </p>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
                    {summaryData?.current_inventory}
                  </h4>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Stock In</p>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
                    {inventoryData[0]?.stock_in || "0"}
                  </h4>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 mr-3">
                  <PackageOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">Stock Out</p>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
                    {inventoryData[0]?.stock_out || "0"}
                  </h4>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <MinusCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700">
                    Adjusted
                  </p>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
                    {inventoryData[0]?.stock_adjusted || "0"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Low Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {inventoryData?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.category_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.current_inventory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.low_stock_items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {item.stock_trend === "increasing" && (
                      <span className="flex items-center text-green-600 text-xs font-medium">
                        <ArrowUp className="h-3.5 w-3.5 mr-1" />
                        Increasing
                      </span>
                    )}
                    {item.stock_trend === "decreasing" && (
                      <span className="flex items-center text-red-600 text-xs font-medium">
                        <ArrowDown className="h-3.5 w-3.5 mr-1" />
                        Decreasing
                      </span>
                    )}
                    {item.stock_trend === "stable" && (
                      <span className="flex items-center text-gray-600 text-xs font-medium">
                        <span className="h-0.5 w-3 bg-gray-400 mr-1"></span>
                        Stable
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryStatus;
