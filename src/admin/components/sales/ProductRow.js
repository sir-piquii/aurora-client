/**
 * ProductRow component renders a single row for a product in a sales form.
 * Allows editing of product name, price, quantity, and displays subtotal.
 * Also provides a button to remove the product row.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.product - The product object containing details for the row
 * @param {string} props.product.product - The name of the product
 * @param {number} props.product.price - The price of the product
 * @param {number} props.product.quantity - The quantity of the product
 * @param {number} props.product.subtotal - The subtotal for the product (price * quantity)
 * @param {number} props.index - The index of the product row in the list
 * @param {function} props.onChange - Callback when any product field changes (index, updatedProduct) => void
 * @param {function} props.onRemove - Callback when the product row is removed (index) => void
 * @param {boolean} props.isLast - Whether this is the last product row (affects styling)
 *
 * @returns {JSX.Element} The rendered product row
 */
import { Trash } from "lucide-react";

const ProductRow = ({ product, index, onChange, onRemove, isLast }) => {
  // Calculate subtotal whenever price or quantity changes
  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value) || 0;
    onChange(index, {
      ...product,
      price: newPrice,
      subtotal: calculateSubtotal(newPrice, product.quantity),
    });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 0;
    onChange(index, {
      ...product,
      quantity: newQuantity,
      subtotal: calculateSubtotal(product.price, newQuantity),
    });
  };

  const handleProductChange = (e) => {
    onChange(index, {
      ...product,
      product: e.target.value,
    });
  };

  return (
    <div
      className={`grid grid-cols-12 gap-2 items-center ${
        !isLast ? "mb-3 pb-3 border-b border-gray-200 dark:border-gray-700" : ""
      }`}
    >
      <div className="col-span-5">
        <input
          type="text"
          value={product.product}
          onChange={handleProductChange}
          placeholder="Product name"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div className="col-span-2">
        <div className="relative">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            $
          </span>
          <input
            type="number"
            value={product.price}
            onChange={handlePriceChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full p-2 pl-6 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />
        </div>
      </div>
      <div className="col-span-2">
        <input
          type="number"
          value={product.quantity}
          onChange={handleQuantityChange}
          placeholder="0"
          min="1"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div className="col-span-2">
        <div className="flex items-center">
          <span className="text-orange-600 dark:text-orange-400 font-medium">
            ${product.subtotal.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="col-span-1 flex justify-end">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          aria-label="Remove product"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
