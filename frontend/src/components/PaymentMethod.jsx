import { useCartStore } from "../stores/useCartStore";
import axios from "axios";

// Example exchange rate (ZAR to USD) – replace with actual API if needed
const EXCHANGE_RATE = 0.053; // Example rate: 1 ZAR = 0.053 USD

const HandleSubmit = async (e, totalCourier) => {
  e.preventDefault();  // Prevent default form submission

  // Ensure totalCourier is a valid number
  if (isNaN(totalCourier) || totalCourier <= 0) {
    alert("Invalid amount.");
    return;
  }

  // Convert totalCourier (ZAR) to USD
  const totalInUSD = totalCourier * EXCHANGE_RATE;

  try {
    // Send POST request to the payment endpoint with totalInUSD in the request body
    let res = await axios.post("http://localhost:5000/payment", {
      totalAmount: totalInUSD,  // Pass the converted USD value
    });

    // Log the response for debugging
    console.log("PayPal Response:", res.data);

    // Ensure there is a response and valid links array
    if (res && res.data && res.data.links && res.data.links.length > 0) {
      // Get the approval URL (you may need to adjust this index based on the response structure)
      let link = res.data.links[1]?.href || res.data.links[0]?.href;
      
      // Redirect to the payment page using the URL from the response
      if (link) {
        window.open(link, "_blank"); // Opens PayPal in a new tab

      } else {
        alert("Payment link not found.");
      }
    } else {
      alert("Error: Invalid payment response.");
    }
  } catch (error) {
    console.error("Error during payment request:", error);
    alert("Payment failed. Please try again.");
  }
};

const PaymentButton = () => {
  const { totalWithCourier } = useCartStore();  // Get the totalCourier value from the store

  return (
    <div>
      {/* Display totalWithCourier */}
      <p>Total Amount: ZAR {totalWithCourier}</p>
      <p>Total Amount in USD: ${totalWithCourier * EXCHANGE_RATE}</p>  {/* Display USD value */}

      <button
        onClick={(e) => HandleSubmit(e, totalWithCourier)}  // Pass totalWithCourier when calling HandleSubmit
        className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transform transition-all duration-300 ease-in-out"
      >
        Buy Now!
      </button>
    </div>
  );
};

export default PaymentButton;
