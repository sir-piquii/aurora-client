import { X } from "lucide-react";
import { BASE_URL } from "../../api";

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl transform transition-all opacity-100 scale-95 animate-[fadeIn_0.3s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-200 p-5">
          <h2 className="text-2xl font-bold text-navy-800">
            {product?.product_name || "Product Name Unavailable"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {product?.images ? (
                  <img
                    src={`${BASE_URL}/products/${product.images.split(",")[0]}`}
                    alt={product.product_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 italic">No image available</div>
                )}
              </div>

              <div className="bg-navy-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-navy-800 mb-2">
                  Pricing Information
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <span className="text-gray-500">USD Price:</span>
                    <p className="font-medium">
                      ${parseFloat(product?.price_usd || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">ZWL Price:</span>
                    <p className="font-medium">
                      ${parseFloat(product?.price_zwl || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Discount:</span>
                    <p className="font-medium">
                      {parseFloat(product?.discount || 0).toFixed(2)}%
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">In Stock:</span>
                    <p className="font-medium">{product.quantity}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-navy-800 mb-2">
                  Product Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">
                      {product?.category_name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p>
                      {product?.product_description ||
                        "No description available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Benefits</p>
                    <p>
                      {product?.product_benefits || "No benefits available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Warranty</p>
                    <p>{product?.product_warranty || "N/A"} years</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-700 mb-2">
                  Supplier Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Supplier</p>
                    <p className="font-medium">
                      {product?.supplier_name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Supplier ID</p>
                    <p className="font-medium">
                      {product?.supplier_id || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
