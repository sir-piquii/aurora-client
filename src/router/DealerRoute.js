import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const DealerRoute = () => {
	const user = sessionStorage.getItem('user');
	return !user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default DealerRoute;
