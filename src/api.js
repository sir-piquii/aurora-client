import axios from 'axios';
import { FaSquare } from 'react-icons/fa';

const BASE_URL =
	process.env.REACT_APP_API_URL || 'https://dev-api.auroraenergy.co.zw';

const endpoints = {
	products: `${BASE_URL}/products`,
	featured: `${BASE_URL}/featured`,
	team: `${BASE_URL}/team`,
	testimonial: `${BASE_URL}/testimonials`,
	auth: `${BASE_URL}/auth`,
	certificates: `${BASE_URL}/certificates`,
	articles: `${BASE_URL}/articles`,
	blogs: `${BASE_URL}/blogs`,
	caseStudies: `${BASE_URL}/case-study`,
	faqs: `${BASE_URL}/faqs`,
	awards: `${BASE_URL}/awards`,
	dealer: `${BASE_URL}/dealer`,
};

export const getCertificates = async () => {
	try {
		const response = await axios.get(endpoints.certificates);
		return response.data;
	} catch (error) {
		console.error('Error fetching certificates:', error);
		throw error;
	}
};

const getCertificatesById = async (id) => {
	try {
		const response = await axios.get(`${endpoints.certificates}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching certificates by ID:', error);
		throw error;
	}
};

export const uploadCertificate = async (formData) => {
	try {
		const response = await axios.post(endpoints.certificates, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error uploading certificates:', error);
		throw error;
	}
};

export const deleteCertificate = async (id) => {
	try {
		const response = await axios.delete(`${endpoints.certificates}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting certificates:', error);
		throw error;
	}
};

export const getAwards = async () => {
	try {
		const response = await axios.get(endpoints.awards);
		return response.data;
	} catch (error) {
		console.error('Error fetching awards:', error);
		throw error;
	}
};

export const uploadAward = async (formData) => {
	try {
		const response = await axios.post(endpoints.awards, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error uploading awards:', error);
		throw error;
	}
};

export const deleteAward = async (id) => {
	try {
		const response = await axios.delete(`${endpoints.awards}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting awards:', error);
		throw error;
	}
};

export const addDealer = async (dealerData, userId) => {
	try {
		const response = await axios.post(
			`${endpoints.dealer}/add-dealer/${userId}`,
			dealerData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error adding dealer:', error);
		throw error;
	}
};

export const getDealerById = async (id) => {
	try {
		const response = await axios.get(`${endpoints.dealer}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching dealer by ID:', error);
		throw error;
	}
};

export const getDealers = async () => {
	try {
		const response = await axios.get(endpoints.dealer);
		return response.data;
	} catch (error) {
		console.error('Error fetching dealers:', error);
		throw error;
	}
};

export const updateDealerStatus = async (id, dealerData) => {
	try {
		const response = await axios.put(
			`${endpoints.dealer}/update-status/${id}`,
			dealerData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating dealer status:', error);
		throw error;
	}
};

export const verifyDealer = async (id) => {
	try {
		const response = await axios.put(`${endpoints.dealer}/verify/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error verifying dealer:', error);
		throw error;
	}
};

export const uploadTaxCertificate = async (formData, id) => {
	try {
		const response = await axios.post(
			`${endpoints.dealer}/upload-tax-clearance-certificate/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error uploading tax certificate:', error);
		throw error;
	}
};

export const uploadIncorporationCertificate = async (formData, id) => {
	try {
		const response = await axios.post(
			`${endpoints.dealer}/upload-certificate-of-incorporation/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error uploading incorporation certificate:', error);
		throw error;
	}
};

export const uploadNationalId = async (formData, id) => {
	try {
		const response = await axios.post(
			`${endpoints.dealer}/upload-ids-of-directors/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error uploading national ID:', error);
		throw error;
	}
};

export const addDealerInstallation = async (formData, id) => {
	try {
		const response = await axios.post(
			`${endpoints.dealer}/add-installations/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error adding dealer installation:', error);
		throw error;
	}
};

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

export const addFeaturedProduct = async (formData) => {
	try {
		const response = await axios.post(
			`${endpoints.featured}/add-featured`,
			formData,
		);
		return response.data;
	} catch (error) {
		console.error('Error adding featured products:', error);
		throw error;
	}
};

export const deleteFeaturedProduct = async (id) => {
	try {
		const response = await axios.delete(
			`${endpoints.featured}/delete-featured/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting featured products:', error);
		throw error;
	}
};

export const updateFeaturedProduct = async (id, formData) => {
	try {
		const response = await axios.put(
			`${endpoints.featured}/update-featured/${id}`,
			formData,
		);
		return response.data;
	} catch (error) {
		console.error('Error updating featured products:', error);
		throw error;
	}
};

export const getProductsByCategory = async (id) => {
	const categoryMap = {
		'solar-panels': 1,
		cabling: 4,
		accessories: 5,
		'energy-storage': 6,
		'hybrid-inverters': 7,
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

export const addProduct = async (productData) => {
	try {
		const response = await axios.post(
			`${endpoints.products}/add-product`,
			productData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error adding products:', error);
		throw error;
	}
};

export const updateProduct = async (id, productData) => {
	try {
		const response = await axios.put(
			`${endpoints.products}/update-product/${id}`,
			productData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating products:', error);
		throw error;
	}
};

export const deleteProduct = async (id) => {
	try {
		const response = await axios.delete(
			`${endpoints.products}/delete-product/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting products:', error);
		throw error;
	}
};

export const uploadProductDatasheet = async (formData, id) => {
	try {
		const response = await axios.post(
			`${endpoints.products}/upload-datasheet/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error uploading product datasheet:', error);
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

export const getTeamById = async (id) => {
	try {
		const response = await axios.get(
			`${endpoints.team}/get-team-member/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching team by ID:', error);
		throw error;
	}
};

export const addTeamMember = async (teamData) => {
	try {
		const response = await axios.post(
			`${endpoints.team}/add-team`,
			teamData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error adding team member:', error);
		throw error;
	}
};

export const updateTeamMember = async (id, teamData) => {
	try {
		const response = await axios.put(
			`${endpoints.team}/update-team/${id}`,
			teamData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating team member:', error);
		throw error;
	}
};

export const updateTeamMemberImage = async (id, teamData) => {
	try {
		const response = await axios.put(
			`${endpoints.team}/update-team-image/${id}`,
			teamData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating team member image:', error);
		throw error;
	}
};

export const deleteTeamMember = async (id) => {
	try {
		const response = await axios.delete(
			`${endpoints.team}/delete-team/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting team member:', error);
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

export const getTestimonialById = async (id) => {
	try {
		const response = await axios.get(
			`${endpoints.testimonial}/get-testimonial/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching testimonial by ID:', error);
		throw error;
	}
};

export const addTestimonial = async (testimonialData) => {
	try {
		const response = await axios.post(
			`${endpoints.testimonial}/add-testimonial`,
			testimonialData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error adding testimonial:', error);
		throw error;
	}
};

export const updateTestimonial = async (id, testimonialData) => {
	console.log(testimonialData);
	try {
		const response = await axios.put(
			`${endpoints.testimonial}/update-testimonial/${id}`,
			testimonialData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating testimonial:', error);
		throw error;
	}
};

export const deleteTestimonial = async (id) => {
	try {
		const response = await axios.delete(
			`${endpoints.testimonial}/delete-testimonial/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting testimonial:', error);
		throw error;
	}
};

export const updateTestimonialImage = async (id, testimonialData) => {
	try {
		const response = await axios.put(
			`${endpoints.testimonial}/update-testimonial-image/${id}`,
			testimonialData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating testimonial image:', error);
		throw error;
	}
};

export const getArticles = async () => {
	try {
		const response = await axios.get(endpoints.articles);
		return response.data;
	} catch (error) {
		console.error('Error fetching articles:', error);
		throw error;
	}
};

export const getArticleById = async (id) => {
	try {
		const response = await axios.get(`${endpoints.articles}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching article by ID:', error);
		throw error;
	}
};

export const addArticle = async (articleData) => {
	try {
		const response = await axios.post(endpoints.articles, articleData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error adding article:', error);
		throw error;
	}
};

export const updateArticle = async (id, articleData) => {
	try {
		const response = await axios.put(
			`${endpoints.articles}/${id}`,
			articleData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating article:', error);
		throw error;
	}
};

export const deleteArticle = async (id) => {
	try {
		const response = await axios.delete(`${endpoints.articles}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting article:', error);
		throw error;
	}
};

export const getBlogs = async () => {
	try {
		const response = await axios.get(endpoints.blogs);
		return response.data;
	} catch (error) {
		console.error('Error fetching blogs:', error);
		throw error;
	}
};

export const getBlogById = async (id) => {
	try {
		const response = await axios.get(`${endpoints.blogs}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching blog by ID:', error);
		throw error;
	}
};

export const addBlog = async (blogData) => {
	try {
		const response = await axios.post(endpoints.blogs, blogData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error adding blog:', error);
		throw error;
	}
};

export const updateBlog = async (id, blogData) => {
	try {
		const response = await axios.put(`${endpoints.blogs}/${id}`, blogData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error updating blog:', error);
		throw error;
	}
};

export const deleteBlog = async (id) => {
	try {
		const response = await axios.delete(`${endpoints.blogs}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting blog:', error);
		throw error;
	}
};

export const searchBlogByTitle = async (title) => {
	try {
		const response = await axios.get(
			`${endpoints.blogs}/search?title=${title}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error searching blog by title:', error);
		throw error;
	}
};

export const getCaseStudies = async () => {
	try {
		const response = await axios.get(endpoints.caseStudies);
		return response.data;
	} catch (error) {
		console.error('Error fetching case studies:', error);
		throw error;
	}
};

export const getCaseStudyById = async (id) => {
	try {
		const response = await axios.get(`${endpoints.caseStudies}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching case study by ID:', error);
		throw error;
	}
};

export const addCaseStudy = async (caseStudyData) => {
	try {
		const response = await axios.post(
			endpoints.caseStudies,
			caseStudyData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error adding case study:', error);
		throw error;
	}
};

export const updateCaseStudy = async (id, caseStudyData) => {
	try {
		const response = await axios.put(
			`${endpoints.caseStudies}/${id}`,
			caseStudyData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error updating case study:', error);
		throw error;
	}
};

export const deleteCaseStudy = async (id) => {
	try {
		const response = await axios.delete(`${endpoints.caseStudies}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting case study:', error);
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

export const verifyEmail = async (verificationCode) => {
	try {
		const response = await axios.post(
			`${endpoints.auth}/verifyemail`,
			{ verificationCode },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error verifying user:', error);
		throw error;
	}
};

export const resetPassword = async (token, newPassword) => {
	try {
		const response = await axios.post(
			`${endpoints.auth}/resetpassword/${token}`,
			{ newPassword },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error resetting password:', error);
		throw error;
	}
};

export const forgotPassword = async (email) => {
	try {
		const response = await axios.post(
			`${endpoints.auth}/forgotpassword`,
			{ email },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error sending forgot password email:', error);
		throw error;
	}
};

export const getFaqs = async () => {
	try {
		const response = await axios.get(endpoints.faqs);
		return response.data;
	} catch (error) {
		console.error('Error fetching faqs:', error);
		throw error;
	}
};

export const getFAQById = async (id) => {
	try {
		const response = await axios.get(`${endpoints.faqs}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching faq by ID:', error);
		throw error;
	}
};

export const addFaqs = async (formData) => {
	try {
		const response = await axios.post(endpoints.faqs, formData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error adding faqs:', error);
		throw error;
	}
};

export const updateFaqs = async (id, formData) => {
	try {
		const response = await axios.put(`${endpoints.faqs}/${id}`, formData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error updating faqs:', error);
		throw error;
	}
};

export const deleteFaqs = async () => {
	try {
		const response = await axios.delete(endpoints.faqs);
		return response.data;
	} catch (error) {
		console.error('Error deleting faqs:', error);
		throw error;
	}
};

export const searchFaqsByKeyword = async (keyword) => {
	try {
		const response = await axios.get(
			`${endpoints.faqs}/search?keyword=${keyword}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error searching faqs by keyword:', error);
		throw error;
	}
};
