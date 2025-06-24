/**
 * FeaturedProducts component for managing featured products in the admin panel.
 *
 * - Fetches and displays a paginated list of featured products.
 * - Allows admin to add, edit, or delete featured products.
 * - Displays product ID, image, and name in a table.
 * - Provides pagination controls for navigating through products.
 *
 * @component
 *
 * @example
 * return (
 *   <FeaturedProducts />
 * )
 *
 * @returns {JSX.Element} The rendered FeaturedProducts admin management UI.
 */
import React, { useEffect, useState } from "react";
import { getFeaturedProducts, deleteFeaturedProduct } from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    document.title = "Featured Products | Admin Panel";

    const fetchFeaturedProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentItems = featuredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await deleteFeaturedProduct(productId);
        setFeaturedProducts(
          featuredProducts.filter((product) => product.id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Manage Featured Products</h2>

      {/* Add Featured Product Button */}
      <Link
        to="/admin/featured-products/add"
        className="bg-orange-500 text-white px-4 py-2 rounded-full mb-4 inline-block"
      >
        Add Featured Product
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={`https://dev-api.auroraenergy.co.zw/featuredProducts/${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border p-4 flex items-center justify-center space-x-4">
                    <Link
                      to={`/admin/featured-products/edit/${product.id}`}
                      className="text-navy-900"
                    >
                      <FaEdit size={18} className="cursor-pointer" />
                    </Link>
                    <FaTrash
                      onClick={() => handleDelete(product.id)}
                      size={18}
                      className="text-orange-500 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No featured products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from(
          {
            length: Math.ceil(featuredProducts.length / productsPerPage),
          },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
