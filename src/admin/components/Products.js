import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../../api";
import ProductListings from "./ProductListings";
import { Plus } from "lucide-react";

// products header
const ProductHeader = ({ onAddProduct }) => {
  return (
    <div className="bg-navy-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Product Management</h1>
            <p className="text-navy-100">Manage your products efficiently</p>
          </div>

          <button
            onClick={onAddProduct}
            className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md flex items-center transition-colors duration-200"
          >
            <Plus size={18} className="mr-1" />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};
const Products = () => {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    document.title = "Products | Admin Panel";
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    document.title = "Products | Admin Panel";
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      const deleteProductAsync = async () => {
        try {
          await deleteProduct(productId);
          setProducts(
            products.filter((product) => product.product_id !== productId)
          );
          console.log("Product deleted successfully.");
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };
      deleteProductAsync();
    }
  };
  const handleUpdateProduct = (productId) => {
    // Handle product update logic here
    console.log("Update product with ID:", productId);
  };
  return (
    <>
      <ProductHeader onAddProduct={() => {}} />
      <ProductListings
        products={currentProducts}
        onDelete={handleDelete}
        onUpdate={handleUpdateProduct}
      />
    </>
  );
};

export default Products;
