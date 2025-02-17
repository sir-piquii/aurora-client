import React, { useEffect } from 'react';
import Team from './../components/TeamComponent';
import InfoCards from './../components/InfoComponent';
import CeoMessage from './../components/CeoMessageComponent';
import './AboutView.css';
export default function AboutUs() {
	useEffect(() => {
		document.title = 'About Us | Aurora';
	}, []);
	return (
		<section className="container mx-auto px-auto">
			{/* Our Story */}
			<section className="py-2 px-auto border border-white shadow-[0_4px_6px_rgba(255,165,0,0.5)] rounded-lg my-6">
				<div className="max-w-5xl mx-auto">
					<h1 className="text-6xl font-bold text-center text-navy-900 mb-4">
						Our Story
					</h1>
					<div className="text-lg text-center text-navy-900 space-y-3 py-4">
						<p>
							Inspired by the breath-taking beauty of the aurora
							borealis, Aurora Energy aims to illuminate the path
							to a sustainable future in Zimbabwe's renewable
							energy sector.
						</p>
						<p>
							Our name is derived from the spectacular display of
							colored lights that occurs when charged particles
							from the solar wind interact with the Earth's
							magnetosphere. This natural phenomenon symbolizes
							our mission to bring light, energy, and hope to our
							communities.
						</p>
						<p>
							At Aurora Energy, we are committed to providing
							cleaner, affordable, environmentally friendly, and
							sustainable sources of power. We believe that every
							Zimbabwean deserves to harness the abundant solar
							energy available in our country and enjoy the
							benefits of high-quality, reliable, and efficient
							renewable energy solutions.
						</p>
						<p>
							Our goal is to make sustainable energy accessible,
							affordable, and mainstream, empowering individuals,
							businesses, and communities to thrive while
							protecting our planet for future generations.
						</p>
					</div>
				</div>
			</section>

			{/* Our Info */}
			<InfoCards />

			{/* CEO Message */}
			<CeoMessage />

			{/* Our Team */}
			<Team />
		</section>
	);
}
