import React, { useState, useEffect, useCallback } from "react";
import { X, Upload } from "lucide-react";
import { BASE_URL } from "../../api";

const DEFAULT_PRODUCT = {
  product_id: 0,
  product_name: "",
  product_description: "",
  category_id: 0,
  category_name: "",
  datasheet: null,
  discount: "0.00",
  images: "",
  price_usd: "0.00",
  price_zwl: "0.00",
  product_benefits: "",
  product_warranty: "1",
  quantity: 0,
  supplier_id: 1,
  supplier_name: "Freecon Solar",
};

const CATEGORIES = [
  { id: 1, name: "Solar Panels" },
  { id: 2, name: "Inverters" },
  { id: 3, name: "Batteries" },
  { id: 4, name: "Cabling" },
  { id: 5, name: "Accessories" },
];

const ProductFormModal = ({
  product,
  isOpen,
  onClose,
  onSubmit,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState(product || DEFAULT_PRODUCT);
  const [errors, setErrors] = useState({});
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingDatasheet, setIsDraggingDatasheet] = useState(false);
  useEffect(() => {
    if (product) {
      setFormData(product);
      setBenefits(product.product_benefits.split("\n").filter((b) => b.trim()));
    } else {
      setFormData(DEFAULT_PRODUCT);
      setBenefits([]);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_id") {
      const selectedCategory = CATEGORIES.find(
        (cat) => cat.id === parseInt(value)
      );
      setFormData({
        ...formData,
        [name]: parseInt(value),
        category_name: selectedCategory?.name || "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDragOver = useCallback((e, type) => {
    e.preventDefault();
    if (type === "image") {
      setIsDraggingImage(true);
    } else {
      setIsDraggingDatasheet(true);
    }
  }, []);

  const handleDragLeave = useCallback((type) => {
    if (type === "image") {
      setIsDraggingImage(false);
    } else {
      setIsDraggingDatasheet(false);
    }
  }, []);

  const handleDrop = useCallback((e, type) => {
    e.preventDefault();
    setIsDraggingImage(false);
    setIsDraggingDatasheet(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (type === "image") {
        setFormData((prev) => ({ ...prev, images: result }));
      } else {
        setFormData((prev) => ({ ...prev, datasheet: result }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = useCallback((e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (type === "image") {
        setFormData((prev) => ({ ...prev, images: result }));
      } else {
        setFormData((prev) => ({ ...prev, datasheet: result }));
      }
    };
    reader.readAsDataURL(file);
  }, []);
  if (!isOpen) return null;
  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.product_name.trim()) {
      newErrors.product_name = "Product name is required";
    }

    if (!formData.product_description.trim()) {
      newErrors.product_description = "Product description is required";
    }

    if (
      isNaN(parseFloat(formData.price_usd)) ||
      parseFloat(formData.price_usd) < 0
    ) {
      newErrors.price_usd = "Valid USD price is required";
    }

    if (
      isNaN(parseFloat(formData.price_zwl)) ||
      parseFloat(formData.price_zwl) < 0
    ) {
      newErrors.price_zwl = "Valid ZWL price is required";
    }

    if (formData.category_id === 0) {
      newErrors.category_id = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (!isEditMode) {
        formData.product_id = Math.floor(Math.random() * 1000) + 100;
      }

      const updatedFormData = {
        ...formData,
        product_benefits: benefits.join("|"),
      };

      onSubmit(updatedFormData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl transform transition-all opacity-100 scale-95 animate-[fadeIn_0.3s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 className="text-2xl font-bold text-navy-800">
            {isEditMode ? "Update Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.product_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.product_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.product_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="product_description"
                  value={formData.product_description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.product_description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.product_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.product_description}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Benefits
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Enter a benefit"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddBenefit())
                      }
                    />
                    <button
                      type="button"
                      onClick={handleAddBenefit}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-50 p-2 rounded-md"
                      >
                        <span className="flex-1">{benefit}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefit(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    isDraggingImage
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-500"
                  }`}
                  onDragOver={(e) => handleDragOver(e, "image")}
                  onDragLeave={() => handleDragLeave("image")}
                  onDrop={(e) => handleDrop(e, "image")}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileInput(e, "image")}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop an image here, or click to select
                    </p>
                  </label>
                  {formData.images && (
                    <div className="mt-4">
                      <img
                        src={formData.images}
                        alt="Product preview"
                        className="max-h-40 mx-auto rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    errors.category_id ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="0">Select a category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category_id}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price_usd"
                    value={formData.price_usd}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.price_usd ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.price_usd && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price_usd}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Price (ZWL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price_zwl"
                    value={formData.price_zwl}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.price_zwl ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.price_zwl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price_zwl}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Warranty (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  name="product_warranty"
                  value={formData.product_warranty}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Datasheet
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    isDraggingDatasheet
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-500"
                  }`}
                  onDragOver={(e) => handleDragOver(e, "datasheet")}
                  onDragLeave={() => handleDragLeave("datasheet")}
                  onDrop={(e) => handleDrop(e, "datasheet")}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileInput(e, "datasheet")}
                    id="datasheet-upload"
                  />
                  <label htmlFor="datasheet-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop a datasheet here, or click to select
                    </p>
                  </label>
                  {formData.datasheet && (
                    <div className="mt-2 text-sm text-gray-600">
                      Datasheet uploaded successfully
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier_name"
                  value={formData.supplier_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={isEditMode}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md transition-colors text-white"
            >
              {isEditMode ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
