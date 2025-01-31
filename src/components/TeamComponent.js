import { useEffect, useState } from 'react';
import teamMember1 from './../assets/team_1.jpg'; // Example Image 1
import teamMember2 from './../assets/team_2.jpeg'; // Example Image 2
import teamMember3 from './../assets/team_3.jpeg'; // Example Image 3
import teamMember4 from './../assets/team_4.jpeg'; // Example Image 4

const teamMembers = [
	{
		image: teamMember4,
		name: 'Mr Chasara',
		title: 'Managing Director ',
		description:
			'Mr Chasara has been in the distribution industry for more than 15 years in the Marketing sector. He started as a sales representative in 2008 after obtaining a Diploma with IMM in 2006. He gained vast experience from then until he founded Stadic Distributors which mainly distributes Petroleum Products throughout the country. His success at the helm of Stadic Distributors inspired him to start Aurora Energy as his vision is in developing a comprehensive energy organization that powers Africa.',
	},
	{
		image: teamMember1,
		name: 'Rumbidzayi Masiyambiri',
		title: 'Sales & Marketing',
		description:
			'Rumbidzayi Masiyambiri serves as the face of our company. She creates an overarching image that represents our company in a positive light with vast experience in Customer Service, Sales and Marketing. Rumbidzayi has been in the Renewable Energy Industry for quite a long time. A wife, a mother and a sister who holds a Bachelor’s (Hons) Degree in Business Management and Entrepreneurship. She is also currently doing her Master of Business Administration (MBA).',
	},
	{
		image: teamMember2,
		name: 'Kudzai Rusike',
		title: 'Administration',
		description:
			'Kudzai Rusike manages the administration of Aurora energy, with experience in areas of administration, human resource development and industrial relations. She is highly equipped with Customer experience and employee wellness. She is committed towards building outstanding workplaces which are results driven and aims at transforming and building organizational cultures for sustainability and growth. She is responsible for ensuring smooth operations of Aurora energy and remains keen on upholding the organization’s mission and vision and adhering to its set standards.',
	},
	{
		image: teamMember3,
		name: 'Mr Kanyenze',
		title: 'Business Development Director',
		description:
			'An entrepreneur at heart Oyako has over 10 years in the Renewable Energy Sector. He is the Business Development Director and brings a wealth of experience in CRM, developing new business opportunities, building and expanding the presence of the Company and its brand He has worked in diverse sectors including banking and finance where he learnt the importance of building a trustworthy brand. An avid sports fan he enjoys an active lifestyle.',
	},
];

export default function Team() {
	const [inView, setInView] = useState(false);

	// Set up an observer to detect when the section is in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setInView(true);
					}
				});
			},
			{ threshold: 0.5 },
		);

		const section = document.querySelector('.team-container');
		if (section) observer.observe(section);

		return () => {
			if (section) observer.unobserve(section);
		};
	}, []);

	return (
		<section className="container mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8">
				Meet Our Team
			</h2>
			<div className="space-y-8">
				{teamMembers.map((member, index) => (
					<div
						key={index}
						className={`team-container flex items-center space-x-6 transition-transform duration-1000 w-full transform ${
							inView
								? 'translate-x-0 opacity-100'
								: 'translate-x-10 opacity-0'
						}`}
						style={{ transitionDelay: `${index * 300}ms` }}
					>
						{/* Employee Image */}
						<div className="w-[45%] h-full rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-orange-500">
							<img
								src={member.image}
								alt={member.name}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Employee Info */}
						<div className="text-left w-full sm:w-2/3">
							<h3 className="text-xl font-semibold">
								{member.name}
							</h3>
							<p className="text-md text-gray-600">
								{member.title}
							</p>
							<p className="text-lg text-gray-700 mt-2">
								{member.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
