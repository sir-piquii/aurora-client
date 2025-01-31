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
	{ name: 'Cabling', icon: <FaPlug size={40} />, link: '/product/cabling' },
];

export default function ProductSection() {
	return (
		<section className="container mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8">
				Our Products
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product, index) => (
					<Link
						to={product.link}
						key={index}
						className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-orange-500"
					>
						<div className="text-orange-500 mb-3">
							{product.icon}
						</div>
						<p className="text-lg font-semibold">{product.name}</p>
					</Link>
				))}
			</div>
		</section>
	);
}
