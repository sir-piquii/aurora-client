import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../api';

/**
 * ForgottenPassword React component renders a password reset form.
 *
 * Allows users to request a password reset by entering their registered email address.
 * Validates the email input, displays error or success messages, and triggers the password reset process.
 * On successful request, notifies the user and redirects to the login page after a delay.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered password reset form UI.
 *
 * @example
 * // Usage in a React Router route
 * <Route path="/forgot-password" element={<ForgottenPassword />} />
 */
function ForgottenPassword() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Forgot Password | Aurora';
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setMessage('');

		if (!email || !email.includes('@')) {
			setError('Please enter a valid email address.');
			return;
		}

		try {
			await forgotPassword(email);
			setMessage(
				'Password reset instructions sent. Please check your email.',
			);
			setTimeout(() => navigate('/login'), 5000); // redirect after 5 seconds
		} catch (err) {
			setError(err.message || 'Failed to send reset email.');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4">
			<h1 className="text-3xl font-bold mb-6 text-navy-900">
				Forgot Your Password?
			</h1>

			<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
				{error && (
					<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}

				{message && (
					<div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
						{message}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your registered email"
							className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-gradient-to-r from-navy-900 to-orange-500 text-white px-6 py-3 rounded-full hover:text-orange-300 transition-all"
					>
						Send Reset Link
					</button>
				</form>
			</div>
		</div>
	);
}

export default ForgottenPassword;
