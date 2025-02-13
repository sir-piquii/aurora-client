import React, { useState, useEffect } from 'react';
import contactBanner from './../assets/contact_banner.jpg';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phoneNumber: '',
		notes: '',
		checkbox1: false,
		checkbox2: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic
		console.log(formData);
	};

	useEffect(() => {
		document.title = 'Contact Us | Aurora';
		const inputs = document.querySelectorAll('.input-field');
		inputs.forEach((input) => input.classList.add('input-animation'));
	}, []);

	return (
		<div>
			<div className="max-w-7xl mx-auto my-12 px-4">
				{/* Two-column layout: Left for contact details, right for form */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Left Column: Contact Details Card */}
					<div className="bg-navy-900 text-white p-8 rounded-lg shadow-lg">
						<h2 className="text-2xl font-bold mb-6">
							Contact Details
						</h2>
						<div className="flex items-center">
							<FaMapMarkerAlt
								className="text-orange-500 mr-4"
								size={24}
							/>
							<div>
								<p className="font-semibold">Address</p>
								<p className="hover:text-orange-300 transition">
									1 College Road, Alexandra Park, Harare,
									Zimbabwe
								</p>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<FaEnvelope
								className="text-orange-500 mr-4"
								size={24}
							/>
							<div>
								<p className="font-semibold">Email</p>
								<a
									href="mailto:info@example.com"
									className="hover:text-orange-300 transition"
								>
									info@auroraenergy.co.zw
								</a>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<FaEnvelope
								className="text-orange-500 mr-4"
								size={24}
							/>
							<div>
								<p className="font-semibold">Email</p>
								<a
									href="mailto:info@example.com"
									className="hover:text-orange-300 transition"
								>
									info@auroraenergy.co.zw
								</a>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<FaPhone
								className="text-orange-500 mr-4"
								size={24}
							/>
							<div>
								<p className="font-semibold">
									Sales & Marketing
								</p>
								<a
									href="tel:+263 779 576 966"
									className="hover:text-orange-300 transition"
								>
									+263 779 576 966
								</a>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<FaPhone
								className="text-orange-500 mr-4"
								size={24}
							/>
							<div>
								<p className="font-semibold">Landline/Admin:</p>
								<a
									href="tel:+263 242 783 999"
									className="hover:text-orange-300 transition"
								>
									+263 242 783 999
								</a>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<FaPhone
								className="text-orange-500 mr-4"
								size={24}
							/>
							<div>
								<p className="font-semibold">
									Office Whatsapp/Call
								</p>
								<a
									href="tel:+263 771 683 662"
									className="hover:text-orange-300 transition"
								>
									+263 771 683 662
								</a>
							</div>
						</div>
						<div className="flex items-center mb-4">
							<FaPhone
								className="text-orange-500 mr-4"
								size={24}
							/>
							<div>
								<p className="font-semibold">Procurement</p>
								<a
									href="tel:+263 784 754 062"
									className="hover:text-orange-300 transition"
								>
									+263 784 754 062
								</a>
							</div>
						</div>
					</div>

					{/* Right Column: Contact Form Card */}
					<div className="bg-white p-8 rounded-lg shadow-lg">
						<h2 className="text-2xl font-bold mb-6">
							Get in Touch
						</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Full Name & Email */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="fullName"
										className="block text-lg font-medium text-gray-700"
									>
										Full Name
									</label>
									<input
										type="text"
										id="fullName"
										name="fullName"
										value={formData.fullName}
										onChange={handleChange}
										className="input-field w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
										placeholder="Your full name"
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-lg font-medium text-gray-700"
									>
										Email Address
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="input-field w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
										placeholder="Your email address"
									/>
								</div>
							</div>

							{/* Phone Number */}
							<div>
								<label
									htmlFor="phoneNumber"
									className="block text-lg font-medium text-gray-700"
								>
									Phone Number
								</label>
								<input
									type="tel"
									id="phoneNumber"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									className="input-field w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
									placeholder="Your phone number"
								/>
							</div>

							{/* Additional Notes */}
							<div>
								<label
									htmlFor="notes"
									className="block text-lg font-medium text-gray-700"
								>
									Additional Notes
								</label>
								<textarea
									id="notes"
									name="notes"
									value={formData.notes}
									onChange={handleChange}
									className="input-field w-full py-2 px-4 rounded-md border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
									placeholder="Your message"
									rows="4"
								></textarea>
							</div>

							{/* Checkboxes */}
							<div className="space-y-4">
								<label className="block text-sm font-medium text-gray-500">
									Services
								</label>
								<div className="flex items-center">
									<input
										type="checkbox"
										id="checkbox1"
										name="checkbox1"
										checked={formData.checkbox1}
										onChange={handleChange}
										className="mr-2"
									/>
									<label
										htmlFor="checkbox1"
										className="text-sm text-gray-700"
									>
										Request a Quotation
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										id="checkbox2"
										name="checkbox2"
										checked={formData.checkbox2}
										onChange={handleChange}
										className="mr-2"
									/>
									<label
										htmlFor="checkbox2"
										className="text-sm text-gray-700"
									>
										Request a Consultation
									</label>
								</div>
							</div>

							<button
								type="submit"
								className="bg-orange-500 text-white py-3 px-6 mt-6 rounded-full w-full hover:bg-orange-600 transition-all"
							>
								Send Message
							</button>
						</form>
					</div>
				</div>

				{/* Full-Width Card: Satellite Map */}
				<div className="mt-12">
					<div className="bg-white p-4 rounded-lg shadow-lg">
						<iframe
							title="Satellite Map"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.0558102848736!2d31.060250176397574!3d-17.789073975229652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a544a54048a5%3A0xbdd15d3dd3ecc8d3!2s1%20College%20Rd%2C%20Harare%2C%20Zimbabwe!5e0!3m2!1sen!2suk!4v1738663720400!5m2!1sen!2suk"
							width="100%"
							height="450"
							frameBorder="0"
							style={{ border: 0 }}
							allowFullScreen=""
							aria-hidden="false"
							tabIndex="0"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
}
