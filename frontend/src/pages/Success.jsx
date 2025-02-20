import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SuccessPayment = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log("Query Params:", Object.fromEntries(searchParams.entries()));

    if (searchParams.get("status") === "success") {
      alert("Payment successful!");
    } else {
      alert("Payment not confirmed. Check sandbox logs.");
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Payment Success</h1>
      <p>Thank you for your payment.</p>
    </div>
  );
};

export default SuccessPayment;
