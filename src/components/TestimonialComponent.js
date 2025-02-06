import React from 'react';
import Slider from 'react-slick';
import { FaUserCircle } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import solar_support from './../assets/solar_support.JPG';
import irradiant from './../assets/irradiant.JPG';
import lentaway from './../assets/lentaway.JPG';
import warehouse from './../assets/warehouse.jpg';

const testimonials = [
	{
		id: 1,
		name: 'Eng Geral Kwinjo',
		role: 'Operations Manager',
		image: solar_support,
		feedback:
			'Solar Support ZW Aurora Energy has been a steadfast and trustworthy partner in renewable energy solutions. Their exceptional technical support has been instrumental in building confidence with our customers and installation teams. Our four-year collaboration has not only fueled our business growth but also elevated the quality of our work. I wholeheartedly recommend Aurora Energy to anyone seeking reliable and expert renewable energy solutions.',
	},
	{
		id: 2,
		name: 'Pride Gandah',
		role: 'Chief Technical Officer',
		image: irradiant, // No image provided
		feedback:
			'As IRRADIANT ENERGY, our long standing relationship with Aurora Energy enabled us to offer solar energy products and services of the highest quality to our clients. Our working together has been very fruitful and we continue to support and trust each other in order to continue offering products and services that are unmatched in quality. ',
	},
	{
		id: 3,
		name: 'Lloyd E.N. Nyemba (Pr.Eng)',
		role: 'Director',
		image: lentaway,
		feedback:
			"Lentaway is a solar and renewable and solar energy EPC serving a wide spectrum of clientele in Zimbabwe. Aurora is our main distributor, and technology supply partner since 2020, providing us with solar modules, inverter technology, lithium ion batteries and balance of systems. Aurora's service is top notch, and have reliably supplied us with solar products for our high end clientele which includes developmental organisations like the UN, commercial and upmarket residential. Aurora also supports us promptly with 24/7 after-sales support and critical spares back-up which is vital for long term sustainability of our operating solar systems.",
	},
	{
		id: 4,
		name: 'Ryan Carpenter',
		role: 'Managing Director',
		image: warehouse,
		feedback:
			'I would like to personally commend Aurora Energy on their consistency and exceptional customer service. Their clientele base is constantly kept up to date of stocks in coming and new products on the market. They have excelled in providing installers and retailers with all the necessary quality equipment required for a solar installation and at an affordable price! Aurora Energy has a reputable reputation, innovative and positive mindset and a great relationship with its customers. We look forward to our continuation of working with you and our support for each other.',
	},
];

const TestimonialCarousel = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 10000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<div className="max-w-6xl mx-auto py-8">
			<h2 className="text-3xl font-bold text-center mb-8">
				Testimonials
			</h2>
			<Slider {...settings}>
				{testimonials.map((testimonial) => (
					<div
						key={testimonial.id}
						className="px-4 transform transition-transform duration-300 hover:scale-105 py-8"
					>
						<div className="bg-navy-900 text-white rounded-lg shadow-lg h-[510px] flex flex-col p-6 transform transition-transform">
							{/* Image Section */}
							<div className="flex justify-center mb-4">
								{testimonial.image ? (
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="w-24 h-24 object-cover rounded-full transition-transform duration-300 group-hover:scale-110 hover:rotate-[20deg]"
									/>
								) : (
									<FaUserCircle className="w-24 h-24 text-gray-500 rounded-full transition-transform duration-300 hover:rotate-[20deg]" />
								)}
							</div>
							{/* Card Content */}
							<div className="text-center">
								<h3 className="text-lg font-semibold text-orange-500">
									{testimonial.name}
								</h3>
								<p className="text-sm text-gray-300">
									{testimonial.role}
								</p>
								<p className="text-sm mt-4">
									{testimonial.feedback}
								</p>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default TestimonialCarousel;
