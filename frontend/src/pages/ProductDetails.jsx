import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import TableOfContents from "../components/TableOfContents"; // Import the TableOfContents component

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for PrintOptions functionality
  const [selectedOptions, setSelectedOptions] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // State for JobSummary functionality
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [images, setImages] = useState([]);

  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const productResponse = await axios.get(`/api/products/${productId}`);
        setProduct(productResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Extract product options and labels
  const { labels = {}, printPrice = {}, brandingPrice = {}, signsPrice = {}, ...otherOptions } = product || {};

  // Helper function to capitalize the first letter of each word
  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle changes in selected options
  const handleOptionChange = (optionName, value) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: value,
    };
    setSelectedOptions(newSelectedOptions);
  };

  // Calculate the total price based on selected options
  useEffect(() => {
    if (!product) return; // Early return only after all Hooks are declared

    let totalPrice = printPrice?.productPrice || brandingPrice?.productPrice || signsPrice?.productPrice || 0;

    Object.entries(selectedOptions).forEach(([optionName, optionValue]) => {
      if (printPrice?.[`${optionName}Prices`] && printPrice[`${optionName}Prices`][optionValue]) {
        totalPrice += printPrice[`${optionName}Prices`][optionValue];
      }

      if (brandingPrice?.[`${optionName}Prices`] && brandingPrice[`${optionName}Prices`][optionValue]) {
        totalPrice += brandingPrice[`${optionName}Prices`][optionValue];
      }

      if (signsPrice?.[`${optionName}Prices`] && signsPrice[`${optionName}Prices`][optionValue]) {
        totalPrice += signsPrice[`${optionName}Prices`][optionValue];
      }
    });

    setCalculatedPrice(totalPrice);
    setTotalPrice(totalPrice * quantity); // Update total price based on quantity
  }, [selectedOptions, product, printPrice, brandingPrice, signsPrice, quantity]);

  // Handle quantity increase
  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      setTotalPrice(newQuantity * calculatedPrice);
      return newQuantity;
    });
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev > 1 ? prev - 1 : 1;
      setTotalPrice(newQuantity * calculatedPrice);
      return newQuantity;
    });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }

    addToCart({
      ...product,
      quantity: quantity,
      price: totalPrice,
      images: images,
      selectedOptions: selectedOptions, // Include selected options
    });

    toast.success("Product added to cart!", { id: "addToCart" });

    navigate("/cart");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product data available.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Table of Contents */}
        <div className="lg:w-1/4">
          <TableOfContents /> {/* Using the TableOfContents component */}
        </div>

        {/* Product Details with Border */}
        <div className="lg:w-3/4 flex mt-20 flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-4 border border-gray-700 p-6 rounded-lg shadow-md">
            {/* Product Image with Border */}
            <div className="lg:w-1/2 mb-4 lg:mb-0">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Product Information (Name, Price, Description) */}
            <div className="lg:w-1/2">
              <div id="overview" className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
              </div>

              <div id="price" className="mb-4 border-b pb-4">
  <p className="text-2xl font-bold text-green-500">
    R{calculatedPrice.toFixed(2)} {/* Updated price based on selected options */}
  </p>
</div>

              <div id="description" className="mb-4">
                <p className="text-gray-400 text-m mb-2">{product?.description}</p>
              </div>

              <div id="category" className="mb-4">
                <p className="text-gray-500 text-sm">Category: {product?.category}</p>
              </div>
            </div>
          </div>

          {/* Print Options and Job Summary Section */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Print Options Section */}
            <div className="w-full p-4 border-2 border-gray-300 bg-gray-900 rounded-lg shadow-md">
              <h2 className="text-2xl md:text-3xl text-green-500 font-bold mb-4">Printing Options</h2>
              <h2 className="text-lg md:text-xl mb-4">Please fill out the information below</h2>

              <div className="product-options grid grid-cols-2 gap-4">
                {Object.entries(otherOptions).map(([optionKey, optionValues]) => {
                  const label = labels?.[optionKey] || optionKey;

                  return (
                    Array.isArray(optionValues) && optionValues.length > 0 && (
                      <div
                        key={optionKey}
                        className={`col-span-${optionValues.length % 2 === 1 && optionValues.length > 2 ? "2" : "1"}`}
                      >
                        <h3 className="text-base mb-2">{capitalizeFirstLetter(label.replace(/([A-Z])/g, " $1"))}</h3>
                        <select
                          value={selectedOptions[optionKey] || ""}
                          onChange={(e) => handleOptionChange(optionKey, e.target.value)}
                          className="w-full p-2 border rounded-lg text-black bg-green-600 appearance-none"
                        >
                          <option value="">Choose an option</option>
                          {optionValues.map((value, index) => (
                            <option key={index} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            {/* Job Summary Section */}
            <div className="w-full p-4 border-2 bg-gray-900 border-gray-300 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-left mb-4">Job Summary</h1>
              <h2 className="text-l text-left mb-4">See the total pricing and checkout</h2>

              <div className="total-price mb-4">
                <p className="text-3xl text-green-500">R{totalPrice.toFixed(2)}</p>
              </div>

              {/* Image Upload Section */}
              <div className="image-upload mb-4">
                <h3 className="text-xl font-semibold mb-2">Upload Images</h3>
                <label className="cursor-pointer flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  <FaPlus className="mr-2" /> Add Images
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Image Preview Grid */}
                {images.length > 0 && (
                  <div className="image-preview grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2 overflow-auto max-h-32">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt="Uploaded preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="quantity-selector mb-4 flex items-center">
                <h3 className="text-xl font-semibold mr-4">Quantity</h3>
                <button
                  onClick={handleDecrease}
                  className="p-2 border rounded-l-lg bg-green-500 hover:bg-green-700"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center p-2 border-t border-b"
                />
                <button
                  onClick={handleIncrease}
                  className="p-2 border rounded-r-lg bg-green-500 hover:bg-green-700"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="add-to-cart mt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;