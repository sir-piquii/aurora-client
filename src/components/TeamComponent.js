import teamMember1 from './../assets/team_1.jpg';
import teamMember2 from './../assets/team_2.jpeg';
import teamMember3 from './../assets/team_3.jpeg';
import teamMember4 from './../assets/team_4.jpeg';

const teamMembers = [
	{
		id: 1,
		image: teamMember4,
		name: 'Mr Dennis Chasara',
		title: 'Managing Director',
		description:
			"With over 15 years of experience in the marketing and distribution industry, Mr. Chasara has established himself as a pioneering force in the energy sector. His professional journey began in 2008 as a sales representative, following the completion of his Diploma in Marketing with the Institute of Marketing Management (IMM) in 2006. Through dedication and perseverance, Mr. Chasara amassed extensive expertise, ultimately leading to the founding of Stadic Distributors. As the driving force behind Stadic Distributors, Mr. Chasara successfully expanded the company's reach, specializing in the nationwide distribution of petroleum products. Building on this success, Mr. Chasara's vision for a comprehensive energy organization led to the establishment of Aurora Energy. His mission is to power Africa, fostering growth, innovation, and sustainability across the continent. Under Mr. Chasara's visionary leadership, Aurora Energy is poised to revolutionize the energy landscape, driving progress and transformation throughout Africa.",
	},
	{
		id: 2,
		image: teamMember3,
		name: 'Mr Oyako Kanyenze',
		title: 'Business Development Director',
		description:
			"As a seasoned entrepreneur and Business Development Director, Oyako brings over 12 years of expertise in the Renewable Energy Sector. His diverse professional background, spanning the banking and finance industries, has equipped him with a unique understanding of the importance of building a trustworthy brand. Oyako's key strengths include: developing and implementing effective CRM strategies, identifying and capitalizing on new business opportunities and expanding the presence and reputation of the company and its brand. Through his extensive experience and entrepreneurial spirit, Oyako plays a pivotal role in driving growth, innovation, and success in the renewable energy sector.",
	},
	{
		id: 3,
		image: teamMember2,
		name: 'Kudzai Rusike',
		title: 'Human Resource Manager',
		description:
			"As the Human Resources Manager at Aurora Energy, Kudzai plays a pivotal role in shaping the organization's workplace culture and driving business results. With a strong passion for building high-performing teams, Kudzai is dedicated to: creating outstanding workplaces that foster growth and sustainability, transforming and building organizational cultures that drive results, upholding Aurora Energy's mission, vision, and standards and ensuring the welfare and well-being of employees. Holding an Honors Degree in Local Governance Studies, Kudzai brings a unique blend of expertise and knowledge to her role, driving HR strategies that support Aurora Energy's continued success.",
	},
	{
		id: 4,
		image: teamMember1,
		name: 'Shaziah Shahadat',
		title: 'Administrator/Front-desk',
		description:
			"As the face of our company, Shaziah extends a warm welcome to our valued clients, providing top-notch service and ensuring their needs are met. In addition to her role as a customer service representative, Shaziah also serves as our administrator. With over four years of experience in customer-facing and administrative roles, Shaziah possesses a unique blend of skills and expertise. Her infectious smile and radiant aura create a lasting impression, brightening the day of our clients. Shaziah holds a Bachelor's Honours degree in Political Administration, underscoring her exceptional organizational and communication skills.",
	},
	{
		id: 5,
		image: teamMember1,
		name: 'Rumbidzayi Masiyambiri',
		title: 'Sales & Marketing Manager',
		description:
			"Rumbidzayi embodies our values, crafting a positive and lasting impression that reflects our organization's mission. With a diverse professional background, Rumbidzayi possesses exceptional interpersonal skills, honed by her deep understanding of client needs and market trends. Her approach is characterized by: unbridled vitality and professionalism, warmth and empathy in every interaction and a service-oriented mindset, advocating for clients' best interests. A seasoned expert in the Renewable Energy Industry, with over five years of experience, Rumbidzayi holds impressive academic credentials: Master of Business Administration (MBA) from the National University of Science and Technology (NUST) and Bachelor's (Hons) Degree in Business Management and Entrepreneurship from the Chinhoyi University of Technology (CUT). Her unique blend of expertise, passion, and dedication makes her an invaluable asset to our team.",
	},
	{
		id: 6,
		image: teamMember1,
		name: 'Fungai L Muparabasa',
		title: 'Chief Technical Officer',
		description:
			"As our Technical Head, Fungai brings a wealth of expertise to the table, backed by her credentials as a licensed Class 1 Electrician. With over five years of experience in installing, commissioning, maintaining, inspecting, and repairing complex electrical equipment, Fungai's proficiency spans the energy and hospitality industries. At our company, Fungai plays a pivotal role in: corrective and preventative solar maintenance and delivering exceptional service to our valued customers. A visionary thinker, Fungai takes a holistic approach to life, focusing on the bigger picture and rising above trivialities. Her unique blend of technical expertise and philosophical outlook makes her an invaluable asset to our team.",
	},
	{
		id: 7,
		image: teamMember1,
		name: 'Cleopatra Sakawenga',
		title: 'Procurement Manager',
		description:
			'As a results-driven and detail-oriented Procurement Officer, Cleopatra leverages her expertise to drive operational excellence. She holds a Diploma in Purchasing and Supply Management and is currently pursuing a professional certification with the Chartered Institute of Procurement and Supply (CIPS). With a strong background in procurement, Cleopatra excels in: sourcing and qualifying top-tier suppliers, building and maintaining strategic supplier relationships, negotiating contracts to optimize value and managing inventory and streamlining procurement processes. Through her work, Cleopatra is committed to achieving a delicate balance between cost optimization and product quality, ensuring timely delivery and exceeding expectations.',
	},
	{
		id: 8,
		image: teamMember1,
		name: 'Chelsea Ngorima',
		title: 'Accountant',
		description:
			"As our dedicated accountant, Chelsea brings a wealth of expertise to our financial management. Currently advancing her ACCA qualification, Chelsea possesses extensive experience in: taxation and compliance, financial planning and strategy and auditing and financial analysis. Chelsea's impressive academic credentials include: Bachelor's Honours Degree from Oxford Brookes University, Advanced Diploma in Accounting and Business and Diploma in Accounting and Business. With Chelsea at the helm of our financial management, our company's books are indeed in safe and capable hands.",
	},
];

export default function Team() {
	return (
		<section className="container mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8">
				Meet Our Team
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{teamMembers.map((member) => (
					<div
						key={member.id}
						// The added h-96 sets a fixed height for the card. Adjust this value as needed.
						className="relative group overflow-hidden rounded-lg shadow-lg h-[36rem]"
					>
						{/* The team member's image */}
						<img
							src={member.image}
							alt={member.name}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>

						{/* Overlay with team member details */}
						<div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-500 flex items-center justify-center transform -translate-x-full group-hover:translate-x-0">
							<div className="p-4 text-white text-center">
								<h3 className="text-xl font-semibold">
									{member.name}
								</h3>
								<p className="text-md">{member.title}</p>
								<p className="text-sm mt-2">
									{member.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
