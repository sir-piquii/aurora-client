import React, { useEffect, useState } from 'react';
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  getProductCategories,
  updateProduct,
  uploadProductDatasheet,
  updateProductImages,
} from "../../api";
import ProductListings from "./ProductListings";
import { Plus, Loader } from "lucide-react";
import { toast } from "sonner";
import ProductFormModal from "./ProductModalForm";
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
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const productsPerPage = 12;
  const [search, setSearch] = useState("");
  // Fetch products based on selected category and pagination
  useEffect(() => {
    document.title = "Products | Admin Panel";
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(
          selectedCategory,
          currentPage,
          productsPerPage
        );
        setProducts(data?.rows);
        setPageCount(data?.count);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, currentPage, productsPerPage]);
  // Fetch product categories
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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Handle product deletion
  const handleDelete = (productId) => {
    console.log("Deleting product with ID:", productId);
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
          toast.success("Product deleted successfully.");
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product.");
        }
      };
      deleteProductAsync();
    }
  };
  // Handle product updates
  const handleUpdateProduct = (product) => {
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("product_description", product.product_description);
    formData.append("product_benefits", product.product_benefits);
    formData.append("product_warranty", product.product_warranty);
    formData.append("price_usd", product.price_usd);
    formData.append("price_zwl", product.price_zwl);
    formData.append("discount", product.discount);
    formData.append("images", product.images);
    formData.append("datasheet", product.datasheet);
    formData.append("category_id", product.category_id);
    formData.append("supplier_id", product.supplier_id);
    setIsLoading(true);
    // Update the product using the API
    updateProduct(product.product_id, formData)
      .then(() => {
        toast.success("Product updated successfully.");
        if (product.newImages && product.newImages.length > 0) {
          handleUpdateProductImages(product.product_id, product.newImages);
        }
        if (product.newDatasheet) {
          handleUploadDatasheet(product.product_id, product.newDatasheet);
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Failed to update product.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Handle product image updates
  const handleUpdateProductImages = async (productId, newImages) => {
    const formData = new FormData();
    newImages.forEach((image, index) => {
      formData.append(`images`, image);
    });
    try {
      await updateProductImages(formData, productId);
      toast.success("Product images updated successfully.");
    } catch (error) {
      console.error("Error updating product images:", error);
      toast.error("Failed to update product images.");
    }
  };
  // Handle datasheet upload
  const handleUploadDatasheet = async (productId, datasheetFile) => {
    const formData = new FormData();
    formData.append("datasheet", datasheetFile);
    try {
      await uploadProductDatasheet(formData, productId);
      toast.success("Product datasheet uploaded successfully.");
    } catch (error) {
      console.error("Error uploading product datasheet:", error);
      toast.error("Failed to upload product datasheet.");
    }
  };
  // Filter products based on search input
  const filteredProducts = products.filter((product) => {
    return search
      ? product.product_name.toLowerCase().includes(search.toLowerCase())
      : product;
  });
  // Handle adding a new product
  // Open the modal for adding a new product
  const addNewProduct = () => {
    setIsFormModalOpen(true);
  };
  // Handle form submission for adding a new product
  // This function is called when the form is submitted
  const handleAddProduct = async (product) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", product.product_name);
    formData.append("description", product.product_description);
    formData.append("benefits", product.product_benefits);
    formData.append("warranty", product.product_warranty);
    formData.append("price_usd", product.price_usd);
    formData.append("price_zwl", product.price_zwl);
    formData.append("discount", product.discount);
    formData.append("category", product.category_id);
    formData.append("quantity", product.quantity);
    formData.append("supplier", product.supplier_id);
    product?.newImages.forEach((image) => {
      formData.append("images", image);
    });
    addProduct(formData)
      .then(({ productId }) => {
        console.log("Product added successfully:", productId);
        toast.success("Product added successfully.");
        setProducts((prevProducts) => [...prevProducts, product]);
        if (product.newDatasheet) {
          handleUploadDatasheet(productId, product.newDatasheet);
        }
        setIsFormModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        toast.error("Failed to add product.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <>
      <ProductHeader onAddProduct={addNewProduct} />
      <div className="mx-auto px-4 mt-4">
        {/* Category filter */}
        <div>
          <nav>
            <ul className="flex space-x-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(0)}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === 0
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  All
                </button>
              </li>
              {productCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(1);
                      setSelectedCategory(category.id);
                    }}
                    className={`px-4 py-2 rounded-md text-sm ${
                      selectedCategory === category.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {category.category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Search bar */}
        <div className="mt-4 flex justify-end">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 lg:w-1/4 xl:w-1/5"
          />
        </div>
      </div>
      <ProductListings
        products={filteredProducts}
        onDelete={handleDelete}
        onUpdate={handleUpdateProduct}
      />
      <ProductFormModal
        isOpen={isFormModalOpen}
        isEditMode={false}
        product={null}
        onSubmit={handleAddProduct}
        onClose={() => setIsFormModalOpen(false)}
      />
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex space-x-2">
            {Array.from(
              { length: Math.ceil(pageCount / productsPerPage) },
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      paginate(index + 1);
                      setCurrentPage(index + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-gray-600">
          Page {currentPage} of {Math.ceil(pageCount / productsPerPage)}
        </p>
      </div>
    </>
  );
};

export default Products;
