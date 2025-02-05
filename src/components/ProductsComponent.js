import {
	FaSolarPanel,
	FaBolt,
	FaBatteryFull,
	FaTools,
	FaMountain,
	FaPlug,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const products = [
	{
		name: 'Solar Panels',
		icon: <FaSolarPanel size={40} />,
		link: '/product/solar-panels',
	},
	{
		name: 'Inverters',
		icon: <FaBolt size={40} />,
		link: '/product/inverters',
	},
	{
		name: 'Energy Storage',
		icon: <FaBatteryFull size={40} />,
		link: '/product/energy-storage',
	},
	{
		name: 'Balance of Systems',
		icon: <FaTools size={40} />,
		link: '/product/balance-of-systems',
	},
	{
		name: 'Mounting Equipment',
		icon: <FaMountain size={40} />,
		link: '/product/mounting-equipment',
	},
	{
		name: 'Cabling',
		icon: <FaPlug size={40} />,
		link: '/product/cabling',
	},
];

export default function ProductSection() {
	return (
		<section className="container mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8">
				Explore Our Products
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product, index) => (
					<Link
						to={product.link}
						key={index}
						className="group flex flex-col items-center p-6 bg-navy-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200 hover:border-orange-500 hover:text-orange-500 hover:shadow-[0_0_20px_rgba(251,146,60,0.7)]"
					>
						<div className="mb-3 transition-transform duration-500 group-hover:text-orange-500 text-white group-hover:rotate-[360deg] group-hover:scale-110">
							{product.icon}
						</div>
						<p className="text-lg text-white font-semibold">
							{product.name}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}
