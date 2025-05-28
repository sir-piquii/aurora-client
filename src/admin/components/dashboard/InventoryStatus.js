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
              <span>{summaryData.low_stock_items} items low in stock</span>
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
                  {summaryData.current_inventory}
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
                <p className="text-sm font-medium text-purple-700">Adjusted</p>
                <h4 className="text-xl font-bold text-gray-900 mt-1">
                  {inventoryData[0]?.stock_adjusted || "0"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            {[
              { category: "Solar Panels", total: 120, low: 3, trend: "up" },
              { category: "Inverters", total: 78, low: 15, trend: "down" },
              { category: "Batteries", total: 245, low: 22, trend: "down" },
              { category: "Cabling", total: 516, low: 8, trend: "up" },
              { category: "Accessories", total: 721, low: 12, trend: "stable" },
            ].map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.low}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {item.trend === "up" && (
                      <span className="flex items-center text-green-600 text-xs font-medium">
                        <ArrowUp className="h-3.5 w-3.5 mr-1" />
                        Increasing
                      </span>
                    )}
                    {item.trend === "down" && (
                      <span className="flex items-center text-red-600 text-xs font-medium">
                        <ArrowDown className="h-3.5 w-3.5 mr-1" />
                        Decreasing
                      </span>
                    )}
                    {item.trend === "stable" && (
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
