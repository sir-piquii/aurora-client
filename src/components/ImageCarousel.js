import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import carousel1 from './../assets/carousel_1.jpg';
import carousel2 from './../assets/carousel_2.jpg';
import carousel3 from './../assets/carousel_3.jpg';

export default function Banner() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const slides = [
		{
			image: carousel1,
			title: 'Everything you need to harvest energy from the Sun.',
			description: 'Your reliable partner for solar solutions.',
		},
		{
			image: carousel2,
			title: 'We Are Experts In Residential & Commercial Solar Energy',
			description: 'Powering homes and businesses with renewable energy.',
		},
		{
			image: carousel3,
			title: 'Why choose Aurora Energy',
			description: 'Experience innovation and sustainability with us.',
		},
	];

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
		);
	};

	return (
		<div className="relative w-full h-[900px] overflow-hidden">
			{/* Image Carousel */}
			<div
				className="flex transition-transform duration-1000"
				style={{
					transform: `translateX(-${currentIndex * 100}%)`,
					width: `${slides.length * 100}%`,
				}}
			>
				{slides.map((slide, index) => (
					<div key={index} className="w-full h-full flex-shrink-0">
						<img
							src={slide.image}
							alt={`Banner ${index + 1}`}
							className="w-full h-full object-contain"
						/>
					</div>
				))}
			</div>

			{/* Overlaying Dynamic Text */}
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
				<h1 className="text-5xl font-bold mb-4">
					{slides[currentIndex].title}
				</h1>
				<p className="text-lg mb-6">
					{slides[currentIndex].description}
				</p>
				<a
					href="/about"
					className="inline-block bg-gradient-to-r from-orange-500 to-navy-900 text-white text-lg py-3 px-8 rounded-lg hover:from-navy-900 hover:to-orange-500 transition-transform transform hover:scale-105"
				>
					Explore Now
				</a>
			</div>

			{/* Custom Orange Navigation Buttons */}
			<button
				onClick={handlePrev}
				className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white bg-orange-500 p-4 rounded-full hover:bg-orange-600 transition-all hover:scale-110"
			>
				<FaChevronLeft size={24} />
			</button>
			<button
				onClick={handleNext}
				className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white bg-orange-500 p-4 rounded-full hover:bg-orange-600 transition-all hover:scale-110"
			>
				<FaChevronRight size={24} />
			</button>

			{/* Orange Flag for Get a Free Quote */}
			<div className="absolute top-4 right-4 z-20">
				<a
					href="/free-quote"
					className="block transform -rotate-6 px-6 py-3 text-sm font-bold text-white bg-gradient-to-l from-orange-600 to-orange-400 rounded-tr-full rounded-bl-full shadow-lg hover:scale-105 transition"
				>
					Get a Free Quote
				</a>
			</div>
		</div>
	);
}
