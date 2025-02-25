import React, { useState, useEffect } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
	const navigate = useNavigate();
	const [signupData, setSignupData] = useState({
		fullName: '',
		username: '',
		email: '',
		password: '',
	});
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignupData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsSubmitting(true); // Disable button while submitting

		try {
			if (signupData.password !== confirmPassword) {
				throw new Error('Passwords do not match.');
			}

			if (signupData.password.length < 6) {
				throw new Error('Password must be at least 6 characters long.');
			}

			const response = await registerUser(signupData);

			console.log('Registration successful:', response);

			if (!response.ok) {
				throw new Error(
					response.errorMessage || 'Registration failed.',
				);
			}

			// Redirect on success
			navigate('/verification');
		} catch (err) {
			setError(err.message);
		} finally {
			setIsSubmitting(false); // Enable button after response
		}
	};

	useEffect(() => {
		document.title = 'Sign Up | Aurora';
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="w-full h-24 flex items-center justify-center text-navy-900">
				<h1 className="text-5xl font-bold">Sign Up</h1>
			</div>

			{/* Updated container: full width on mobile, 8/12 on medium and larger screens */}
			<div className="w-full md:w-8/12 mx-auto px-4 mt-6">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2
						className="text-2xl font-bold mb-6 text-center"
						style={{ color: '#001f3f' }}
					>
						Create Your Account
					</h2>

					{error && (
						<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
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

						<button
							type="submit"
							disabled={isSubmitting}
							className={`w-full py-3 px-6 rounded-full transition-all ${
								isSubmitting
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-orange-500 hover:bg-orange-600 text-white'
							}`}
						>
							{isSubmitting ? 'Signing Up...' : 'Sign Up'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
