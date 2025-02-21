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

    let res = await axios.post("http://localhost:5000/payment", {
      totalAmount: totalInUSD,  // Pass the converted USD value
    });


    console.log(res);
    if (res && res.data){
      
      let link = res.data.links[1].href
        window.location.href = link
    }
}

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
