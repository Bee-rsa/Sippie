import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Failed = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("Unfortunately, your payment could not be processed.");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const errorCode = query.get("error");

    if (errorCode) {
      switch (errorCode) {
        case "payer_cancelled":
          setErrorMessage("You canceled the payment. Please try again.");
          break;
        case "payment_failed":
          setErrorMessage("Payment failed due to an issue with your card or PayPal account.");
          break;
        case "network_error":
          setErrorMessage("A network error occurred. Please check your connection and try again.");
          break;
        default:
          setErrorMessage("An unknown error occurred. Please contact support.");
      }
    }
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold">Payment Failed</h1>
        <p className="mt-2">{errorMessage}</p>
        <p className="mt-2">Please try again or contact support if the issue persists.</p>

        <div className="mt-4">
          <Link to="/" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Go Back Home
          </Link>
          <Link to="/checkout" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Failed;
