import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // For the checkmark icon

const SuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Mock product data (replace with actual data from props or API)
  const product = {
    name: "Custom Printed T-Shirt",
    image: "https://example.com/tshirt.jpg",
    quantity: 2,
    price: 250,
  };

  // Countdown and redirect after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/"); // Redirect to homepage (or any other page)
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Success Message */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order has been successfully processed.
        </p>

        {/* Transaction Details */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-left">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Transaction ID:</span> TXN123456789
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Amount Paid:</span> R{product.price * product.quantity}
          </p>
        </div>

        {/* Product Details */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <div className="mt-4 flex items-center space-x-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="text-left">
              <p className="text-lg font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
              <p className="text-sm text-gray-600">Price: R{product.price} each</p>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mt-6 text-sm text-gray-600">
          Redirecting in <span className="font-semibold">{countdown}</span> seconds...
        </div>

        {/* Manual Redirect Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/")} // Redirect to homepage (or any other page)
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Go to Homepage Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;