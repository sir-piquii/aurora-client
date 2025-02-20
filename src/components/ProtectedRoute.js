import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
	const user = localStorage.getItem('user'); // Check if user exists
	return user ? <Navigate to="/" replace /> : element;
};

export default ProtectedRoute;
