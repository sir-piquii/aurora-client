import { useEffect, useRef, useState } from 'react';
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
} from 'react-icons/fa';
import { Briefcase, Code, Users, Globe } from 'lucide-react';
import Logo from './../logo.png';

export default function Footer() {
	const footerRef = useRef(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
				}
			},
			{
				threshold: 0.5, // Trigger when 50% of the element is in view
			},
		);

		if (footerRef.current) {
			observer.observe(footerRef.current);
		}

		return () => {
			if (footerRef.current) {
				observer.unobserve(footerRef.current);
			}
		};
	}, []);

	return (
		<footer
			ref={footerRef}
			className={`bg-navy-900 text-white py-10 mt-6 transition-all duration-1000 ease-out transform ${
				isInView
					? 'translate-y-0 opacity-100'
					: 'translate-y-10 opacity-0'
			}`}
		>
			<div className="container mx-auto px-4 text-center">
				<img
					src={Logo}
					alt="Logo"
					className="mx-auto mb-6"
					style={{ width: '200px' }}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="p-6 bg-navy-800 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:glow-effect">
						<Briefcase
							size={40}
							className="mx-auto text-orange-500 mb-3"
						/>
						<p>Business Solutions</p>
					</div>
					<div className="p-6 bg-navy-800 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:glow-effect">
						<Code
							size={40}
							className="mx-auto text-orange-500 mb-3"
						/>
						<p>Development Services</p>
					</div>
					<div className="p-6 bg-navy-800 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:glow-effect">
						<Users
							size={40}
							className="mx-auto text-orange-500 mb-3"
						/>
						<p>Community Engagement</p>
					</div>
					<div className="p-6 bg-navy-800 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl hover:glow-effect">
						<Globe
							size={40}
							className="mx-auto text-orange-500 mb-3"
						/>
						<p>Global Reach</p>
					</div>
				</div>

				<div className="flex justify-center space-x-6 text-lg">
					<a href="#" className="hover:text-orange-500">
						<FaFacebookF />
					</a>
					<a href="#" className="hover:text-orange-500">
						<FaTwitter />
					</a>
					<a href="#" className="hover:text-orange-500">
						<FaInstagram />
					</a>
					<a href="#" className="hover:text-orange-500">
						<FaLinkedin />
					</a>
				</div>
			</div>
		</footer>
	);
}
