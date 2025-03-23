import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Clock, Box } from "lucide-react";
import axios from "axios";

const Courier = ({ onCourierChange, products, fetchCheckoutData }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [, setCourierPrice] = useState(0);
  const [productWeights, setProductWeights] = useState([]); // Store individual weights

  // Memoize fetchProductWeights to prevent unnecessary re-renders
  const fetchProductWeights = useCallback(async () => {
    try {
      // Fetch checkout data to get quantities
      const checkoutData = await fetchCheckoutData();

      const weights = await Promise.all(
        products.map(async (product) => {
          // Fetch product details (including weight) from the backend
          const productResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`
          );
          const productWeight = productResponse.data.weight || 0; // Default to 0 if weight is missing

          // Find the quantity of this product in the checkout data
          const checkoutProduct = checkoutData.products.find(
            (item) => item.productId === product.productId
          );
          const quantity = checkoutProduct ? checkoutProduct.quantity : 1; // Default to 1 if quantity is missing

          return productWeight * quantity; // Multiply by quantity
        })
      );

      setProductWeights(weights);
    } catch (error) {
      console.error("Error fetching product weights or checkout data:", error);
      setProductWeights(products.map(() => 0)); // Set weights to 0 if there's an error
    }
  }, [fetchCheckoutData, products]);

  // Courier price brackets based solely on weight
  const calculateCourierPrice = (weight) => {
    if (weight <= 5) return 180;
    if (weight <= 15) return 270;
    if (weight <= 25) return 320;
    return 320 + Math.ceil((weight - 25) / 5) * 50; // Example for over 25kg
  };

  // Calculate total weight and courier price
  useEffect(() => {
    if (!products?.length) {
      setCourierPrice(0);
      setProductWeights([]);
      return;
    }

    // Fetch product weights when products change
    fetchProductWeights();
  }, [products, fetchProductWeights]); // Add fetchProductWeights to the dependencies

  // Update courier price when product weights change
  useEffect(() => {
    const totalWeight = productWeights.reduce((acc, weight) => acc + weight, 0);
    setCourierPrice(calculateCourierPrice(totalWeight));
  }, [productWeights]);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onCourierChange(value); // Pass the selected option to the parent component

    // If "Pick Up from Store" is selected, send the dummy address
    if (value === "pickup") {
      onCourierChange({
        type: "pickup",
        address: "123 Dummy Street, Dummy City, DC 12345",
      });
    }
  };

  return (
    <div className="border-t border-gray-600 pt-3">
      <p className="text-base font-bold text-green-500 mb-2">Courier Options</p>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-2 cursor-pointer">
          {/* Express Courier option */}
          <div
            onClick={() => handleOptionChange({ target: { value: "express" } })}
            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
              selectedOption === "express"
                ? "border-emerald-500 bg-emerald-700/20"
                : "border-gray-600"
            } w-full`}
          >
            <Clock size={20} className="text-emerald-400" />
            <span className="text-white text-sm">Express Courier</span>
          </div>
          {selectedOption === "express" && (
            <div className="text-s text-gray-400 pl-10">
              <p>Typically takes 3-5 days to deliver on completion of order.</p>
            </div>
          )}
        </label>

        {/* Pick Up from Store option */}
        <label className="flex flex-col gap-2 cursor-pointer">
          <div
            onClick={() => handleOptionChange({ target: { value: "pickup" } })}
            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
              selectedOption === "pickup"
                ? "border-green-500 bg-green-700/20"
                : "border-gray-600"
            } w-full`}
          >
            <Box size={20} className="text-green-400" />
            <span className="text-white text-sm">Pick Up from Store</span>
          </div>
          {selectedOption === "pickup" && (
            <div className="text-s text-gray-400 pl-10">
              <p>An will be sent out notifying you to collect your order.</p>
            </div>
          )}
        </label>
      </div>

      {/* Display individual product weights */}
      <div className="mt-3">
        <p className="text-base font-bold text-green-500 mb-2">Product Weights</p>
        {products.map((product, index) => (
          <p key={index} className="text-white text-sm">
            Product {index + 1}: {productWeights[index] || 0}kg
          </p>
        ))}
      </div>
    </div>
  );
};

Courier.propTypes = {
  onCourierChange: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired, // Ensure productId is passed
    })
  ).isRequired,
  fetchCheckoutData: PropTypes.func.isRequired, // Function to fetch checkout data
};

Courier.defaultProps = {
  products: [], // Default to an empty array if products are not passed
};

export default Courier;
