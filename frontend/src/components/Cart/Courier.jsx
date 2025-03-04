import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Clock } from "lucide-react";

const Courier = ({ onCourierChange, products }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [courierPrice, setCourierPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0); // Store total weight

  // Courier price brackets based solely on weight
  const calculateCourierPrice = (weight) => {
    if (weight <= 5) return 180;
    if (weight <= 15) return 270;
    if (weight <= 25) return 320;
    return 320 + Math.ceil((weight - 25) / 5) * 50; // Example for over 25kg
  };

  useEffect(() => {
    if (!products?.length) {
      setCourierPrice(0);
      setTotalWeight(0);
      return;
    }

    let totalWeightCalc = 0;

    // Calculate the total weight of all products
    products.forEach((product, index) => {
      const { weight, quantity = 1 } = product; // Access weight directly from product

      // Ensure weight exists
      if (weight) {
        totalWeightCalc += weight * quantity; // Multiply by quantity
      } else {
        console.error(`Product ${index + 1} is missing weight.`);
      }
    });

    // Update total weight state
    setTotalWeight(totalWeightCalc);

    // Calculate the courier price based on total weight
    const price = calculateCourierPrice(totalWeightCalc);
    setCourierPrice(price);
  }, [products]);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onCourierChange(value); // Pass the selected option to the parent component
  };

  return (
    <div className="border-t border-gray-600 pt-3">
      <p className="text-base font-bold text-green-500 mb-2">Courier Options</p>
      <div className="flex flex-col gap-3">
        {/* Express Courier Option */}
        <label className="flex flex-col gap-2 cursor-pointer">
          <input
            type="radio"
            value="express"
            checked={selectedOption === "express"}
            onChange={handleOptionChange}
            className="hidden"
          />
          <div
            className={`flex items-center gap-2 p-2 rounded-lg border ${
              selectedOption === "express"
                ? "border-emerald-500 bg-emerald-700/20"
                : "border-gray-600"
            } w-full`}
          >
            <Clock size={20} className="text-emerald-400" />
            <span className="text-white text-sm">
              Express Courier (R{courierPrice}) - {totalWeight}kg
            </span>
          </div>
          {selectedOption === "express" && (
            <div className="text-s text-gray-400 pl-10">
              <p>Typically takes 3-5 days to deliver on completion of order.</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

Courier.propTypes = {
  onCourierChange: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      weight: PropTypes.number.isRequired, // weight directly in product
      quantity: PropTypes.number, // Optional, default to 1
    })
  ).isRequired,
};

Courier.defaultProps = {
  products: [], // Default to an empty array if products is not passed
};

export default Courier;
