import axios from 'axios';

const BASE_URL =
	process.env.REACT_APP_API_URL || 'https://dev-api.auroraenergy.co.zw';

const endpoints = {
	products: `${BASE_URL}/products`,
	featured: `${BASE_URL}/featured`,
	team: `${BASE_URL}/team`,
	testimonial: `${BASE_URL}/testimonials`,
	auth: `${BASE_URL}/auth`,
};

// API service functions
export const getAllProducts = async () => {
	try {
		const response = await axios.get(
			`${endpoints.products}/get-all-products`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};

export const getFeaturedProducts = async () => {
	try {
		const response = await axios.get(`${endpoints.featured}/get-featured`);
		return response.data;
	} catch (error) {
		console.error('Error fetching featured products:', error);
		throw error;
	}
};

export const getProductsByCategory = async (id) => {
	const categoryMap = {
		'solar-panels': 1,
		cabling: 4,
		accessories: 5,
		'energy-storage': 6,
		inverters: 7,
		'mounting-equipment': 8,
		'switch-gear': 9,
	};

	const categoryId = categoryMap[id] || id;

	try {
		const response = await axios.get(
			`${endpoints.products}/get-product-by-category/${categoryId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching products by category:', error);
		throw error;
	}
};

export const getProductById = async (id) => {
	try {
		const response = await axios.get(
			`${endpoints.products}/get-product-by-id/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching product by ID:', error);
		throw error;
	}
};

export const getTeam = async () => {
	try {
		const response = await axios.get(`${endpoints.team}/get-team`);
		return response.data;
	} catch (error) {
		console.error('Error fetching team:', error);
		throw error;
	}
};

export const getTestimonials = async () => {
	try {
		const response = await axios.get(
			`${endpoints.testimonial}/get-testimonials`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching testimonials:', error);
		throw error;
	}
};

export const authenticateUser = async (user, password) => {
	try {
		const response = await axios.post(
			`${endpoints.auth}/login`,
			{ user, password },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error authenticating user:', error);
		throw error;
	}
};

export const registerUser = async (userData) => {
	try {
		const response = await axios.post(
			`${endpoints.auth}/register`,
			userData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error registering user:', error);
		throw error;
	}
};
