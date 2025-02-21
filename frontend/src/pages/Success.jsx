import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token"); // PayPal paymentId
    const payerId = searchParams.get("PayerID"); // PayPal PayerID

    if (!token || !payerId) {
      console.error("Missing token or PayerID");
      return;
    }

    // Send paymentId and PayerID to the backend to execute the payment
    const confirmPayment = async () => {
      try {
        const response = await axios.post(
          "https://vdh-promotions.onrender.com/success",
          { paymentId: token, payerId }
        );

        if (response.data.status === "success") {
          console.log("Payment confirmed successfully!");
        } else {
          console.error("Payment confirmation failed.");
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <a
          href="/" // Link to the homepage
          className="inline-block bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default Success;