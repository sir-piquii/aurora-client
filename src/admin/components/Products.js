/**
 * ProductHeader component renders the header section for the product management page,
 * including the title, description, and "Add Product" button.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onAddProduct - Callback to open the add product modal.
 * @returns {JSX.Element}
 */

/**
 * Products component manages the product listing, filtering, searching, pagination,
 * and CRUD operations for products in the admin panel.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @example
 * <Products />
 *
 * @description
 * - Fetches products and categories from the API.
 * - Supports filtering by category, searching by product name, and pagination.
 * - Handles adding, updating, and deleting products.
 * - Displays a modal form for adding new products.
 * - Shows loading spinner while fetching or processing data.
 *
 * @state
 * @property {boolean} isFormModalOpen - Controls visibility of the add product modal.
 * @property {boolean} isLoading - Indicates if data is being loaded or processed.
 * @property {Array<Object>} products - List of products to display.
 * @property {Array<Object>} productCategories - List of product categories.
 * @property {number} selectedCategory - Currently selected category ID for filtering.
 * @property {number} currentPage - Current page number for pagination.
 * @property {number} pageCount - Total number of products (for pagination).
 * @property {number} productsPerPage - Number of products per page.
 * @property {string} search - Search query for filtering products by name.
 *
 * @function handleDelete
 * @param {number} productId - ID of the product to delete.
 * @description Handles deletion of a product after user confirmation.
 *
 * @function handleUpdateProduct
 * @param {Object} product - Product data to update.
 * @description Handles updating product details, images, and datasheet.
 *
 * @function handleUpdateProductImages
 * @param {number} productId - ID of the product.
 * @param {Array<File>} newImages - Array of new image files to upload.
 * @description Handles uploading new product images.
 *
 * @function handleUploadDatasheet
 * @param {number} productId - ID of the product.
 * @param {File} datasheetFile - Datasheet file to upload.
 * @description Handles uploading a new datasheet for the product.
 *
 * @function handleAddProduct
 * @param {Object} product - New product data from the form.
 * @description Handles adding a new product and uploading its datasheet if provided.
 *
 * @function paginate
 * @param {number} pageNumber - Page number to navigate to.
 * @description Sets the current page for pagination.
 */
import { useEffect, useState } from "react";
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
import { Plus, Loader, Search } from "lucide-react";
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
      <div className="px-4 space-y-4 mb-6">
        {/* Category filter - scrollable on mobile */}
        <div className="relative mt-5">
          <div className="overflow-x-auto pb-2 -mx-1 hide-scrollbar">
            <nav className="flex whitespace-nowrap px-1">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  setSelectedCategory(0);
                }}
                className={`px-4 py-2 rounded-md mr-2 min-w-max text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === 0
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Products
              </button>

              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setCurrentPage(1);
                    setSelectedCategory(category.id);
                  }}
                  className={`px-4 py-2 rounded-md mr-2 min-w-max text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Search bar - fully responsive */}
        <div className="relative">
          <div className="relative w-full sm:max-w-md ml-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
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
