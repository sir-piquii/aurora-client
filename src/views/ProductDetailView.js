import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';

function ProductDetailView() {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState(null);

	// Simulate API call to fetch product details
	useEffect(() => {
		document.title = `Product Detail | Aurora`;
		setLoading(true);
		const fetchProduct = async () => {
			try {
				const data = await getProductById(productId);
				setProduct(data[0]);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching product by ID:', error);
			}
		};

		const timer = setTimeout(() => {
			fetchProduct();
			setLoading(false);
		}, 500);
		return () => clearTimeout(timer);
	}, [productId]);

	useEffect(() => {
		if (product && product.images) {
			const imagesArray = product.images.split(',');
			setSelectedImage(imagesArray[0]);
		}
	}, [product]);

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
              {/* Display the selected image or a placeholder */}
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
              <div className="mt-4 flex items-baseline space-x-4">
                <span className="text-2xl font-semibold text-green-600">
                  ${parseFloat(product.price_usd).toFixed(2)}
                </span>
                <span className="text-lg text-gray-500">
                  ({parseFloat(product.price_zwl).toFixed(2)} ZWL)
                </span>
              </div>
              <p className="mt-6 text-gray-700 whitespace-pre-line">
                {product.product_description}
              </p>
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
