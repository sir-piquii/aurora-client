import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const DealerRoute = () => {
	const userRole = sessionStorage.getItem('userRole'); 
	return !userRole ? <Outlet /> : <Navigate to="/login" replace />;
};
    
export default DealerRoute;