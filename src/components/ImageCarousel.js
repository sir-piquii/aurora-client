import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import carousel1 from './../assets/house_animation.mp4';

export default function Banner() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const slides = [
		{
			type: 'video',
			source: carousel1,
			title: 'Empowering a Sustainable Future!',
			description:
				'We specialize in delivering top-notch Renewable Energy Solutions for both Residential and Commercial Applications. Our portfolio features industry-leading brands, ensuring reliability, efficiency, and innovation. ',
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
		<>
			{/* Carousel Container */}
			<div className="relative w-full h-full overflow-hidden">
				{/* Media Carousel */}
				<div
					className="flex transition-transform duration-1000"
					style={{
						transform: `translateX(-${currentIndex * 100}%)`,
						width: `${slides.length * 100}%`,
					}}
				>
					{slides.map((slide, index) => (
						<div
							key={index}
							className="w-full h-full flex-shrink-0 relative"
						>
							{slide.type === 'video' ? (
								<video
									autoPlay
									loop
									muted
									playsInline
									className="w-full h-full object-cover"
								>
									<source
										src={slide.source}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							) : (
								<img
									src={slide.source}
									alt={`Banner ${index + 1}`}
									className="w-full h-auto object-cover"
								/>
							)}
							<div className="absolute inset-0 bg-black/40"></div>
						</div>
					))}
				</div>

				{/* Desktop Overlay Text (visible on md and up) */}
				<div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
					<h1 className="text-5xl font-bold mb-4">
						{slides[currentIndex].title}
					</h1>
					<p className="text-lg mb-6">
						{slides[currentIndex].description}
					</p>
					<a
						href="/products"
						className="inline-block bg-gradient-to-r from-orange-500 to-navy-900 text-white text-lg py-3 px-8 rounded-lg hover:from-navy-900 hover:to-orange-500 transition-transform transform hover:scale-105"
					>
						Explore Now
					</a>
				</div>

				{/* Navigation Arrows (if more than one slide) */}
				{slides.length > 1 && (
					<>
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
					</>
				)}

				{/* Orange Flag for Get a Free Quote */}
				<div className="absolute top-4 right-10 z-20 flex items-center justify-center">
					<div className="relative">
						<a
							href="https://wa.me/263771683662"
							target="_blank"
							rel="noopener noreferrer"
							className="block transform -rotate-6 px-6 py-3 text-sm font-bold text-white bg-gradient-to-l from-orange-600 to-orange-400 rounded-tr-full rounded-bl-full shadow-lg hover:scale-105 transition"
							style={{
								position: 'relative',
								display: 'inline-block',
								textAlign: 'center',
								boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
							}}
						>
							Get a Free Quote
						</a>
						{/* Strings */}
						<div
							className="absolute w-1 h-12 bg-gray-800 left-2 top-[-32px]"
							style={{
								transformOrigin: 'bottom',
								transform: 'rotate(-10deg)',
							}}
						></div>
						<div
							className="absolute w-1 h-9 bg-gray-800 right-8 top-[-32px]"
							style={{
								transformOrigin: 'bottom',
								transform: 'rotate(10deg)',
							}}
						></div>
						{/* Holes */}
						<div className="absolute w-3 h-3 bg-gray-800 rounded-full left-1 top-[10px]"></div>
						<div className="absolute w-3 h-3 bg-gray-800 rounded-full right-7 top-[-3px]"></div>
					</div>
				</div>
			</div>

			{/* Mobile Text Container (visible on small screens) */}
			<div className="md:hidden text-center text-navy-900 mt-4 px-4">
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
		</>
	);
}
