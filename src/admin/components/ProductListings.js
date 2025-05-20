import { useState } from "react";
import { Edit, Trash2, Info } from "lucide-react";
import ProductDetailsModal from "./ProductDetailModal";
import ProductFormModal from "./ProductModalForm";
import { BASE_URL } from "../../api";

//import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductListings = ({ products, onDelete, onUpdate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };
  const handleDelete = (productId) => {
    setProductToDelete(productId);
    onDelete(productId);
  };
  const handleUpdate = (updatedProduct) => {
    onUpdate(updatedProduct);
    setIsFormModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center relative">
              {product.images ? (
                <img
                  src={`${BASE_URL}/products/${product.images.split(",")[0]}`}
                  alt={product.product_name}
                  style={{ mixBlendMode: "multiply" }}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-navy-50 text-navy-400">
                  No Image Available
                </div>
              )}
              <div className="absolute top-2 right-2 bg-navy-800 text-white text-xs font-bold px-2 py-1 rounded">
                {product.category_name}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium text-navy-900 mb-1 truncate">
                {product.product_name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.product_description}
              </p>

              <div className="flex justify-between items-center">
                <div>
                  {product.price_usd !== "0.00" && (
                    <p className="font-semibold text-orange-500">
                      ${parseFloat(product.price_usd).toFixed(2)}
                    </p>
                  )}
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => handleViewDetails(product)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    title="View Details"
                  >
                    <Info size={18} className="text-navy-600" />
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    title="Edit Product"
                  >
                    <Edit size={18} className="text-orange-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.product_id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    title="Delete Product"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && isDetailsModalOpen && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
      {selectedProduct && isFormModalOpen && (
        <ProductFormModal
          product={selectedProduct}
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handleUpdate}
          isEditMode={true}
        />
      )}
      {/*
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={products.find(p => p.product_id === productToDelete)?.product_name || ''}
      /> */}
    </div>
  );
};

export default ProductListings;
