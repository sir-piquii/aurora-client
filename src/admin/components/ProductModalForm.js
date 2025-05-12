import React, { useState, useEffect, useCallback } from "react";
import { X, Upload, FileText } from "lucide-react";
import { BASE_URL, getProductCategories, getMinBrandsDetails } from "../../api";

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
  product_warranty: "",
  quantity: 0,
  supplier_id: 1,
  supplier_name: "Deye",
};

const ProductFormModal = ({
  product,
  isOpen,
  onClose,
  onSubmit,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState(product || DEFAULT_PRODUCT);
  const [benefits, setBenefits] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [newDatasheet, setNewDatasheet] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (product) {
      setFormData(product);
      if (product.product_benefits) {
        setBenefits(
          product?.product_benefits.split("\n").filter((b) => b.trim())
        );
      }
    } else {
      setFormData(DEFAULT_PRODUCT);
      setBenefits([]);
    }
  }, [product]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getProductCategories();
        setProductCategories(data);
      } catch (error) {
        error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getMinBrandsDetails();
        setBrands(data);
      } catch (error) {
        error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDraggingImage(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingImage(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDraggingImage(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      setNewImages((prevImages) => [...prevImages, ...files]);
    }
  }, []);
  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImages([...newImages, ...Array.from(e.target.files)]);
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditMode) {
      formData.product_id = Math.floor(Math.random() * 1000) + 100;
    }
    const updatedFormData = {
      ...formData,
      product_benefits: benefits.join("\n"),
      newImages: newImages,
      newDatasheet: newDatasheet,
    };
    onSubmit(updatedFormData);
    onClose();
    setFormData(DEFAULT_PRODUCT);
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
              {/* Product Name */}
              <div className="mb-4">
                <label
                  htmlFor="product_name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="product_name"
                  required
                  value={formData.product_name}
                  onChange={(e) =>
                    setFormData({ ...formData, product_name: e.target.value })
                  }
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300`}
                />
              </div>
              {/* Product Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="product_description"
                  value={formData.product_description}
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      product_description: e.target.value,
                    })
                  }
                  rows={5}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300`}
                />
              </div>
              {/* Product Benefits */}
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
              {/* Product Images */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Images
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    isDraggingImage
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-500"
                  }`}
                  onDragOver={(e) => handleDragOver(e)}
                  onDragLeave={() => handleDragLeave()}
                  onDrop={(e) => handleDrop(e)}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    max={3}
                    onChange={(e) => handleFileInput(e)}
                    id="image-upload"
                    required={!formData.images}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop an image here, or click to select
                    </p>
                  </label>
                  {formData.images && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {formData.images.split(",").map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`${BASE_URL}/products/${img}`}
                            alt="Product preview"
                            className="max-h-40 mx-auto rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedImages = formData.images
                                .split(",")
                                .filter((_, i) => i !== index)
                                .join(",");
                              setFormData((prev) => ({
                                ...prev,
                                images: updatedImages,
                              }));
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      {newImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(img)}
                            alt="Product preview"
                            className="max-h-40 mx-auto rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedImages = newImages.filter(
                                (_, i) => i !== index
                              );
                              setNewImages(updatedImages);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Category selection */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  name="category"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300`}
                >
                  <option value="0">Select a category</option>
                  {productCategories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              {/* Pricing details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="price_usd"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price_usd"
                    required
                    value={formData.price_usd}
                    onChange={(e) =>
                      setFormData({ ...formData, price_usd: e.target.value })
                    }
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="price_zwl"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Price (ZWL) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price_zwl"
                    value={formData.price_zwl}
                    onChange={(e) =>
                      setFormData({ ...formData, price_zwl: e.target.value })
                    }
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300`}
                  />
                </div>
              </div>
              {/* Quantity and Discount */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="discount"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="discount"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-red-700 font-medium mb-2"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="quantity"
                    readOnly={isEditMode}
                    disabled={isEditMode}
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {isEditMode && (
                    <span className="text-sm text-red-700">
                      This field is locked for stock management purposes.
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="product_warranty"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Warranty Information
                </label>
                <textarea
                  name="product_warranty"
                  value={formData.product_warranty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      product_warranty: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {/* Datasheet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Datasheet
                </label>
                {formData.datasheet || newDatasheet ? (
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600">
                        {newDatasheet ? newDatasheet.name : "Current Datasheet"}
                      </span>
                    </div>
                    <button
                      title="Remove Brochure"
                      type="button"
                      onClick={() => {
                        if (newDatasheet) {
                          setNewDatasheet(null);
                        } else {
                          setFormData({ ...formData, datasheet: "" });
                        }
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center w-full h-20 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-500 focus:outline-none">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Click to upload datasheet
                      </span>
                    </div>
                    <input
                      type="file"
                      name="datasheet"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setNewDatasheet(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
              {/* Brand Details */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  name="category"
                  value={formData.supplier_id}
                  onChange={(e) =>
                    setFormData({ ...formData, supplier_id: e.target.value })
                  }
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 border-gray-300`}
                >
                  <option value="0">Select a Brand</option>
                  {brands?.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
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
