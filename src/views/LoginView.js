import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authenticateUser } from '../api';
import loginImg from './../assets/login.jpg';

export default function Login() {
	const [loginData, setLoginData] = useState({
		identifier: '',
		password: '',
		rememberMe: false,
	});
	const [error, setError] = useState('');
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setLoginData({
			...loginData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			if (loginData.password.length < 6) {
				throw new Error('Password must be at least 6 characters long.');
			}

			const user = await authenticateUser(
				loginData.identifier,
				loginData.password,
			);

			login(user);
			if (user.user.role === 'admin') {
				console.log('Admin user detected — redirecting to /admin');
				navigate('/admin', { replace: true });
			} else if (user.user.role === 'dealer') {
				navigate('/dealer', { replace: true });
			} else {
				navigate('/', { replace: true });
			}
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		document.title = 'Login | Aurora';
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="w-full h-24 flex items-center justify-center text-navy-900">
				<h1 className="text-5xl font-bold">Login</h1>
			</div>

			{/* Updated container: full width on mobile, 8/12 on medium and larger screens */}
			<div className="w-full md:w-8/12 mx-auto px-4 mt-6">
				<div
					className="p-8 rounded-lg shadow-lg bg-cover bg-center"
					style={{ backgroundImage: `url(${loginImg})` }}
				>
					<h2 className="text-2xl font-bold mb-6 text-center text-navy-900">
						Welcome Back
					</h2>

					{error && (
						<div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="identifier"
								className="block text-lg font-medium text-navy-900"
							>
								Email or Username
							</label>
							<input
								type="text"
								id="identifier"
								name="identifier"
								value={loginData.identifier}
								onChange={handleChange}
								placeholder="Enter your email or username"
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
								value={loginData.password}
								onChange={handleChange}
								placeholder="Enter your password"
								className="w-full py-2 px-4 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-all"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-gradient-to-r from-navy-900 to-orange-500 text-white px-6 py-3 rounded-full hover:text-orange-300 transition-all"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
