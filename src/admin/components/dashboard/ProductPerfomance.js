import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const ProductPerformance = ({ data }) => {
  // Sort data by revenue in descending order
  const sortedData = [...data].sort((a, b) => b.revenue - a.revenue);
  const topCategories = sortedData.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Top Categories
          </h3>
          <p className="text-sm text-gray-500">
            Performance by product category
          </p>
        </div>

        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
          <span>View Report</span>
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topCategories}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barSize={32}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
              contentStyle={{
                borderRadius: "8px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "none",
              }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span>Growth Leaders</span>
        </h4>

        <div className="space-y-3">
          {topCategories.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 mr-3`}
                >
                  <span className="text-xs font-semibold">{index + 1}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900 mr-2">
                  ${item.revenue}
                </span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  +{item.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;
