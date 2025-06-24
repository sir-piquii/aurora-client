/**
 * FeaturedProductForm component allows admin users to add or edit a featured product.
 *
 * Features:
 * - Handles both creation and editing of featured products.
 * - Fetches product data for editing based on route parameter `id`.
 * - Supports image upload with preview functionality.
 * - Submits form data using FormData for file handling.
 * - Navigates back to the featured products list after submission or cancellation.
 *
 * State:
 * - formData: { id: string, name: string, image: File|string|null, imagePreview: string|null }
 * - isEditMode: boolean - Determines if the form is in edit mode.
 * - loading: boolean - Indicates if a request is in progress.
 *
 * Dependencies:
 * - React, useState, useEffect
 * - react-router-dom: useNavigate, useParams
 * - API functions: addFeaturedProduct, updateFeaturedProduct, getFeaturedProductsById, BASE_URL
 *
 * @component
 * @returns {JSX.Element} The FeaturedProductForm component UI.
 */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFeaturedProduct,
  updateFeaturedProduct,
  getFeaturedProductsById,
  BASE_URL,
} from "../../api";

const FeaturedProductForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: null,
    imagePreview: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchProduct = async () => {
        try {
          const data = await getFeaturedProductsById(id);
          setFormData({
            id: data.id,
            name: data.name,
            image: data.image,
          });
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, file } = e.target;
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("image", formData.image);
      if (isEditMode) {
        await updateFeaturedProduct(id, data);
      } else {
        await addFeaturedProduct(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      navigate("/admin/featured-products");
    }
  };

  if (loading) {
    return <span>Loading..</span>;
  }
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mb-4">
      <h3 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Featured Product" : "Add Featured Product"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-semibold text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formData.imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Preview:</p>
              <img
                src={
                  typeof formData.image === "string"
                    ? `${BASE_URL}/featuredProducts/${formData.image}`
                    : URL.createObjectURL(formData.image)
                }
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full"
          >
            {isEditMode ? "Update Featured Product" : "Add Featured Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeaturedProductForm;
