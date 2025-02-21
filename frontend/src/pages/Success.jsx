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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6 text-base sm:text-lg">
          Your payment has been successfully processed. An email with your order details
          will be sent shortly. Thank you for your purchase.
        </p>
        <a
          href="/"
          className="inline-block bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm sm:text-base"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default Success;
