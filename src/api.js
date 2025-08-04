import axios from "axios";
export const BASE_URL =
  process.env.REACT_APP_API_URL || "https://api.auroraenergy.co.zw"; //https://dev-api.auroraenergy.co.zw

/**
 * An object containing API endpoint URLs for various resources in the application.
 *
 * @constant
 * @type {Object}
 * @property {string} products - Endpoint for product-related operations.
 * @property {string} featured - Endpoint for featured items.
 * @property {string} team - Endpoint for team member information.
 * @property {string} testimonial - Endpoint for testimonials.
 * @property {string} auth - Endpoint for authentication operations.
 * @property {string} certificates - Endpoint for certificates.
 * @property {string} articles - Endpoint for articles.
 * @property {string} blogs - Endpoint for blogs.
 * @property {string} caseStudies - Endpoint for case studies.
 * @property {string} faqs - Endpoint for frequently asked questions.
 * @property {string} awards - Endpoint for awards.
 * @property {string} dealer - Endpoint for dealer information.
 * @property {string} quotations - Endpoint for quotations.
 * @property {string} overview - Endpoint for overview data.
 * @property {string} brands - Endpoint for brand information.
 * @property {string} positions - Endpoint for positions.
 * @property {string} statistics - Endpoint for statistics.
 * @property {string} sales - Endpoint for sales data.
 */
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
  quotations: `${BASE_URL}/quotations`,
  overview: `${BASE_URL}/overview`,
  brands: `${BASE_URL}/brands`,
  positions: `${BASE_URL}/positions`,
  statistics: `${BASE_URL}/statistics/`,
  sales: `${BASE_URL}/sales/`,
};
// sales
export const getSales = async (range, category) => {
  try {
    const response = await axios.get(endpoints.sales, {
      withCredentials: true,
      params: {
        range: range || null,
        category: category || null,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addSale = async (sale) => {
  try {
    await axios.post(`${endpoints.sales}/`, sale, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getProductsBasicInfo = async () => {
  try {
    const response = await axios.get(`${endpoints.sales}/products`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// statistics
export const getStatistics = async (range, category) => {
  try {
    const response = await axios.get(endpoints.statistics, {
      withCredentials: true,
      params: {
        range: range || null,
        category: category || null,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// positions

export const getPositions = async () => {
  try {
    const response = await axios.get(`${endpoints.positions}/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error;
  }
};
// brands
export const getBrands = async (search = null, page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${endpoints.brands}?search=${search}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};
export const getMinBrandsDetails = async () => {
  try {
    const response = await axios.get(`${endpoints.brands}/min`);
    return response.data;
  } catch (error) {
    console.error("Error fetching min brands:", error);
    throw error;
  }
};
export const getBrandById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.brands}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand by ID:", error);
    throw error;
  }
};
export const addBrand = async (brandData) => {
  try {
    const response = await axios.post(endpoints.brands, brandData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding brand:", error);
    throw error;
  }
};
export const updateBrand = async (id, brandData) => {
  try {
    const response = await axios.put(`${endpoints.brands}/${id}`, brandData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating brand:", error);
    throw error;
  }
};
export const deleteBrand = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.brands}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting brand:", error);
    throw error;
  }
};
// certificates
export const getCertificates = async () => {
  try {
    const response = await axios.get(endpoints.certificates);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
};

export const getCertificatesById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.certificates}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates by ID:", error);
    throw error;
  }
};

export const uploadCertificate = async (formData) => {
  try {
    const response = await axios.post(endpoints.certificates, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading certificates:", error);
    throw error;
  }
};

export const updateCertificate = async (id, formData) => {
  try {
    const response = await axios.put(
      `${endpoints.certificates}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating certificates:", error);
    throw error;
  }
};

export const deleteCertificate = async (id) => {
  try {
    const response = await axios.delete(
      `${endpoints.certificates}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting certificates:", error);
    throw error;
  }
};

export const getAwards = async () => {
  try {
    const response = await axios.get(`${endpoints.awards}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching awards:", error);
    throw error;
  }
};

export const getAwardById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.awards}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching award by ID:", error);
    throw error;
  }
};

export const updateAward = async (id, formData) => {
  try {
    const response = await axios.put(`${endpoints.awards}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating awards:", error);
    throw error;
  }
};

export const uploadAward = async (formData) => {
  try {
    const response = await axios.post(endpoints.awards, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading awards:", error);
    throw error;
  }
};

export const deleteAward = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.awards}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting awards:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer:", error);
    throw error;
  }
};

export const getDealerById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.dealer}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealer by ID:", error);
    throw error;
  }
};

export const changeDealerStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${endpoints.dealer}/status/${id}`,
      status,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
    throw error;
  }
};
//reg_status, page_number, page_size
export const getDealers = async (reg_status, page_number, page_size) => {
  try {
    const params = {};
    if (reg_status !== undefined && reg_status !== null)
      params.reg_status = reg_status;
    if (page_number !== undefined && page_number !== null)
      params.page_number = page_number;
    if (page_size !== undefined && page_size !== null)
      params.page_size = page_size;

    const response = await axios.get(`${endpoints.dealer}/`, {
      withCredentials: true,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dealers:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating dealer status:", error);
    throw error;
  }
};

export const verifyDealer = async (id) => {
  try {
    const response = await axios.put(`${endpoints.dealer}/verify/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying dealer:", error);
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
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading tax certificate:", error);
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
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading incorporation certificate:", error);
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
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading national ID:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding dealer installation:", error);
    throw error;
  }
};

export const getProductCategories = async () => {
  try {
    const response = await axios.get(`${endpoints.products}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

export const getAllProducts = async (
  category = null,
  page = 1,
  pageSize = 12
) => {
  try {
    const response = await axios.get(
      `${
        endpoints.products
      }/get-all-products?page=${page}&pageSize=${pageSize}&category=${
        category == null || category === 0 ? "" : category
      }`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${endpoints.featured}/get-featured`);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};
export const getFeaturedProductsById = async (id) => {
  try {
    const response = await axios.get(
      `${endpoints.featured}/get-featured/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

export const addFeaturedProduct = async (formData) => {
  try {
    const response = await axios.post(
      `${endpoints.featured}/add-featured`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding featured products:", error);
    throw error;
  }
};

export const deleteFeaturedProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${endpoints.featured}/delete-featured/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting featured products:", error);
    throw error;
  }
};

export const updateFeaturedProduct = async (id, formData) => {
  try {
    const response = await axios.put(
      `${endpoints.featured}/update-featured/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating featured products:", error);
    throw error;
  }
};

export const getProductsByCategory = async (id, page, perPage) => {
  const categoryMap = {
    "solar-panels": 1,
    cabling: 4,
    accessories: 5,
    "energy-storage": 6,
    "hybrid-inverters": 7,
    "mounting-equipment": 8,
    "switch-gear": 9,
  };

  const categoryId = categoryMap[id] || id;

  try {
    const response = await axios.get(
      `${endpoints.products}/get-product-by-category/${categoryId}?page=${page}&pageSize=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `${endpoints.products}/get-product-by-id/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${endpoints.products}/add-product`,
      productData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "form-data/multipart",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding products:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(
      `${endpoints.products}/update-product/${id}`,
      productData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating products:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${endpoints.products}/delete-product/${id}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting products:", error);
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
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading product datasheet:", error);
    throw error;
  }
};
export const updateProductImages = async (formData, id) => {
  try {
    const response = await axios.post(
      `${endpoints.products}/upload-product-images/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading product datasheet:", error);
    throw error;
  }
};

export const getTeam = async () => {
  try {
    const response = await axios.get(`${endpoints.team}/get-team`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team:", error);
    throw error;
  }
};

export const getTeamById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.team}/get-team-member/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team by ID:", error);
    throw error;
  }
};

export const addTeamMember = async (teamData) => {
  try {
    const response = await axios.post(`${endpoints.team}/add-team`, teamData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding team member:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating team member:", error);
    throw error;
  }
};

export const updateTeamMemberImage = async (id, teamData) => {
  try {
    const response = await axios.put(
      `${endpoints.team}/update-team-member-image/${id}`,
      teamData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating team member image:", error);
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.team}/delete-team/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
};

export const getTestimonials = async () => {
  try {
    const response = await axios.get(
      `${endpoints.testimonial}/get-testimonials`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

export const getTestimonialById = async (id) => {
  try {
    const response = await axios.get(
      `${endpoints.testimonial}/get-testimonial/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
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
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding testimonial:", error);
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
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(
      `${endpoints.testimonial}/delete-testimonial/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
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
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating testimonial image:", error);
    throw error;
  }
};

export const getArticles = async () => {
  try {
    const response = await axios.get(endpoints.articles);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.articles}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error;
  }
};

export const addArticle = async (articleData) => {
  try {
    const response = await axios.post(endpoints.articles, articleData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding article:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.articles}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${endpoints.blogs}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.blogs}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw error;
  }
};

export const addBlog = async (blogData) => {
  try {
    const response = await axios.post(endpoints.blogs, blogData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    const response = await axios.put(`${endpoints.blogs}/${id}`, blogData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.blogs}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const searchBlogByTitle = async (title) => {
  try {
    const response = await axios.get(
      `${endpoints.blogs}/search?title=${title}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching blog by title:", error);
    throw error;
  }
};

export const getCaseStudies = async () => {
  try {
    const response = await axios.get(endpoints.caseStudies);
    return response.data;
  } catch (error) {
    console.error("Error fetching case studies:", error);
    throw error;
  }
};

export const getCaseStudyById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.caseStudies}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching case study by ID:", error);
    throw error;
  }
};

export const addCaseStudy = async (caseStudyData) => {
  try {
    const response = await axios.post(endpoints.caseStudies, caseStudyData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding case study:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating case study:", error);
    throw error;
  }
};

export const deleteCaseStudy = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.caseStudies}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting case study:", error);
    throw error;
  }
};
// authentication
export const authenticateUser = async (user, password) => {
  try {
    const response = await axios.post(
      `${endpoints.auth}/login`,
      { user, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${endpoints.auth}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
};
export const getQuotationsByUser = async (email, id) => {
  try {
    const response = await axios.get(
      `${endpoints.quotations}/get-by-user?id=${id}&email=${email}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user quotations:", error);
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
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
export const updateProfile = async (id, profile) => {
  try {
    const response = await axios.put(
      `${endpoints.auth}/update-profile/${id}`,
      profile,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const changePassword = async (id, data) => {
  try {
    const response = await axios.put(
      `${endpoints.auth}/change-password/${id}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// admins
export const getAdmins = async () => {
  try {
    const response = await axios.get(`${endpoints.auth}/admins`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};
export const getLoggedInAdmin = async () => {
  try {
    const response = await axios.get(`${endpoints.auth}/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};
export const addAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${endpoints.auth}/admin`, adminData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding admins:", error);
    throw error;
  }
};

export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.auth}/user/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${endpoints.auth}/forgetpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    throw error;
  }
};
//
export const getFaqs = async () => {
  try {
    const response = await axios.get(endpoints.faqs);
    return response.data;
  } catch (error) {
    console.error("Error fetching faqs:", error);
    throw error;
  }
};

export const getFAQById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.faqs}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching faq by ID:", error);
    throw error;
  }
};

export const addFaqs = async (formData) => {
  try {
    const response = await axios.post(endpoints.faqs, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding faqs:", error);
    throw error;
  }
};

export const updateFaqs = async (id, formData) => {
  try {
    const response = await axios.put(`${endpoints.faqs}/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating faqs:", error);
    throw error;
  }
};

export const deleteFaqs = async (id) => {
  try {
    const response = await axios.delete(`${endpoints.faqs}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting faqs:", error);
    throw error;
  }
};

export const searchFaqsByKeyword = async (keyword) => {
  try {
    const response = await axios.get(
      `${endpoints.faqs}/search?keyword=${keyword}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching faqs by keyword:", error);
    throw error;
  }
};

export const getQuotations = async (status, page, pageSize) => {
  try {
    const response = await axios.get(
      `${endpoints.quotations}/?status=${status}&pageSize=${pageSize}&page=${page}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quotations:", error);
    throw error;
  }
};

export const getQuotationById = async (id) => {
  try {
    const response = await axios.get(`${endpoints.quotations}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quotation by ID:", error);
    throw error;
  }
};

export const addQuotation = async (quotationData) => {
  try {
    const response = await axios.post(endpoints.quotations, quotationData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding quotation:", error);
    throw error;
  }
};
export const changeQuotationStatus = async (id, status) => {
  console.log(status);
  try {
    const response = await axios.put(
      `${endpoints.quotations}/${id}`,
      { status: status },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding quotation:", error);
    throw error;
  }
};
export const getOverview = async () => {
  try {
    const response = await axios.get(endpoints.overview);
    return response.data;
  } catch (error) {
    console.error("Error fetching overview:", error);
    throw error;
  }
};
