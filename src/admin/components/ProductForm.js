/**
 * ProductForm component for adding and editing products in the admin panel.
 *
 * Handles form state, file uploads (images and datasheet), and submission for both
 * creating and updating products. Fetches product data and categories as needed.
 *
 * @component
 *
 * @example
 * // Used in a route for adding or editing a product
 * <Route path="/admin/products/:id?" element={<ProductForm />} />
 *
 * @returns {JSX.Element} The rendered product form component.
 *
 * @typedef {Object} FormData
 * @property {string} name - Product name.
 * @property {string} description - Product description.
 * @property {string} benefits - Product benefits.
 * @property {string} warranty - Product warranty (years).
 * @property {string|number} category - Product category ID.
 * @property {Array<string|File>} images - Array of image URLs or File objects.
 * @property {string|File|null} datasheet - Datasheet file or URL.
 * @property {number} price_usd - Price in USD.
 * @property {number} price_zwl - Price in ZWL.
 * @property {number} discount - Discount percentage.
 * @property {number} quantity - Product quantity.
 * @property {string} supplier - Supplier ID.
 *
 * @typedef {Object} Category
 * @property {string|number} id - Category ID.
 * @property {string} category - Category name.
 *
 * @function
 * @name ProductForm
 *
 * @hook
 * @uses useState
 * @uses useEffect
 * @uses useNavigate
 * @uses useParams
 *
 * @see getProductById
 * @see updateProduct
 * @see addProduct
 * @see getProductCategories
 */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  addProduct,
  getProductCategories,
} from "../../api";
import InlineTourButton from "../../components/tours/InlineTourButton";
import { adminProductFormSteps } from "../../components/tours/tourSteps";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    benefits: "",
    warranty: "",
    category: "",
    images: [],
    datasheet: null,
    price_usd: 0.0,
    price_zwl: 0.0,
    discount: 0.0,
    quantity: 0,
    supplier: "1",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [removeDatasheet, setRemoveDatasheet] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchProduct = async () => {
        try {
          const data = await getProductById(id);
          setFormData({
            name: data[0].product_name || "",
            description: data[0].product_description || "",
            benefits: data[0].product_benefits || "",
            warranty: data[0].product_warranty || "",
            category: data[0].category_id || "",
            images:
              typeof data[0].images === "string" && data[0].images.length > 0
                ? data[0].images.split(",").map((img) => img)
                : [],
            datasheet: data[0].datasheet ? data[0].datasheet : null,
            price_usd: data[0].price_usd || 0.0,
            price_zwl: data[0].price_zwl || 0.0,
            discount: data[0].discount || 0.0,
            quantity: data[0].quantity || 0,
            supplier: data[0].supplier || "1",
          });
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProductCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedImages = formData.images.map((img) =>
      img instanceof File ? img : img.split("/").pop()
    );

    const submissionData = {
      ...formData,
      images: cleanedImages,
      datasheet: removeDatasheet ? null : formData.datasheet,
    };

    try {
      if (isEditMode) {
        await updateProduct(id, submissionData);
      } else {
        await addProduct(submissionData);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleRemoveDatasheet = () => {
    setFormData({ ...formData, datasheet: null });
    setRemoveDatasheet(true);
  };

  const renderImagePreview = (img) => {
    if (img instanceof File) {
      return URL.createObjectURL(img);
    } else {
      return `https://dev-api.auroraenergy.co.zw/products/${img}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              required: true,
            },
            {
              label: "Description",
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              label: "Benefits",
              name: "benefits",
              type: "textarea",
            },
            {
              label: "Warranty (years)",
              name: "warranty",
              type: "number",
            },
            {
              label: "Price (USD)",
              name: "price_usd",
              type: "number",
            },
            {
              label: "Price (ZWL)",
              name: "price_zwl",
              type: "number",
            },
            {
              label: "Discount (%)",
              name: "discount",
              type: "number",
            },
            { label: "Quantity", name: "quantity", type: "number" },
            { label: "Supplier", name: "supplier", type: "text" },
          ].map(({ label, name, type, required }) => (
            <div className="mb-4" key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required={required}
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required={required}
                />
              )}
            </div>
          ))}

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-navy-900"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>

          {/* Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {Array.isArray(formData.images) && formData.images.length > 0 && (
              <div className="flex mt-2 space-x-2 flex-wrap">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img
                      src={renderImagePreview(img)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Datasheet */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Datasheet
            </label>
            <input
              type="file"
              name="datasheet"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {formData.datasheet && (
              <div className="mt-2 text-sm text-gray-600 flex items-center space-x-2">
                <span>
                  {typeof formData.datasheet === "string"
                    ? formData.datasheet.split("/").pop()
                    : formData.datasheet.name}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveDatasheet}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-full"
            >
              {isEditMode ? "Update Product" : "Add Product"}
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
    </div>
  );
};

export default ProductForm;
