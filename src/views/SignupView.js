import React, { useState, useEffect } from 'react';
import { registerUser } from '../api';

export default function SignUp() {
	// Only include the fields you want to send to the API
	const [signupData, setSignupData] = useState({
		fullName: '',
		username: '',
		email: '',
		password: '',
	});
	// Store confirm password separately
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignupData({
			...signupData,
			[name]: value,
		});
	};

	// New file change handler
	const handleFileChange = (e) => {
		// Set the first selected file (if any) to the filename field
		setSignupData({
			...signupData,
		});
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(''); // Reset any previous error

		try {
			// Check if the passwords match
			if (signupData.password !== confirmPassword) {
				throw new Error('Passwords do not match.');
			}

			// Simulated API error: If password is less than 6 characters, throw an error.
			if (signupData.password.length < 6) {
				throw new Error('Password must be at least 6 characters long.');
			}

			// Simulate an API call here.
			// Only signupData (without confirmPassword) is sent to the API
			const response = await registerUser(signupData);
			if (!response.ok) throw new Error(response.errorMessage);

			console.log('Sign-up data:', signupData);
		} catch (err) {
			// Handle errors from the API or client-side validations
			setError(err.message);
		}
	};

	useEffect(() => {
		document.title = 'Sign Up | Aurora';
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			{/* Navy Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center text-navy-900">
				<h1 className="text-5xl font-bold">Sign Up</h1>
			</div>

			{/* Sign-Up Form Card */}
			<div className="w-8/12 mx-auto px-4 mt-6">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2
						className="text-2xl font-bold mb-6 text-center"
						style={{ color: '#001f3f' }}
					>
						Create Your Account
					</h2>

					{/* Error Message */}
					{error && (
						<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name Input */}
						<div>
							<label
								htmlFor="name"
								className="block text-lg font-medium text-gray-700"
							>
								Full Name
							</label>
							<input
								type="text"
								id="name"
								name="fullName"
								value={signupData.fullName}
								onChange={handleChange}
								placeholder="Enter your full name"
								className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
							/>
						</div>

						{/* Username Input */}
						<div>
							<label
								htmlFor="username"
								className="block text-lg font-medium text-gray-700"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={signupData.username}
								onChange={handleChange}
								placeholder="Choose a username"
								className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
							/>
						</div>

						{/* Email Input */}
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
								value={signupData.email}
								onChange={handleChange}
								placeholder="Enter your email"
								className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
							/>
						</div>

						{/* File Upload Input */}
						{/* <div>
							<label
								htmlFor="fileUpload"
								className="block text-lg font-medium text-gray-700"
							>
								Upload File
							</label>
							<input
								type="file"
								id="fileUpload"
								name="filename"
								onChange={handleFileChange}
								className="w-full py-2 px-4 border border-gray-300 rounded-full focus:border-orange-500 focus:outline-none transition-all"
							/>
						</div> */}

						{/* Password Input */}
						<div>
							<label
								htmlFor="password"
								className="block text-lg font-medium text-gray-700"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={signupData.password}
								onChange={handleChange}
								placeholder="Enter your password"
								className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
							/>
						</div>

						{/* Confirm Password Input */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-lg font-medium text-gray-700"
							>
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
								placeholder="Confirm your password"
								className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-600 transition-all"
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
