import { useEffect, useRef, useState } from 'react';
import {
	FaFacebookF,
	FaXTwitter,
	FaInstagram,
	FaLinkedin,
	FaPhone,
	FaEnvelope,
	FaWhatsapp,
	FaMapPin,
} from 'react-icons/fa6';
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
			{ threshold: 0.5 },
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
			className={`bg-gradient-to-r from-white to-navy-900 text-white py-10 mt-6 transition-all duration-1000 ease-out transform ${
				isInView
					? 'translate-y-0 opacity-100'
					: 'translate-y-10 opacity-0'
			}`}
		>
			<div className="container mx-auto px-4">
				{/* Outer grid: 12 columns on medium/large screens */}
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
					{/* Cards container spanning 10 columns on medium/large screens */}
					<div className="md:col-span-10">
						{/* Inner grid for cards: 1 column on mobile, 3 columns on medium and up */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							{/* WhatsApp Card */}
							<a
								className="p-8 bg-black/40 rounded-lg shadow-lg text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl"
								href="https://wa.me/263771683662"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div>
									<FaWhatsapp
										size={40}
										className="mx-auto text-white mb-3 transition-all duration-300 hover:text-orange-500"
									/>
									<p className="text-lg">+263 771 683 662</p>
								</div>
							</a>

							{/* Email Card */}
							<div className="p-8 bg-black/40 rounded-lg shadow-lg text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl">
								<FaEnvelope
									size={40}
									className="mx-auto text-white mb-3 transition-all duration-300 hover:text-orange-500"
								/>
								<a
									href="mailto:info@auroraenergy.co.zw"
									target="_blank"
									className="text-lg"
								>
									info@auroraenergy.co.zw
								</a>
								<p>
									<a
										href="mailto:sales@auroraenergy.co.zw"
										target="_blank"
										className="text-lg"
									>
										sales@auroraenergy.co.zw
									</a>
								</p>
							</div>

							{/* Address Card */}
							<div className="p-8 bg-black/40 rounded-lg shadow-lg text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl">
								<FaMapPin
									size={40}
									className="mx-auto text-white mb-3 transition-all duration-300 hover:text-orange-500"
								/>
								<p className="text-lg">
									1 College Road, Alexandra Park, Harare,
									Zimbabwe
								</p>
							</div>

							{/* Google Maps Embed Card */}
							<div className="bg-black/40 rounded-lg shadow-lg text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.0558102848736!2d31.060250176397574!3d-17.789073975229652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a544a54048a5%3A0xbdd15d3dd3ecc8d3!2s1%20College%20Rd%2C%20Harare%2C%20Zimbabwe!5e0!3m2!1sen!2suk!4v1738663720400!5m2!1sen!2suk"
									width="100%"
									height="auto"
									frameBorder="0"
									style={{
										border: 0,
										borderRadius: '5px',
										height: '100%',
									}}
									allowFullScreen=""
									aria-hidden="false"
									tabIndex="0"
								/>
							</div>
						</div>
					</div>

					{/* Social Links Sidebar spanning 2 columns on medium/large screens */}
					<div className="md:col-span-2 flex items-center justify-center">
						{/* 
              On mobile, display links in a row with space between them.
              On medium and up, display links in a column.
            */}
						<div className="flex flex-row space-x-4 md:flex-col md:space-y-4 md:space-x-0">
							<a
								href="https://www.facebook.com/share/15imcziZ2b/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
							>
								<FaFacebookF />
							</a>
							<a
								href="https://x.com/AuroraEnergyZW?s=09"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
							>
								<FaXTwitter />
							</a>
							<a
								href="https://www.instagram.com/auroraenergyzimbabwe?igsh=MXNpOTFvZnRubTljcQ=="
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
							>
								<FaInstagram />
							</a>
							<a
								href="https://www.linkedin.com/company/aurora-energy1/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
							>
								<FaLinkedin />
							</a>
						</div>
					</div>
				</div>

				<hr className="mt-6 bg-gradient-to-r from-navy-900 to-white" />
				<div className="mt-2 text-sm text-gray-300 text-center">
					&copy; {new Date().getFullYear()} Aurora Energy. Powered by
					ZHD Consulting.
				</div>
			</div>
		</footer>
	);
}
