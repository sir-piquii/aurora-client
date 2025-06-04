import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
const SalesChart = ({ data }) => {
  // Transform the incoming data to fit the chart's expected format
  // Group by month_year, sum monthly_revenue per category
  const chartDataMap = {};

  data.forEach((item) => {
    const month = item.month_year;
    if (!chartDataMap[month]) {
      chartDataMap[month] = { month };
    }
    // Use category_name as key, parseFloat for revenue
    chartDataMap[month][item.category_name] = parseFloat(item.monthly_revenue);
  });

  // Convert map to array and sort by month_number (assuming all months are in the same year or sorted)
  const chartData = Object.values(chartDataMap).sort((a, b) => {
    // Extract month_number from one of the items (find in original data)
    const aMonth =
      data.find((d) => d.month_year === a.month)?.month_number || "01";
    const bMonth =
      data.find((d) => d.month_year === b.month)?.month_number || "01";
    return parseInt(aMonth) - parseInt(bMonth);
  });

  const [timeRange, setTimeRange] = useState("6m");
  const filterMap = {
    "1m": 1,
    "3m": 3,
    "6m": 6,
    "1y": 12,
  };
  const filteredData = chartData.slice(-filterMap[timeRange]);
  // Get all unique categories for dynamic lines
  const categories = Array.from(
    new Set(data.map((item) => item.category_name))
  );

  // Assign colors for up to 8 categories
  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#6366f1",
    "#14b8a6",
    "#f472b6",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Monthly Sales</h3>
          <p className="text-sm text-gray-500">Revenue by product category</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Filter:</span>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            {["1m", "3m", "6m", "1y"].map((range) => (
              <button
                key={range}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${
                  timeRange === range
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, undefined]}
              contentStyle={{
                borderRadius: "8px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "none",
              }}
            />
            <Legend />
            {categories.map((cat, idx) => (
              <Line
                key={cat}
                type="monotone"
                dataKey={cat}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
