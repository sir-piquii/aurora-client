import React, { useState, useEffect } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';
import signUpImg from './../assets/sign-up.jpg';

/**
 * SignUp component renders a user registration form with fields for full name, username, email, password, and confirm password.
 * Handles form state, validation, error display, and submission logic.
 * On successful registration, navigates to the verification page.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered sign up form component.
 *
 * @example
 * // Usage in a React Router route
 * <Route path="/signup" element={<SignUp />} />
 *
 * @function
 *
 * @typedef {Object} SignupData
 * @property {string} fullName - The user's full name.
 * @property {string} username - The user's chosen username.
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 *
 * @state {SignupData} signupData - State for storing form input values.
 * @state {string} confirmPassword - State for storing the confirm password input.
 * @state {string} error - State for storing error messages.
 * @state {boolean} isSubmitting - State indicating if the form is being submitted.
 *
 * @callback handleChange
 * Handles changes to form input fields and updates the corresponding state.
 *
 * @callback handleConfirmPasswordChange
 * Handles changes to the confirm password input field.
 *
 * @callback handleSubmit
 * Handles form submission, validates input, and calls the registerUser API.
 *
 * @effect
 * Sets the document title to "Sign Up | Aurora" on component mount.
 */
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
		setIsSubmitting(true);

		try {
			if (signupData.password !== confirmPassword) {
				throw new Error('Passwords do not match.');
			}

			if (signupData.password.length < 6) {
				throw new Error('Password must be at least 6 characters long.');
			}

			const response = await registerUser(signupData);

			if (response.message !== 'Success!') {
				throw new Error(
					response.errorMessage || 'Registration failed.',
				);
			}

			// Redirect on success
			navigate('/verification');
		} catch (err) {
			setError(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		document.title = 'Sign Up | Aurora';
	}, []);

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
			<div className="w-full h-24 flex items-center justify-center text-navy-900">
				<h1 className="text-5xl font-bold">Sign Up</h1>
			</div>

			{/* Form container with background image */}
			<div className="w-full md:w-8/12 mx-auto px-4 mt-6">
				<div
					className="p-8 rounded-lg shadow-lg bg-cover bg-center"
					style={{ backgroundImage: `url(${signUpImg})` }}
				>
					<h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
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
								className="block text-lg font-medium text-navy-900"
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
								className="block text-lg font-medium text-navy-900"
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
								className="block text-lg font-medium text-navy-900"
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
								className="block text-lg font-medium text-navy-900"
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
								className="block text-lg font-medium text-navy-900"
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
									: 'bg-gradient-to-r from-navy-900 to-orange-500 text-white hover:text-orange-300'
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
