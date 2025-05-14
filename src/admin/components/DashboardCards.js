import React, { useEffect, useState } from 'react';
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

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f'];

const DashboardCharts = () => {
	const [timeRange, setTimeRange] = useState('30d');
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [rawData] = await getOverview(timeRange); // single object in an array

				// Transform for Product Counts
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

				// Example: Dummy stock status transformation (you should update this as per actual logic)
				const stockStatus = [
					{ status: 'In Stock', value: rawData.Products - 10 },
					{ status: 'Out of Stock', value: 10 },
				];

				// Example: Dummy revenue by category (use real values if available)
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

				// Example: Dummy dealer performance data (replace with actual if available)
				const dealerPerformance = [
					{ dealer: 'Dealer A', unitsSold: 30, revenue: 9000 },
					{ dealer: 'Dealer B', unitsSold: 20, revenue: 6000 },
				];

				setChartData({
					productCounts,
					stockStatus,
					revenueByCategory,
					dealerStatuses,
					dealerPerformance,
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

			<h2 className="text-xl font-bold mb-2">Product Counts</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={productCounts}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="count" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>

			<h2 className="text-xl font-bold mt-6 mb-2">Stock Status</h2>
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

			<h2 className="text-xl font-bold mt-6 mb-2">
				Revenue by Product Category
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={revenueByCategory}>
					<XAxis dataKey="category" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="revenue" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>

			<h2 className="text-xl font-bold mt-6 mb-2">Dealer Statuses</h2>
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

			<h2 className="text-xl font-bold mt-6 mb-2">Dealer Performance</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={dealerPerformance}>
					<XAxis dataKey="dealer" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="unitsSold" fill="#ff7f50" name="Units Sold" />
					<Bar dataKey="revenue" fill="#00c49f" name="Revenue" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default DashboardCharts;
