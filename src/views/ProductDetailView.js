import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addQuotation } from '../api';

function ProductDetailView() {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedImage, setSelectedImage] = useState(null);
	const [userRole, setUserRole] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const storedUser = localStorage.getItem("user");
  let username = "";
  let email = "";
  let userId = null;
  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser);
      username = userObj.user?.username || "";
      email = userObj.user?.email || "";
      userId = userObj.user?.id || null;
    } catch (e) {
      console.error("Error parsing storedUser:", e);
    }
  }
  const [quoteForm, setQuoteForm] = useState({
    userId: userId || null,
    customer_name: username,
    customer_address: "",
    customer_email: email,
    customer_phone: "",
    notes: "",
    quantity: 1,
  });
  // Parse storedUser and extract username and email

  useEffect(() => {
    document.title = `Product Detail | Aurora`;
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.user?.role || null);

    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data[0]);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product?.images) {
      const imagesArray = product.images.split(",");
      setSelectedImage(imagesArray[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("cart");
    let cart = storedCart ? JSON.parse(storedCart) : null;
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    if (cart && cart.expires && now > cart.expires) {
      cart = null;
    }

    if (!cart) {
      cart = {
        items: [],
        expires: now + THIRTY_DAYS,
      };
    }

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

  const handleRequestQuote = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    setQuoteForm({ ...quoteForm, [e.target.name]: e.target.value });
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    const quotePayload = {
      userId: userId,
      customer_name: quoteForm.customer_name,
      customer_address: quoteForm.customer_address,
      customer_email: quoteForm.customer_email,
      customer_phone: quoteForm.customer_phone,
      notes: quoteForm.notes,
      products: [
        {
          product_id: product.product_id,
          quantity: parseInt(quoteForm.quantity, 10),
          name: product.product_name,
        },
      ],
    };

    try {
      await addQuotation(quotePayload);
      alert("Your quote request has been submitted successfully!");
      setShowModal(false);
      // Optionally reset form
      setQuoteForm({
        customer_name: "",
        customer_address: "",
        customer_email: "",
        customer_phone: "",
        notes: "",
        quantity: 1,
      });
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Failed to submit quote. Please try again.");
    }
  };

	const displayPrice =
		userRole === 'dealer' &&
		(product.price_usd !== '0.00' || product.price_zwl !== '0.00');

	return (
		<div className="flex flex-col items-center">
			{/* Header */}
			<div className="w-full h-24 flex items-center justify-center bg-gradient-to-r from-navy-900 to-navy-800">
				<h1 className="text-4xl font-bold text-white">
					Product Detail
				</h1>
			</div>

			{/* Content */}
			<div className="w-10/12 my-8 bg-white shadow-xl rounded-lg p-6">
				{loading ? (
					<p className="text-gray-600 text-center">
						Loading product details...
					</p>
				) : product ? (
					<div className="flex flex-col md:flex-row">
						{/* Images */}
						<div className="md:w-1/2">
							<img
								src={`https://dev-api.auroraenergy.co.zw/products/${selectedImage}`}
								alt={product.product_name}
								className="w-full h-[50rem] object-cover rounded-md"
							/>
							{/* Thumbnails */}
							{product.images &&
								product.images.split(',').length > 1 && (
									<div className="flex space-x-2 mt-4">
										{product.images
											.split(',')
											.map((img, idx) => (
												<img
													key={idx}
													src={`https://dev-api.auroraenergy.co.zw/products/${img}`}
													alt={`Thumbnail ${idx + 1}`}
													onClick={() =>
														setSelectedImage(img)
													}
													className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-75"
												/>
											))}
									</div>
								)}
						</div>

						{/* Info */}
						<div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
							<h2 className="text-3xl font-bold text-gray-800">
								{product.product_name}
							</h2>

							<div className="mt-4">
								<p className="text-lg font-medium text-navy-900">
									Stock: {product.quantity}
								</p>
							</div>

							{displayPrice && (
								<div className="mt-4">
									{product.price_usd !== '0.00' && (
										<p className="text-lg font-medium text-navy-900">
											Price (USD): ${product.price_usd}
										</p>
									)}
									{product.price_zwl !== '0.00' && (
										<p className="text-lg font-medium text-navy-900">
											Price (ZWL): ZWL {product.price_zwl}
										</p>
									)}
								</div>
							)}

							<div className="mt-6">
								<h3 className="text-2xl font-bold text-gray-800">
									Description
								</h3>
								<p className="mt-2 text-gray-700">
									{product.product_description}
								</p>
							</div>

							<div className="mt-6">
								<h3 className="text-2xl font-bold text-gray-800">
									Benefits
								</h3>
								<p className="mt-2 whitespace-pre-wrap text-gray-700">
									{product.product_benefits}
								</p>
							</div>

							{product.product_warranty && (
								<div className="mt-6">
									<h3 className="text-2xl font-bold text-gray-800">
										Warranty
									</h3>
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

							<div className="flex space-x-4 mt-6">
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
					<p className="text-gray-600 text-center">
						Product not found.
					</p>
				)}
			</div>

			{/* Quote Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
						<h2 className="text-2xl font-semibold mb-4">
							Request a Quote
						</h2>
						<form
							onSubmit={handleQuoteSubmit}
							className="space-y-4"
						>
							<div>
								<label className="block text-gray-700 mb-1">
									Customer Name
								</label>
								<input
									type="text"
									name="customer_name"
									value={quoteForm.customer_name}
									onChange={handleChange}
									required
									className="w-full border p-2 rounded"
								/>
							</div>

							<div>
								<label className="block text-gray-700 mb-1">
									Customer Address
								</label>
								<input
									type="text"
									name="customer_address"
									value={quoteForm.customer_address}
									onChange={handleChange}
									required
									className="w-full border p-2 rounded"
								/>
							</div>

							<div>
								<label className="block text-gray-700 mb-1">
									Customer Email
								</label>
								<input
									type="email"
									name="customer_email"
									value={quoteForm.customer_email}
									onChange={handleChange}
									required
									className="w-full border p-2 rounded"
								/>
							</div>

							<div>
								<label className="block text-gray-700 mb-1">
									Customer Phone
								</label>
								<input
									type="tel"
									name="customer_phone"
									value={quoteForm.customer_phone}
									onChange={handleChange}
									required
									className="w-full border p-2 rounded"
								/>
							</div>

							<div>
								<label className="block text-gray-700 mb-1">
									Notes (optional)
								</label>
								<textarea
									name="notes"
									value={quoteForm.notes}
									onChange={handleChange}
									className="w-full border p-2 rounded"
									rows={3}
								/>
							</div>

							<div>
								<label className="block text-gray-700 mb-1">
									Quantity
								</label>
								<input
									type="number"
									name="quantity"
									min="1"
									value={quoteForm.quantity}
									onChange={handleChange}
									className="w-full border p-2 rounded"
									required
								/>
							</div>

							<div className="flex justify-end gap-4 mt-4">
								<button
									type="button"
									onClick={() => setShowModal(false)}
									className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
								>
									Submit Request
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetailView;
