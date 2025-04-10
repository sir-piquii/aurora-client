import React from 'react';
import chasara from './../assets/chasara.jpg';

const CEOMessage = () => {
	return (
		<div className="w-[80%] min-h-[400px] bg-navy-900 p-8 rounded-lg text-white mx-auto">
			<h2 className="text-3xl font-bold mb-4">MD’s Welcome Message</h2>
			<img
				src={chasara} // Replace with your actual image URL
				alt="CEO"
				className="float-right w-64 h-64 rounded-full object-cover border-4 border-orange-500 my-auto"
				style={{ shapeOutside: 'circle(50%)', shapeMargin: '10px' }}
			/>
			<p className="text-justify">
				Welcome to Aurora Energy, where innovation meets sustainability.
				I am proud to lead a company committed to driving the transition
				to renewable energy. Our mission is to deliver cutting-edge
				technologies and services that meet today's demands while
				safeguarding the planet.
				<br />
				<br />
				We are guided by core values of sustainability, integrity, and
				excellence. As a partner in the global effort towards
				sustainability, we collaborate with communities, governments,
				and industry leaders to accelerate clean energy adoption.
				<br />
				<br />
				Together, let's power a brighter, more sustainable tomorrow.
			</p>
			<p className="text-right italic mt-4">
				Mr. Chasara, Managing Director of Aurora Energy.
			</p>
		</div>
	);
};

export default CEOMessage;
