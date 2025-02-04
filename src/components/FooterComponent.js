import { useEffect, useRef, useState } from 'react';
import {
	FaFacebookF,
	FaXTwitter,
	FaInstagram,
	FaLinkedin,
	FaPhone,
	FaEnvelope,
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
			{
				threshold: 0.5,
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
			className={`bg-black/40 text-white py-10 mt-6 transition-all duration-1000 ease-out transform ${
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
					<div className="p-8 bg-black/40 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-xl">
						<FaPhone
							size={40}
							className="mx-auto text-white mb-3 transition-all duration-300 hover:text-orange-500"
						/>
						<p className="text-lg">+263 779 576 966</p>
					</div>
					<div className="p-8 bg-black/40 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-xl">
						<FaEnvelope
							size={40}
							className="mx-auto text-white mb-3 transition-all duration-300 hover:text-orange-500"
						/>
						<p className="text-lg">info@auroraenergy.co.zw</p>
					</div>
					<div className="p-8 bg-black/40 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-xl">
						<FaEnvelope
							size={40}
							className="mx-auto text-white mb-3 transition-all duration-300 hover:text-orange-500"
						/>
						<p className="text-lg">sales@auroraenergy.co.zw</p>
					</div>
					<div className="bg-black/40 rounded-lg shadow-lg border border-gray-300 text-center transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-xl">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.0558102848736!2d31.060250176397574!3d-17.789073975229652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a544a54048a5%3A0xbdd15d3dd3ecc8d3!2s1%20College%20Rd%2C%20Harare%2C%20Zimbabwe!5e0!3m2!1sen!2suk!4v1738663720400!5m2!1sen!2suk"
							width="100%"
							height="auto"
							frameBorder="0"
							style={{
								border: 0,
								borderRadius: '5px', // Adjust the value as needed for roundness
							}}
							allowFullScreen=""
							aria-hidden="false"
							tabIndex="0"
						/>
					</div>
				</div>

				<div className="flex justify-center space-x-6 text-lg">
					<a
						href="#"
						className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
					>
						<FaFacebookF />
					</a>
					<a
						href="#"
						className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
					>
						<FaXTwitter />
					</a>
					<a
						href="#"
						className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
					>
						<FaInstagram />
					</a>
					<a
						href="#"
						className="hover:text-orange-500 transform hover:scale-110 transition-all duration-300"
					>
						<FaLinkedin />
					</a>
				</div>
			</div>
		</footer>
	);
}
