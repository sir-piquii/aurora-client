import React, { useEffect } from 'react';
import Team from './../components/TeamComponent';
import InfoCards from './../components/InfoComponent';
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

			{/* Our Info */}
			<InfoCards />

			{/* Our Team */}
			<Team />
		</section>
	);
}
