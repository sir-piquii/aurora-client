/**
 * DashboardCharts component displays the main dashboard charts and statistics for the admin panel.
 *
 * Features:
 * - Fetches and displays overview statistics (products, quotations, approved dealers, system users).
 * - Fetches and displays detailed statistics including monthly trends, sales by category, product performance, inventory status, and key matrices.
 * - Shows a loading spinner while data is being fetched.
 * - Renders summary, sales chart, product performance, and inventory status components.
 *
 * State:
 * @typedef {Object} Overview
 * @property {number} products - Total number of products.
 * @property {number} quotations - Total number of quotations.
 * @property {number} approved_dealers - Total number of approved dealers.
 * @property {number} system_users - Total number of system users.
 *
 * @typedef {Object} Stats
 * @property {?Object} monthlyTrend - Monthly trend data.
 * @property {?Object} monthlySalesByCategory - Sales data by category.
 * @property {?Object} categoryPerformance - Performance data by category.
 * @property {?Object} categoryStockDetails - Stock details by category.
 * @property {?Object} keyMatrices - Key matrices data.
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard charts and statistics.
 */
import { useEffect, useState, useCallback } from "react";
import StatsSummary from "./dashboard/StatsSummary";
import SalesChart from "./dashboard/SalesChart";
import ProductPerformance from "./dashboard/ProductPerfomance";
import InventoryStatus from "./dashboard/InventoryStatus";
import { getOverview, getStatistics } from "../../api";
import Spinner from "../../components/Spinner";

const DashboardCharts = () => {
  const [timeRange, setTimeRange] = useState("1y");
  const [range, setRange] = useState(null);
  const [overview, setOverview] = useState({
    products: 0,
    quotations: 0,
    approved_dealers: 0,
    system_users: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [stats, setStats] = useState({
    monthlyTrend: null,
    monthlySalesByCategory: null,
    categoryPerformance: null,
    categoryStockDetails: null,
    keyMatrices: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOverview(timeRange);
        setOverview({
          ...overview,
          products: data[0]?.Products,
          quotations: data[0]?.Quotations,
          approved_dealers: data[0]?.Approved_Dealers,
          system_users: data[0]?.System_Users,
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
      setStats({
        ...stats,
        monthlyTrend: data[0],
        monthlySalesByCategory: data[1],
        categoryPerformance: data[2],
        categoryStockDetails: data[3],
        keyMatrices: data[4],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [range, category]);
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  if (isLoading) return <Spinner />;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <StatsSummary data={overview} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {stats.monthlySalesByCategory ? (
          <SalesChart data={stats.monthlySalesByCategory} />
        ) : (
          <span>No available info</span>
        )}
        {stats.categoryPerformance ? (
          <ProductPerformance data={stats.categoryPerformance} />
        ) : (
          <span>No available info</span>
        )}
      </div>
      <div className="mt-6">
        <InventoryStatus
          inventoryData={stats.categoryStockDetails}
          summaryData={stats.keyMatrices[0] || null}
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
