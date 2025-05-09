import React, { useEffect, useState } from 'react';
import {
	FaUserShield,
	FaUsers,
	FaBoxOpen,
	FaChartPie,
	FaBolt,
	FaPlug,
	FaBatteryHalf,
	FaCogs,
	FaAward,
	FaBlog,
	FaPeopleCarry,
	FaQuestionCircle,
	FaMedal,
	FaComments,
	FaWarehouse,
	FaTools,
	FaSun,
	FaStar,
} from 'react-icons/fa';
import { getOverview } from '../../api';

const iconMap = {
	System_Users: FaUserShield,
	Products: FaBoxOpen,
	Quotations: FaChartPie,
	Admins: FaUserShield,
	Users: FaUsers,
	Applied_Dealers: FaPeopleCarry,
	Approved_Dealers: FaMedal,
	Solar_Panels: FaSun,
	Cabling: FaPlug,
	Energy_Storage: FaBatteryHalf,
	Switch_Gear: FaCogs,
	Hybrid_Inverters: FaBolt,
	Accessories: FaTools,
	Mounting_Equipment: FaWarehouse,
	Awards: FaAward,
	Blogs: FaBlog,
	Team: FaUsers,
	FAQs: FaQuestionCircle,
	Casy_Study: FaChartPie,
	Featured_Products: FaStar,
	Testimonials: FaComments,
};

const DashboardCards = () => {
	const [stats, setStats] = useState(null);

	useEffect(() => {
		document.title = 'Dashboard | Admin Panel';
		const fetchStats = async () => {
			try {
				const data = await getOverview();
				setStats(data[0]); // Assuming the API returns an array with one object
			} catch (error) {
				console.error('Error fetching stats:', error);
			}
		};
		fetchStats();
	}, []);

	if (!stats) {
		return (
			<p className="text-center mt-10 text-gray-500">
				Loading dashboard...
			</p>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
			{Object.entries(stats).map(([key, value]) => {
				const Icon = iconMap[key] || FaBoxOpen;
				return (
					<div
						key={key}
						className="bg-white rounded-2xl shadow-2xl transform transition hover:scale-105 hover:shadow-xl p-6 flex flex-col items-center justify-center border border-gray-200"
						style={{
							perspective: '1000px',
							boxShadow: '0 8px 20px rgba(0, 31, 63, 0.2)',
						}}
					>
						<Icon className="text-4xl text-navy-900 mb-4" />
						<h3 className="text-lg font-semibold text-gray-700 text-center">
							{key.replace(/_/g, ' ')}
						</h3>
						<p className="text-3xl font-bold text-navy-900 mt-2">
							{value}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default DashboardCards;
