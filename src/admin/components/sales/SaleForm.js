import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Button from "../../UI/Button";
import ProductRow from "./ProductRow";

const DEFAULT_PRODUCT = {
  price: 0,
  product: "",
  quantity: 1,
  subtotal: 0,
};

const INITIAL_SALE = {
  transaction: "",
  recorder: "",
  recorder_id: 0,
  customer_name: "",
  customer_company: "",
  customer_email: "",
  customer_phone: "",
  total_amount: "0.00",
  transaction_date: new Date().toISOString(),
  sale_type: "walk-in",
  products: [{ ...DEFAULT_PRODUCT }],
};

const SaleForm = ({ sale, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(sale || INITIAL_SALE);
  const [currentTab, setCurrentTab] = useState("customer");
  const [errors, setErrors] = useState({});

  // Generate a random transaction ID if creating a new sale
  useEffect(() => {
    if (!sale) {
      const transactionId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      setFormData((prev) => ({
        ...prev,
        transaction: transactionId,
        transaction_date: new Date().toISOString(),
      }));
    }
  }, [sale]);

  // Calculate total amount whenever products change
  useEffect(() => {
    const total = formData.products.reduce(
      (sum, product) => sum + product.subtotal,
      0
    );
    setFormData((prev) => ({
      ...prev,
      total_amount: total.toFixed(2),
    }));
  }, [formData.products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { ...DEFAULT_PRODUCT }],
    }));
  };

  const handleProductChange = (index, updatedProduct) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = updatedProduct;

    setFormData((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  const handleRemoveProduct = (index) => {
    // Don't remove if it's the only product
    if (formData.products.length <= 1) return;

    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer validation
    if (!formData.customer_name)
      newErrors.customer_name = "Customer name is required";
    if (!formData.customer_email) {
      newErrors.customer_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
      newErrors.customer_email = "Email is invalid";
    }
    if (!formData.customer_phone)
      newErrors.customer_phone = "Phone number is required";

    // Products validation
    const invalidProducts = formData.products.filter(
      (p) => !p.product || p.price <= 0 || p.quantity <= 0
    );

    if (invalidProducts.length > 0) {
      newErrors.products = "All product details must be completed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            type="button"
            onClick={() => setCurrentTab("customer")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              currentTab === "customer"
                ? "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Customer Information
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab("products")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              currentTab === "products"
                ? "border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            Products
          </button>
        </nav>
      </div>

      {/* Customer Information Tab */}
      {currentTab === "customer" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="customer_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Customer Name*
              </label>
              <input
                id="customer_name"
                name="customer_name"
                type="text"
                value={formData.customer_name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.customer_name
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.customer_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.customer_name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="customer_company"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Company
              </label>
              <input
                id="customer_company"
                name="customer_company"
                type="text"
                value={formData.customer_company}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="customer_email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email*
              </label>
              <input
                id="customer_email"
                name="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.customer_email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.customer_email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.customer_email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="customer_phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone*
              </label>
              <input
                id="customer_phone"
                name="customer_phone"
                type="tel"
                value={formData.customer_phone}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.customer_phone
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.customer_phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.customer_phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="sale_type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Sale Type
            </label>
            <select
              id="sale_type"
              name="sale_type"
              value={formData.sale_type}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="walk-in">Walk-in</option>
              <option value="website">Website</option>
              <option value="phone">Phone</option>
              <option value="referral">Referral</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="recorder"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Recorder
            </label>
            <input
              id="recorder"
              name="recorder"
              type="text"
              value={formData.recorder}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Products Tab */}
      {currentTab === "products" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            {errors.products && (
              <p className="mb-2 text-sm text-red-600">{errors.products}</p>
            )}

            <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Subtotal</div>
              <div className="col-span-1"></div>
            </div>

            <div className="space-y-2">
              {formData.products.map((product, index) => (
                <ProductRow
                  key={index}
                  product={product}
                  index={index}
                  onChange={handleProductChange}
                  onRemove={handleRemoveProduct}
                  isLast={index === formData.products.length - 1}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="ghost"
              className="mt-3 text-blue-900 dark:text-blue-400"
              leftIcon={<Plus size={16} />}
              onClick={handleAddProduct}
            >
              Add Another Product
            </Button>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  ${parseFloat(formData.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {sale ? "Update Sale" : "Create Sale"}
        </Button>
      </div>
    </form>
  );
};

export default SaleForm;
