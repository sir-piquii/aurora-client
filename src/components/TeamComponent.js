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
			"Mr. Chasara, a pioneering force in the energy sector, boasts over 15 years of experience in marketing and distribution. Starting as a sales representative in 2008, he founded Stadic Distributors, specializing in petroleum product distribution. His vision for a comprehensive energy organization led to the establishment of Aurora Energy, aiming to power Africa through growth, innovation, and sustainability. Under his leadership, Aurora Energy is poised to revolutionize Africa's energy landscape.",
	},
	{
		id: 2,
		image: teamMember2,
		name: 'Kudzai Rusike',
		title: 'Human Resource Manager',
		description:
			"Kudzai, Human Resources Manager at Aurora Energy, drives workplace culture and business results. She's passionate about building high-performing teams and dedicated to transforming organizational cultures and upholding Aurora Energy's mission and standards. With an Honors Degree in Local Governance Studies, Kudzai brings unique expertise to drive HR strategies supporting Aurora Energy's success.",
	},
	{
		id: 3,
		image: teamMember1,
		name: 'Shaziah Shahadat',
		title: 'Administrator/Front-desk',
		description:
			"Shaziah, our customer service representative and administrator, extends a warm welcome to our valued clients. With over 4 years of experience in customer-facing and administrative roles, she possesses a unique blend of skills. Her infectious smile and exceptional organizational and communication skills create a lasting impression. Shaziah holds a Bachelor's Honours degree in Political Administration.",
	},
	{
		id: 4,
		image: teamMember1,
		name: 'Rumbidzayi Masiyambiri',
		title: 'Sales & Marketing Manager',
		description:
			"Rumbidzayi embodies our values, creating a lasting impression that reflects our mission. With a diverse background, she possesses exceptional interpersonal skills, understanding client needs and market trends. Her approach is marked by vitality, professionalism, warmth, and a service-oriented mindset. A seasoned Renewable Energy expert with 5+ years of experience, Rumbidzayi holds an MBA from NUST and a Bachelor's (Hons) Degree in Business Management from CUT. Her unique blend of expertise, passion, and dedication makes her an invaluable asset.",
	},
	{
		id: 5,
		image: teamMember1,
		name: 'Fungai L Muparabasa',
		title: 'Chief Technical Officer',
		description:
			'Fungai, our Technical Head, brings extensive expertise as a licensed Class 1 Electrician. With 5+ years of experience in electrical equipment installation, commissioning, and maintenance, her proficiency spans energy and hospitality. At our company, Fungai focuses on corrective and preventative solar maintenance and delivering exceptional customer service. A visionary thinker, Fungai combines technical expertise with a philosophical outlook, making her an invaluable asset.',
	},
	{
		id: 6,
		image: teamMember1,
		name: 'Cleopatra Sakawenga',
		title: 'Procurement Manager',
		description:
			'Cleopatra, our results-driven Procurement Officer, achieves operational excellence with her expertise. Holding a Diploma in Purchasing and Supply Management and pursuing CIPS certification, she excels in sourcing and qualifying top suppliers, building strategic relationships, negotiating contracts for optimal value and managing inventory and streamlining processes. Cleopatra balances cost optimization with product quality, ensuring timely delivery and exceeding expectations.',
	},
	{
		id: 7,
		image: teamMember1,
		name: 'Chelsea Ngorima',
		title: 'Accountant',
		description:
			"Chelsea, our dedicated accountant, brings expertise to our financial management. Pursuing ACCA qualification, she has extensive experience in taxation and compliance, financial planning and strategy and auditing and financial analysis. Holding a Bachelor's Honours Degree from Oxford Brookes University and diplomas in Accounting and Business, Chelsea ensures our company's finances are in safe and capable hands.",
	},
];

export default function Team() {
	// Separate the first team member from the rest.
	const [firstMember, ...restMembers] = teamMembers;

	return (
		<section className="container mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8">
				Meet Our Team
			</h2>

			{/* First row: centered card for the first team member */}
			<div className="flex justify-center mb-8  mx-auto">
				<div className="w-[24rem]">
					<div className="relative group overflow-hidden rounded-lg shadow-lg h-[24rem]">
						<img
							src={firstMember.image}
							alt={firstMember.name}
							className="w-[24rem] h-[24rem] object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-500 flex items-center justify-center transform -translate-x-full group-hover:translate-x-0">
							<div className="p-4 text-white text-center">
								<h3 className="text-xl font-semibold">
									{firstMember.name}
								</h3>
								<p className="text-md">{firstMember.title}</p>
								<p className="text-sm mt-2">
									{firstMember.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Second section: remaining team members in a responsive grid */}
			<div className="w-9/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
				{restMembers.map((member) => (
					<div
						key={member.id}
						className="relative group overflow-hidden rounded-lg shadow-lg h-[24rem]"
					>
						<img
							src={member.image}
							alt={member.name}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
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
