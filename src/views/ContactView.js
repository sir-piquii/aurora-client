import React, { useState, useEffect } from 'react';
import contactBanner from './../assets/contact_banner.jpg';

export default function ContactUs() {
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
		// Add animation class when component loads
		const inputs = document.querySelectorAll('.input-field');
		inputs.forEach((input) => input.classList.add('input-animation'));
	}, []);

	return (
		<div>
			{/* Form banner */}
			<div
				className="w-full h-64 md:h-80 flex items-center justify-center text-white"
				style={{
					backgroundImage: `url(${contactBanner})`,
					backgroundSize: 'cover',
					// backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				{/* Content */}
				<div className="relative text-center">
					{/* Title */}
					<h1 className="text-5xl md:text-6xl font-bold">Contact</h1>
					{/* Breadcrumb */}
					<p className="text-sm md:text-base text-gray-300 mb-2">
						<a
							href="/"
							className="hover:text-orange-500 transition"
						>
							Home
						</a>{' '}
						&gt; <span className="text-orange-500">Contact Us</span>
					</p>
				</div>
			</div>
			{/* Form elements */}
			<form
				onSubmit={handleSubmit}
				className="space-y-6 mt-6 max-w-4xl mx-auto"
			>
				{/* Full Name, Email, and Phone Number in the same row */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
							className="input-field w-full py-2 px-3 border-b-2 border-transparent focus:border-orange-500 focus:outline-none shadow-lg hover:shadow-xl transition-all"
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
							className="input-field w-full py-2 px-3 border-b-2 border-transparent focus:border-orange-500 focus:outline-none shadow-lg hover:shadow-xl transition-all"
							placeholder="Your email address"
						/>
					</div>
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
							className="input-field w-full py-2 px-3 border-b-2 border-transparent focus:border-orange-500 focus:outline-none shadow-lg hover:shadow-xl transition-all"
							placeholder="Your phone number"
						/>
					</div>
				</div>

				{/* Text Area for Additional Notes */}
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
						className="input-field w-full py-2 px-3 border-b-2 border-transparent focus:border-orange-500 focus:outline-none shadow-lg hover:shadow-xl transition-all"
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

				{/* Submit Button */}
				<button
					type="submit"
					className="bg-orange-500 text-white py-3 px-6 my-6 rounded-full w-full hover:bg-orange-600 transition-all"
				>
					Send Message
				</button>
			</form>
		</div>
	);
}
