import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentId = query.get("paymentId");
    const payerId = query.get("PayerID");

    if (!paymentId || !payerId) {
      setError("Missing payment details.");
      setLoading(false);
      return;
    }

    fetch(`https://vdh-promotions.onrender.com/success?paymentId=${paymentId}&PayerID=${payerId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPaymentData(data);
        } else {
          setError("Payment verification failed.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("An error occurred while verifying payment.");
        setLoading(false);
      });

    // Countdown & redirect
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate, location.search]);

  if (loading) return <p>Loading payment details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">Thank you for your purchase. Your order has been successfully processed.</p>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-left">
          <p className="text-sm text-gray-700"><strong>Transaction ID:</strong> {paymentData.transactionId}</p>
          <p className="text-sm text-gray-700"><strong>Amount Paid:</strong> ${paymentData.amount}</p>
          <p className="text-sm text-gray-700"><strong>Currency:</strong> {paymentData.currency}</p>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Redirecting in <span className="font-semibold">{countdown}</span> seconds...
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Go to Homepage Now
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
