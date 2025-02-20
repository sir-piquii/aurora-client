import { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		// Check localStorage for an existing user on load
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	useEffect(() => {
		// Listen for changes in localStorage (optional)
		const handleStorageChange = () => {
			const storedUser = localStorage.getItem('user');
			setUser(storedUser ? JSON.parse(storedUser) : null);
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	// Login function
	const login = (userData) => {
		localStorage.setItem('user', JSON.stringify(userData));
		setUser(userData);
	};

	// Logout function
	const logout = () => {
		localStorage.removeItem('user');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
