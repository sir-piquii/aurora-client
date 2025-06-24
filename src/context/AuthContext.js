import { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication context to its children.
 * 
 * Manages user authentication state using localStorage and React state.
 * Provides `login` and `logout` functions to update authentication state.
 * 
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} The AuthContext provider with authentication state and functions.
 * 
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
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
