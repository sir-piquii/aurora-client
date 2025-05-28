import { useEffect, useState, useCallback } from "react";
import StatsSummary from "./dashboard/StatsSummary";
import SalesChart from "./dashboard/SalesChart";
import ProductPerformance from "./dashboard/ProductPerfomance";
import InventoryStatus from "./dashboard/InventoryStatus";
import { getOverview, getStatistics } from "../../api";
// mock data
export const dashboardData = {
  overview: {
    System_Users: 15,
    Products: 65,
    Quotations: 19,
    Admins: 2,
    Users: 7,
    Applied_Dealers: 8,
    Approved_Dealers: 5,
    Solar_Panels: 3,
    Cabling: 9,
    Energy_Storage: 10,
    Switch_Gear: 15,
    Hybrid_Inverters: 11,
    Accessories: 13,
    Mounting_Equipment: 4,
    Awards: 3,
    Blogs: 2,
    Team: 6,
    FAQs: 4,
    Casy_Study: 2,
    Featured_Products: 4,
    Testimonials: 2,
  },

  // Sample monthly sales data to demonstrate the line chart
  monthlySales: [
    {
      month: "Dec",
      "Solar Panels": 4200,
      Inverters: 3800,
      Batteries: 2900,
      Accessories: 1500,
    },
    {
      month: "Jan",
      "Solar Panels": 4500,
      Inverters: 3600,
      Batteries: 3100,
      Accessories: 1700,
    },
    {
      month: "Feb",
      "Solar Panels": 4800,
      Inverters: 3900,
      Batteries: 3300,
      Accessories: 1900,
    },
    {
      month: "Mar",
      "Solar Panels": 5100,
      Inverters: 4200,
      Batteries: 3400,
      Accessories: 2100,
    },
    {
      month: "Apr",
      "Solar Panels": 4900,
      Inverters: 4500,
      Batteries: 3700,
      Accessories: 2400,
    },
    {
      month: "May",
      "Solar Panels": 5200,
      Inverters: 4700,
      Batteries: 3900,
      Accessories: 2600,
    },
  ],

  // Category performance data
  categoryPerformance: [
    { category: "Solar Panels", revenue: 5200, growth: 8 },
    { category: "Hybrid Inverters", revenue: 4700, growth: 12 },
    { category: "Energy Storage", revenue: 3900, growth: 6 },
    { category: "Accessories", revenue: 2600, growth: 15 },
    { category: "Cabling", revenue: 1800, growth: 4 },
    { category: "Switch Gear", revenue: 1400, growth: 3 },
    { category: "Mounting Equipment", revenue: 1200, growth: 2 },
  ],

  // Inventory data from provided statistics
  inventoryData: [
    {
      date: "08/05",
      stock_in: "0",
      stock_out: "0",
      stock_adjusted: "10",
    },
  ],

  // Summary data from provided statistics
  summaryData: {
    total_transactions: 1,
    total_revenue: "2600.00",
    current_inventory: "1680",
    low_stock_items: 60,
  },
};
const DashboardCharts = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [range, setRange] = useState(null);
  const [category, setCategory] = useState(null);
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rawData] = await getOverview(timeRange);

        const productCounts = [
          { name: "Solar Panels", count: rawData.Solar_Panels },
          { name: "Cabling", count: rawData.Cabling },
          { name: "Energy Storage", count: rawData.Energy_Storage },
          { name: "Switch Gear", count: rawData.Switch_Gear },
          {
            name: "Hybrid Inverters",
            count: rawData.Hybrid_Inverters,
          },
          { name: "Accessories", count: rawData.Accessories },
          {
            name: "Mounting Equipment",
            count: rawData.Mounting_Equipment,
          },
        ];

        const stockStatus = [
          { status: "In Stock", value: rawData.Products - 10 },
          { status: "Out of Stock", value: 10 },
        ];

        const revenueByCategory = [
          {
            category: "Solar Panels",
            revenue: rawData.Solar_Panels * 500,
          },
          {
            category: "Inverters",
            revenue: rawData.Hybrid_Inverters * 300,
          },
          {
            category: "Accessories",
            revenue: rawData.Accessories * 100,
          },
        ];

        const dealerStatuses = [
          { status: "Applied", count: rawData.Applied_Dealers },
          { status: "Approved", count: rawData.Approved_Dealers },
        ];

        const dealerPerformance = [
          { dealer: "Dealer A", unitsSold: 30, revenue: 9000 },
          { dealer: "Dealer B", unitsSold: 20, revenue: 6000 },
        ];

        const summary = {
          products: rawData.Products,
          dealers: rawData.Approved_Dealers + rawData.Applied_Dealers,
          orders: rawData.Total_Orders,
          quotations: rawData.Total_Quotations,
        };

        setChartData({
          productCounts,
          stockStatus,
          revenueByCategory,
          dealerStatuses,
          dealerPerformance,
          summary,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [timeRange]);
  const fetchStats = useCallback(async () => {
    try {
      const data = await getStatistics(range, category);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [range, category]);
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  if (!chartData)
    return <p className="text-center mt-10 text-gray-500">Loading charts...</p>;
  const {
    productCounts,
    stockStatus,
    revenueByCategory,
    dealerStatuses,
    dealerPerformance,
    summary,
  } = chartData;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <StatsSummary data={dashboardData.overview} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SalesChart data={dashboardData.monthlySales} />
        <ProductPerformance data={dashboardData.categoryPerformance} />
      </div>

      <div className="mt-6">
        <InventoryStatus
          inventoryData={dashboardData.inventoryData}
          summaryData={dashboardData.summaryData}
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
