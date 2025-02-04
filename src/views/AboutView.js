import React, { useEffect } from 'react';
import Team from './../components/TeamComponent';
import './AboutView.css';
export default function AboutUs() {
	useEffect(() => {
		document.title = 'About Us | Aurora';
	}, []);
	return (
		<section className="container mx-auto px-4 py-12">
			{/* Our Story */}
			<h3 className="text-6xl font-semibold mb-4 text-center gradient-bg my-3">
				We Are Experts In Residential & Commercial Solar Energy
			</h3>
			<div className="p-8 rounded-lg shadow-lg my-6">
				<p className="text-lg text-gray-600 my-3">
					Inspired by the (southern lights) Auroras which are a result
					of disturbances in the magnetosphere caused by solar wind.
					These disturbances are sometimes strong enough to alter the
					trajectories of charged particles in both solar wind and
					magnetospheric plasma. Aurora Energy seeks to change the
					trajectory of renewable energy sources. Our vision lies in
					reducing the carbon footprint through providing cleaner,
					affordable, environmentally friendly and sustainable sources
					of power. Established in 2019, Aurora Energy stocks a wide
					range of solar equipment with the aim to be your one stop
					solar equipment shop. Our stock selection is made of
					reputable brands and we strive as much as possible to source
					from OEMs passing on these massive benefits to our clients.
				</p>
			</div>

			{/* Our Vision, Our Mission, Our Values as Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				{/* Our Vision Card */}
				<div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:border-orange-500 border border-gray-200 hover:glow-effect">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Our Vision
					</h2>
					<p className="text-lg text-gray-600">
						For our Consumers: We envision providing sustainable
						energy solutions across Africa. For our Team: Being the
						most knowledgeable experts in renewable energy, lighting
						and electrical solutions.
					</p>
				</div>

				{/* Our Mission Card */}
				<div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:border-orange-500 border border-gray-200 hover:glow-effect">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Our Mission
					</h2>
					<p className="text-lg text-gray-600">
						To provide sustainable and renewable energy solutions
						that impact positively in people’s lives.
					</p>
				</div>

				{/* Our Values Card */}
				<div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:border-orange-500 border border-gray-200 hover:glow-effect">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Our Values
					</h2>
					<ul className="list-disc pl-6 text-lg text-gray-600">
						<li>
							Customer Satisfaction – We are not done until the
							customer is satisfied completely.
						</li>
						<li>
							Worthy of Trust – We keep our promises and we do the
							right thing, period!
						</li>
						<li>
							Respect for Each Other – We are inclusive and
							collaborative, and individuals with diverse
							backgrounds and talents.
						</li>
					</ul>
				</div>
			</div>

			{/* Our Story */}
			<div className="p-8 rounded-lg shadow-lg">
				<h3 className="text-8xl font-semibold mb-4 text-center gradient-bg">
					Our Story
				</h3>
				<p className="text-lg text-gray-600">
					We have a dynamic and unique team within our company which
					brings together a mix of experience, skills and
					qualifications. The rich variety of our backgrounds and
					perspectives give Aurora Energy the range of expertise
					required to provide solutions to our clients’ most complex
					problems.
				</p>
			</div>
			{/* Our Team */}
			<Team />
		</section>
	);
}
