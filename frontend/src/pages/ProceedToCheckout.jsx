import { useState } from "react";

const ProceedToCheckOut = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("courier"); // Default to courier
  const [address, setAddress] = useState("");

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log("Delivery Method:", deliveryMethod);
    console.log("Address:", address);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Proceed to Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Delivery Address Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Details</h2>

            {/* Delivery Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Method
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDeliveryMethodChange("courier")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    deliveryMethod === "courier"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Courier
                </button>
                <button
                  onClick={() => handleDeliveryMethodChange("pickup")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                    deliveryMethod === "pickup"
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Pickup
                </button>
              </div>
            </div>

            {/* Delivery Address Input (Only for Courier) */}
            {deliveryMethod === "courier" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full delivery address"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Proceed to Payment
            </button>
          </div>

          {/* Right Column: Payment Options */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Options</h2>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <label htmlFor="creditCard" className="text-sm text-gray-700">
                  Credit/Debit Card
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <label htmlFor="paypal" className="text-sm text-gray-700">
                  PayPal
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="bankTransfer"
                  name="paymentMethod"
                  value="bankTransfer"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <label htmlFor="bankTransfer" className="text-sm text-gray-700">
                  Bank Transfer
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                />
                <label htmlFor="cashOnDelivery" className="text-sm text-gray-700">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProceedToCheckOut;