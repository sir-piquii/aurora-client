import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	const user = JSON.parse(localStorage.getItem('user')) ?? null;
	const isAdmin = user?.user.role == 'admin';
	return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
