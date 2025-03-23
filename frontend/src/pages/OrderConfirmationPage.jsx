import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  // Dummy address structure
  const dummyAddress = {
    recipientName: "John Doe",  // Dummy name
    address: "123 Dummy St",    // Dummy address
    city: "Sample City",        // Dummy city
    postalCode: "12345",        // Dummy postal code
    country: "Country",         // Dummy country
    phone: "+1 234 567 8901",   // Dummy phone
  };

  // Check if the shipping address is a dummy address
  const isDummyAddress = (shippingAddress) => {
    return (
      shippingAddress.recipientName === dummyAddress.recipientName &&
      shippingAddress.address === dummyAddress.address &&
      shippingAddress.city === dummyAddress.city &&
      shippingAddress.postalCode === dummyAddress.postalCode &&
      shippingAddress.country === dummyAddress.country &&
      shippingAddress.phone === dummyAddress.phone
    );
  };

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to the order date
    return orderDate.toLocaleDateString();
  };

  // Function to format printOptions into a readable string
  const formatPrintOptions = (printOptions) => {
    if (!printOptions || typeof printOptions !== "object")
      return "No options selected";

    return Object.entries(printOptions)
      .filter(([, value]) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "object")
          return Object.values(value).some((v) => v > 0);
        return value && value !== "";
      })
      .map(([key, value]) => {
        // Convert camelCase or snake_case keys to spaced words with capital letters
        const formattedKey = key
          .replace(/([A-Z])/g, " $1") // Add space before uppercase letters (camelCase)
          .replace(/_/g, " ") // Replace underscores with spaces (snake_case)
          .trim()
          .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

        // Format values
        if (Array.isArray(value) && value.length === 1)
          return `${formattedKey}: ${value[0]}`;
        if (Array.isArray(value)) return `${formattedKey}: ${value.join(", ")}`;
        if (typeof value === "object")
          return `${formattedKey}: ${JSON.stringify(value)}`;
        return `${formattedKey}: ${value}`;
      })
      .map((option) => (
        <li key={option} className="text-sm text-gray-500">
          {option}
        </li>
      )); // Display each option in a list
  };

  return (
    <div className="min-h-screen -mt-1 bg-black text-white">
      {/* Make the whole page black */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-black">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-green-500 mb-6 sm:mb-8">
          Thank You for Your Order!
        </h1>

        {checkout && (
          <div className="p-4 sm:p-6 rounded-lg bg-white border">
            {/* Added email instruction here */}
            <div className="mb-4 bg-yellow-100 p-3 rounded-lg">
              <p className="text-sm sm:text-base text-gray-700">
                Please email all relevant images to:{" "}
                <a
                  href="mailto:vanderholtzpromotions@gmail.com"
                  className="text-green-600 hover:text-green-800 underline"
                >
                  vanderholtzpromotions@gmail.com
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mb-10 sm:mb-20">
              {/* Order Id and Date */}
              <div className="mb-4 sm:mb-0">
                <h2 className="text-lg sm:text-xl text-green-500 font-semibold">
                  Order ID: {checkout._id}
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                  Order date: {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
                {/* Total Price Paid */}
                <p className="text-green-500 text-sm sm:text-lg mt-1">
                  Total Paid: R{checkout.totalPrice?.toLocaleString()}
                </p>
              </div>
              {/* Estimated Delivery */}
              <div>
                <p className="text-sm sm:text-base text-green-700">
                  Estimated Delivery:{" "}
                  {calculateEstimatedDelivery(checkout.createdAt)}
                </p>
              </div>
            </div>
            {/* Ordered Items */}
            <div className="mb-10 sm:mb-20">
              {checkout.checkoutItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row text-black items-start sm:items-center mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mb-2 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-md font-semibold">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.color} | {item.size}
                    </p>
                    {/* Display printOptions */}
                    <div className="text-xs sm:text-sm text-gray-500">
                      <span className="font-semibold text-green-500">
                        Selected Options:
                      </span>
                      <ul className="list-none pl-0">
                        {formatPrintOptions(item.printOptions)}{" "}
                        {/* Pass printOptions for each item */}
                      </ul>
                    </div>
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <p className="text-sm sm:text-md">R{item.price}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Payment and Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              {/* Payment Info */}
              <div>
                <h4 className="text-md sm:text-lg text-black font-semibold mb-2">
                  Payment
                </h4>
                <p className="text-sm sm:text-base text-gray-600">PayPal</p>
              </div>

              {/* Delivery Info */}
              <div>
                <h4 className="text-md sm:text-lg text-black font-semibold mb-2">
                  Delivery
                </h4>
                {checkout.shippingAddress && isDummyAddress(checkout.shippingAddress) ? (
                  <p className="text-sm sm:text-base text-gray-600">
                    Pick up from store
                  </p>
                ) : (
                  <>
                    <p className="text-sm sm:text-base text-gray-600">
                      {checkout.shippingAddress?.address}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      {checkout.shippingAddress?.city},{" "}
                      {checkout.shippingAddress?.country}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;