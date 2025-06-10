import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../api";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { getFaqs, BASE_URL } from "../api";

/**
 * ProductsPage component displays the main products view, including:
 * - A header/banner.
 * - A horizontal categories mini menu for navigation.
 * - A grid of featured products fetched from the backend.
 * - Functionality to add products to a localStorage-based cart with expiration.
 * - A section displaying frequently asked questions (FAQs) about products.
 *
 * State:
 * - featuredProducts: Array of featured product objects.
 * - faqs: Array of FAQ objects.
 *
 * Side Effects:
 * - Fetches featured products and FAQs on mount.
 * - Sets the document title to "Products | Aurora".
 *
 * Handlers:
 * - handleAddToCart: Adds a selected product to the cart in localStorage, with quantity management and 30-day expiration.
 *
 * UI:
 * - Uses Tailwind CSS for styling.
 * - Renders categories as navigation links.
 * - Renders featured products with images, names, and a button to add to cart.
 * - Renders FAQs as clickable links.
 *
 * Dependencies:
 * - React (useState, useEffect)
 * - React Router (Link)
 * - FontAwesome icons (FaStar, FaCartPlus)
 * - Utility functions: getFeaturedProducts, getFaqs
 * - BASE_URL constant for image paths
 *
 * @component
 */
/**
 * ProductsPage component displays a list of featured products, product categories, and FAQs.
 *
 * - Fetches and displays featured products and FAQs on mount.
 * - Allows users to add products to a localStorage-based cart with expiration logic.
 * - Renders a horizontal scrollable menu of product categories.
 * - Shows a grid of featured products with images, names, and a button to add to cart.
 * - Displays a section of frequently asked questions related to products.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductsPage component.
 *
 * @example
 * <ProductsPage />
 */
function ProductsPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Categories (static list)
  const categories = [
    { id: "solar-panels", name: "Solar Panels" },
    { id: "hybrid-inverters", name: "Hybrid Inverters" },
    { id: "energy-storage", name: "Energy Storage" },
    { id: "mounting-equipment", name: "Mounting Equipment" },
    { id: "cabling", name: "Cabling" },
    { id: "accessories", name: "Accessories" },
    { id: "switch-gear", name: "Switch Gear" },
  ];

  // Fetch featured products on component mount with a delay
  useEffect(() => {
    document.title = "Products | Aurora";

    const fetchFeaturedProducts = async () => {
      try {
        const data = await getFeaturedProducts();
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching faqs:", error);
      }
    };

    fetchFeaturedProducts();
    fetchFaqs();
  }, []);

  // Handler to add product to localStorage cart
  const handleAddToCart = (product) => {
    const storedCart = localStorage.getItem("cart");
    let cart = storedCart ? JSON.parse(storedCart) : null;
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    // Reset cart if it has expired
    if (cart && cart.expires && now > cart.expires) {
      cart = null;
    }

    if (!cart) {
      cart = {
        items: [],
        expires: now + THIRTY_DAYS,
      };
    }

    // Check if product is already in the cart (using product_id or a similar unique identifier)
    const existingItem = cart.items.find(
      (item) => item.productId === product.product_id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: product.product_id,
        productName: product.product_name,
        image: product.images.split(",")[0],
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  return (
    <div className="flex flex-col items-center">
      {/* Header/Banner */}
      <div className="w-full h-24 flex items-center justify-center bg-navy-900">
        <h1 className="text-5xl font-bold text-white">Products</h1>
      </div>

      <div className="w-10/12 mx-auto mt-6 space-y-10">
        {/* Categories Mini Menu */}
        <div className="bg-white p-4 rounded-lg">
          <div className="relative">
            {/* Categories */}
            <div
              id="categories-scroll"
              className="flex justify-center space-x-4 overflow-x-auto md:overflow-x-visible scrollbar-none"
              style={{ scrollBehavior: "smooth" }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="px-3 py-1 text-base text-gray-700 hover:text-white hover:bg-navy-900 rounded transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-navy-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl text-white font-bold mb-4">
            Featured Products
          </h2>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => {
                // Assuming product.image contains the image filename
                const imageUrl = product.image || "default-image.jpg";

                return (
                  <div
                    key={product.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col"
                  >
                    <img
                      src={`${BASE_URL}/featuredProducts/${imageUrl}`}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain object-center mix-blend-multiply"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden text-ellipsis line-clamp-1">
                        {product.name}
                      </h3>
                      {/* Star Reviews */}
                      <div className="flex items-center mb-4">
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition duration-300"
                        >
                          <FaCartPlus className="mr-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">Loading featured products...</p>
          )}
        </div>

        {/* Products FAQs Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#001f3f" }}>
            Products FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Link
                key={index}
                to="/faqs"
                className="block border rounded p-4 hover:shadow-md transition-all"
              >
                <h3 className="font-bold" style={{ color: "#001f3f" }}>
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
