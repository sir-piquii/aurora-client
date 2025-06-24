import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, BASE_URL } from "../api";
import { FaStar, FaCartPlus } from "react-icons/fa";

/**
 * CategoryView component displays a paginated list of products for a specific category.
 *
 * Features:
 * - Fetches and displays products based on the selected category.
 * - Supports pagination and allows users to select the number of items per page.
 * - Allows users to add products to a cart, with cart data persisted in localStorage and expiring after 30 days.
 * - Displays a formatted category name in the header.
 * - Shows loading state and handles empty product lists.
 * - Includes pagination controls for navigating between pages.
 *
 * State:
 * - products: Array of product objects for the current category and page.
 * - loading: Boolean indicating if products are being loaded.
 * - currentPage: Current page number for pagination.
 * - itemsPerPage: Number of products displayed per page.
 * - count: Total number of products in the category.
 *
 * Side Effects:
 * - Updates document title based on the category.
 * - Fetches products when category, page, or items per page changes.
The rendered CategoryView component.
 */
function CategoryView() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [count, setCount] = useState(0);

  const formatCategory = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAddToCart = (product) => {
    const storedCart = localStorage.getItem("cart");
    let cart = storedCart ? JSON.parse(storedCart) : null;
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    if (cart && cart.expires && now > cart.expires) {
      cart = null;
    }

    if (!cart) {
      cart = {
        items: [],
        expires: now + THIRTY_DAYS,
      };
    }

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

  useEffect(() => {
    document.title = `${formatCategory(categoryId)} | Aurora`;
    setCurrentPage(1); // Reset to page 1 when category changes
  }, [categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategory(
          categoryId,
          currentPage,
          itemsPerPage
        );
        setProducts(data.rows);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, currentPage, itemsPerPage]);

  // Calculate total pages based on count and itemsPerPage
  const totalPages = Math.ceil(count / itemsPerPage);

  // Handler for changing items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-24 flex items-center justify-center bg-navy-900">
        <h1 className="text-5xl font-bold text-white">
          {formatCategory(categoryId)}
        </h1>
      </div>

      <div className="w-10/12 mx-auto mt-6">
        {/* Items per page selector */}
        <div className="flex justify-end mb-4">
          <label
            className="mr-2 text-gray-700 font-medium"
            htmlFor="itemsPerPage"
          >
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded px-2 py-1"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => {
                const imagesArray = product.images
                  ? product.images.split(",")
                  : [];
                const imageUrl =
                  imagesArray.length > 0 ? imagesArray[0] : "default-image.jpg";

                return (
                  <div
                    key={product.product_id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 flex flex-col"
                  >
                    <Link to={`/product/${product.product_id}`}>
                      <div className="bg-white h-80 overflow-hidden">
                        <img
                          src={`${BASE_URL}/products/${imageUrl}`}
                          loading="lazy"
                          alt={product.product_name}
                          className="w-full h-full object-center object-contain"
                        />
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden text-ellipsis line-clamp-2">
                        {product.product_name}
                      </h3>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
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

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full text-white transition-all ${
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-navy-900 hover:bg-orange-400"
                }`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full text-white transition-all ${
                    currentPage === i + 1
                      ? "bg-orange-500"
                      : "bg-navy-900 hover:bg-orange-400"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-4 py-2 rounded-full text-white transition-all ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-navy-900 hover:bg-orange-400"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">No products found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryView;
