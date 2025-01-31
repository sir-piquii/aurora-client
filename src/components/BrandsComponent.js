import { Link } from 'react-router-dom';

// Sample brand logos (replace with actual logo paths)
import brand1 from './../assets/brand1.png';
import brand2 from './../assets/brand2.png';
import brand3 from './../assets/brand3.png';
import brand4 from './../assets/brand4.png';
import brand5 from './../assets/brand5.png';
import brand6 from './../assets/brand6.png';

const brands = [
	{ name: 'Brand 1', logo: brand1, link: '/brands/brand1' },
	{ name: 'Brand 2', logo: brand2, link: '/brands/brand2' },
	{ name: 'Brand 3', logo: brand3, link: '/brands/brand3' },
	{ name: 'Brand 4', logo: brand4, link: '/brands/brand4' },
	{ name: 'Brand 5', logo: brand5, link: '/brands/brand5' },
	{ name: 'Brand 6', logo: brand6, link: '/brands/brand6' },
];

export default function OurBrands() {
	return (
		<section className="container mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8">Our Brands</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{brands.map((brand, index) => (
					<Link
						to={brand.link}
						key={index}
						className="flex justify-center items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-orange-500"
					>
						<img
							src={brand.logo}
							alt={brand.name}
							className="max-h-16 object-contain"
						/>
					</Link>
				))}
			</div>
		</section>
	);
}
