import React, { useEffect, useState } from 'react';
import { FaChartPie } from 'react-icons/fa6';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	PieChart,
	Pie,
	Cell,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { getOverview } from '../../api';

const COLORS = ['#de7a37', '#092045', '#ffc658', '#ff7f50', '#00c49f'];

const DashboardCharts = () => {
	const [timeRange, setTimeRange] = useState('30d');
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [rawData] = await getOverview(timeRange);

				const productCounts = [
					{ name: 'Solar Panels', count: rawData.Solar_Panels },
					{ name: 'Cabling', count: rawData.Cabling },
					{ name: 'Energy Storage', count: rawData.Energy_Storage },
					{ name: 'Switch Gear', count: rawData.Switch_Gear },
					{
						name: 'Hybrid Inverters',
						count: rawData.Hybrid_Inverters,
					},
					{ name: 'Accessories', count: rawData.Accessories },
					{
						name: 'Mounting Equipment',
						count: rawData.Mounting_Equipment,
					},
				];

				const stockStatus = [
					{ status: 'In Stock', value: rawData.Products - 10 },
					{ status: 'Out of Stock', value: 10 },
				];

				const revenueByCategory = [
					{
						category: 'Solar Panels',
						revenue: rawData.Solar_Panels * 500,
					},
					{
						category: 'Inverters',
						revenue: rawData.Hybrid_Inverters * 300,
					},
					{
						category: 'Accessories',
						revenue: rawData.Accessories * 100,
					},
				];

				const dealerStatuses = [
					{ status: 'Applied', count: rawData.Applied_Dealers },
					{ status: 'Approved', count: rawData.Approved_Dealers },
				];

				const dealerPerformance = [
					{ dealer: 'Dealer A', unitsSold: 30, revenue: 9000 },
					{ dealer: 'Dealer B', unitsSold: 20, revenue: 6000 },
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
				console.error('Error fetching dashboard data:', error);
			}
		};

		fetchData();
	}, [timeRange]);

	if (!chartData)
		return (
			<p className="text-center mt-10 text-gray-500">Loading charts...</p>
		);

	const {
		productCounts,
		stockStatus,
		revenueByCategory,
		dealerStatuses,
		dealerPerformance,
		summary,
	} = chartData;

	return (
		<div className="p-6">
			<div className="mb-4">
				<label className="mr-2 font-semibold">Filter by time:</label>
				<select
					className="p-2 border rounded"
					value={timeRange}
					onChange={(e) => setTimeRange(e.target.value)}
				>
					<option value="7d">Last 7 Days</option>
					<option value="30d">Last 30 Days</option>
					<option value="90d">Last 90 Days</option>
					<option value="1y">Last 1 Year</option>
				</select>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<div className="bg-white p-4 rounded shadow text-center flex flex-col items-center">
					<FaChartPie className="text-[#092045] w-6 h-6 mb-2" />
					<h3 className="text-sm font-medium text-gray-500">
						Total Products
					</h3>
					<p className="text-2xl font-bold text-gray-800">
						{summary.products}
					</p>
				</div>
				<div className="bg-white p-4 rounded shadow text-center flex flex-col items-center">
					<FaChartPie className="text-[#092045] w-6 h-6 mb-2" />
					<h3 className="text-sm font-medium text-gray-500">
						Total Dealers
					</h3>
					<p className="text-2xl font-bold text-gray-800">
						{summary.dealers}
					</p>
				</div>
				<div className="bg-white p-4 rounded shadow text-center flex flex-col items-center">
					<FaChartPie className="text-[#092045] w-6 h-6 mb-2" />
					<h3 className="text-sm font-medium text-gray-500">
						Total Orders
					</h3>
					<p className="text-2xl font-bold text-gray-800">
						{summary.orders}
					</p>
				</div>
				<div className="bg-white p-4 rounded shadow text-center flex flex-col items-center">
					<FaChartPie className="text-[#092045] w-6 h-6 mb-2" />
					<h3 className="text-sm font-medium text-gray-500">
						Total Quotations
					</h3>
					<p className="text-2xl font-bold text-gray-800">
						{summary.quotations}
					</p>
				</div>
			</div>

			{/* Top Row: Bar Charts */}
			<div className="flex flex-col lg:flex-row gap-6">
				<div className="flex-1 bg-white p-4 rounded shadow">
					<h2 className="text-lg font-bold mb-2">Product Counts</h2>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={productCounts}>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="count" fill="#092045" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="flex-1 bg-white p-4 rounded shadow">
					<h2 className="text-lg font-bold mb-2">
						Revenue by Category
					</h2>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={revenueByCategory}>
							<XAxis dataKey="category" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="revenue" fill="#092045" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="flex-1 bg-white p-4 rounded shadow">
					<h2 className="text-lg font-bold mb-2">
						Dealer Performance
					</h2>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={dealerPerformance}>
							<XAxis dataKey="dealer" />
							<YAxis />
							<Tooltip />
							<Bar
								dataKey="unitsSold"
								fill="#092045"
								name="Units Sold"
							/>
							<Bar
								dataKey="revenue"
								fill="#ff7f50"
								name="Revenue"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Bottom Row: Pie Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-bold mb-2">Stock Status</h2>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={stockStatus}
								dataKey="value"
								nameKey="status"
								cx="50%"
								cy="50%"
								outerRadius={100}
								label
							>
								{stockStatus.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>

				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-bold mb-2">Dealer Statuses</h2>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={dealerStatuses}
								dataKey="count"
								nameKey="status"
								cx="50%"
								cy="50%"
								outerRadius={100}
								label
							>
								{dealerStatuses.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default DashboardCharts;
