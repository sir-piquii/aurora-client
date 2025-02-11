import React from 'react';

const InfoCard = ({ iconClass, title, children }) => {
	return (
		<div className="p-6 bg-navy-900 rounded-lg shadow-lg transition-all transform hover:scale-105 border border-blue-800">
			<div className="flex justify-center mb-4">
				<div className="bg-blue-800 rounded-full p-3">
					<i className={`${iconClass} text-white text-2xl`}></i>
				</div>
			</div>
			<h2 className="text-2xl font-semibold text-white mb-4 text-center">
				{title}
			</h2>
			<div className="text-lg text-white text-center">{children}</div>
		</div>
	);
};

const InfoCards = () => {
	return (
		<div className="w-9/12 mx-auto mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			<InfoCard iconClass="fas fa-eye" title="Our Vision">
				For our Consumers: We envision providing sustainable energy
				solutions across Africa. For our Team: Being the most
				knowledgeable experts in renewable energy, lighting, and
				electrical solutions.
			</InfoCard>

			<InfoCard iconClass="fas fa-bullseye" title="Our Mission">
				To provide sustainable and renewable energy solutions that
				impact positively in people’s lives.
			</InfoCard>

			<InfoCard iconClass="fas fa-handshake" title="Our Values">
				<ul className="list-disc inline-block text-left">
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
						collaborative, and individuals with diverse backgrounds
						and talents.
					</li>
				</ul>
			</InfoCard>
		</div>
	);
};

export default InfoCards;
