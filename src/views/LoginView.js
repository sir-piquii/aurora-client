import React, { useState, useEffect } from 'react';

export default function Login() {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});
	const [error, setError] = useState('');
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [resetEmail, setResetEmail] = useState('');
	const [resetMessage, setResetMessage] = useState('');

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setLoginData({
			...loginData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(''); // Reset any previous error

		try {
			// Simulated API error: If password is less than 6 characters, throw an error.
			if (loginData.password.length < 6) {
				throw new Error('Password must be at least 6 characters long.');
			}
			console.log('Login data:', loginData);
			// Proceed with further login logic here
		} catch (err) {
			setError(err.message);
		}
	};

	const handleForgotPasswordSubmit = async (e) => {
		e.preventDefault();
		if (!resetEmail) {
			setResetMessage('Please enter your email address.');
			return;
		}
		// Simulate an API call to send the password reset link
		setTimeout(() => {
			setResetMessage(
				`A password reset link has been sent to ${resetEmail}.`,
			);
		}, 500);
	};

	useEffect(() => {
		document.title = 'Login | Aurora';
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			{/* Navy Header/Banner */}
			<div className="w-full h-24 flex items-center justify-center text-navy-900">
				<h1 className="text-5xl font-bold">Login</h1>
			</div>

			{/* Login Form Card */}
			<div className="w-8/12 mx-auto px-4 mt-6">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2
						className="text-2xl font-bold mb-6 text-center"
						style={{ color: '#001f3f' }}
					>
						{showForgotPassword ? 'Reset Password' : 'Welcome Back'}
					</h2>

					{/* Error Message */}
					{error && (
						<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
							{error}
						</div>
					)}

					{showForgotPassword ? (
						// Forgot Password Form
						<form
							onSubmit={handleForgotPasswordSubmit}
							className="space-y-6"
						>
							<div>
								<label
									htmlFor="resetEmail"
									className="block text-lg font-medium text-gray-700"
								>
									Enter your email address
								</label>
								<input
									type="email"
									id="resetEmail"
									name="resetEmail"
									value={resetEmail}
									onChange={(e) =>
										setResetEmail(e.target.value)
									}
									placeholder="Enter your email"
									className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
								/>
							</div>
							{resetMessage && (
								<div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
									{resetMessage}
								</div>
							)}
							<div className="flex justify-between items-center">
								<button
									type="submit"
									className="bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-600 transition-all"
								>
									Reset Password
								</button>
								<button
									type="button"
									onClick={() => {
										setShowForgotPassword(false);
										setResetMessage('');
									}}
									className="text-blue-500 hover:underline"
								>
									Back to Login
								</button>
							</div>
						</form>
					) : (
						// Login Form
						<form onSubmit={handleSubmit} className="space-y-6">
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
									value={loginData.email}
									onChange={handleChange}
									placeholder="Enter your email"
									className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
								/>
							</div>

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
									value={loginData.password}
									onChange={handleChange}
									placeholder="Enter your password"
									className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
								/>
							</div>

							{/* Remember Me Checkbox */}
							<div className="flex items-center">
								<input
									type="checkbox"
									id="rememberMe"
									name="rememberMe"
									checked={loginData.rememberMe}
									onChange={handleChange}
									className="mr-2"
								/>
								<label
									htmlFor="rememberMe"
									className="text-gray-700"
								>
									Remember Me
								</label>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="w-full bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-600 transition-all"
							>
								Login
							</button>

							{/* Forgot Password Link */}
							<div className="text-right mt-2">
								<button
									type="button"
									onClick={() => setShowForgotPassword(true)}
									className="text-gray-500 hover:underline hover:text-gray-700"
								>
									Forgot Password?
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
