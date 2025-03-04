import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";

function ProductDetailView() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch product details from API
  useEffect(() => {
    document.title = `Product Detail | Aurora`;
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchProduct();
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [productId]);

  // Set the selected image to the first image in the list
  useEffect(() => {
    if (product && product.images) {
      const imagesArray = product.images.split(",");
      setSelectedImage(imagesArray[0]);
    }
  }, [product]);

  // Handle adding the product to the cart (with 30-day expiration)
  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("cart");
    let cart = storedCart ? JSON.parse(storedCart) : null;
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    // Reset cart if it has expired
    if (cart && cart.expires && now > cart.expires) {
      cart = null;
    }

    if (!cart) {
      cart = {
        items: [],
        expires: now + THIRTY_DAYS,
      };
    }

    // Check if product is already in the cart (using product_id or a similar unique identifier)
    const existingItem = cart.items.find(
      (item) => item.productId === product.product_id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId: product.product_id,
        productName: product.product_name,
        image: selectedImage,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  // Handle requesting a quote for the product
  const handleRequestQuote = () => {
    // Here you can add logic to send a quote request via an API call or open a modal
    alert(
      `Your quote request for "${product.product_name}" has been submitted!`
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Header/Banner */}
      <div className="w-full h-24 flex items-center justify-center bg-gradient-to-r from-navy-900 to-navy-800">
        <h1 className="text-4xl font-bold text-white">Product Detail</h1>
      </div>

      <div className="w-10/12 my-8 bg-white shadow-xl rounded-lg p-6">
        {loading ? (
          <p className="text-gray-600 text-center">
            Loading product details...
          </p>
        ) : product ? (
          <div className="flex flex-col md:flex-row">
            {/* Product Images Section */}
            <div className="md:w-1/2">
              <img
                src={`https://dev-api.auroraenergy.co.zw/products/${
                  selectedImage || "default-image.jpg"
                }`}
                alt={product.product_name}
                className="w-full h-[50rem] object-cover rounded-md"
              />
              {/* Thumbnails */}
              {product.images && product.images.split(",").length > 1 && (
                <div className="flex space-x-2 mt-4">
                  {product.images.split(",").map((img, index) => (
                    <img
                      key={index}
                      src={`https://dev-api.auroraenergy.co.zw/products/${img}`}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(img)}
                      className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Product Information Section */}
            <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
              <h2 className="text-3xl font-bold text-gray-800">
                {product.product_name}
              </h2>
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Description
                </h3>
                <p className="mt-2 text-gray-700">
                  {product.product_description}
                </p>
              </div>

              {/* New Sections: Benefits and Warranty */}
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-800">Benefits</h3>
                <p className="mt-2 text-wrap text-gray-700 whitespace-pre-wrap w-full">
                  {product.product_benefits}
                </p>
              </div>
              {product.product_warranty && (
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-800">Warranty</h3>
                  <p className="mt-2 text-gray-700">
                    {product.product_warranty}
                  </p>
                </div>
              )}

              {product.datasheet && (
                <a
                  href={`https://dev-api.auroraenergy.co.zw/datasheets/${product.datasheet}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-4 py-2 bg-navy-800 text-white rounded-md hover:bg-navy-900 transition"
                >
                  Download Datasheet
                </a>
              )}

              {/* Buttons: Add to Cart and Request a Quote */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-orange-500 to-navy-900 text-white px-4 py-2 rounded hover:text-orange-300 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleRequestQuote}
                  className="bg-gradient-to-r from-navy-900 to-orange-500 text-white px-4 py-2 rounded hover:text-orange-300 transition"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Product not found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetailView;
