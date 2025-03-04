import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  // Reuse the formatPrintOptions function
  const formatPrintOptions = (printOptions) => {
    if (!printOptions || typeof printOptions !== "object") return "No options selected";

    return Object.entries(printOptions)
      .filter(([ , value]) => {
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "object") return Object.values(value).some((v) => v > 0);
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
        if (typeof value === "object") return `${formattedKey}: ${JSON.stringify(value)}`;
        return `${formattedKey}: ${value}`;
      })
      .map((option) => (
        <li key={option} className="text-sm text-gray-500">
          {option}
        </li>
      )); // Display each option in a list
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen -mt-1 bg-black text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl md:text-3xl text-green-500 font-bold mb-6">
          Order Details
        </h2>
        {!orderDetails ? (
          <p>No Order details found</p>
        ) : (
          <div className="p-4 sm:p-6 rounded-lg bg-white border border-gray-700">
            {/* Order Info */}
            <div className="flex flex-col sm:flex-row justify-between mb-8">
              <div>
                <h3 className="text-lg text-green-500 md:text-xl font-semibold">
                  Order ID: #{orderDetails._id}
                </h3>
                <p className="text-gray-400">
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                <span
                  className={`${
                    orderDetails.isPaid
                      ? "bg-green-300 text-green-700"
                      : "bg-red-900 text-red-700"
                  } px-3 py-1 rounded-full text-sm font-medium mb-2`}
                >
                  {orderDetails.isPaid ? "Approved" : "Pending"}
                </span>
                <span
                  className={`${
                    orderDetails.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  } px-3 py-1 rounded-full text-sm font-medium mb-2`}
                >
                  {orderDetails.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>
            </div>

            {/* Customer, Payment, Shipping Info */}
            <div className="grid grid-cols-1 text-black sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-lg text-black font-semibold mb-2">
                  Payment Info
                </h4>
                <p>Payment Method: {orderDetails.paymentMethod}</p>
                <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
              </div>
              {/* Shipping Info */}
              <div>
                <h4 className="text-lg text-black font-semibold mb-2">
                  Shipping Info
                </h4>
                <p>Recipient Name: {orderDetails.shippingAddress?.recipientName}</p>
                <p>Phone: {orderDetails.shippingAddress?.phone}</p>
                <p>Address: {orderDetails.shippingAddress?.address}</p>
                <p>City: {orderDetails.shippingAddress?.city}</p>
                <p>Postal Code: {orderDetails.shippingAddress?.postalCode}</p>
                <p>Country: {orderDetails.shippingAddress?.country}</p>
              </div>
            </div>

            {/* Print Options */}
            <div className="mb-8">
              <h4 className="text-lg text-black font-semibold mb-2">
                Print Options
              </h4>
              {orderDetails.orderItems?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {orderDetails.orderItems.map((item, index) => (
                    <div key={index} className="mb-4">
                      {/* Add Product Label (e.g., Product 1, Product 2) */}
                      <h5 className="font-medium text-green-500">
                        Product {index + 1}: {item.name}
                      </h5>
                      {item.printOptions ? (
                        <ul className="list-none pl-0 text-black">
                          {formatPrintOptions(item.printOptions)}
                        </ul>
                      ) : (
                        <p>No print options selected for this item.</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No items in this order.</p>
              )}
            </div>

            {/* Product List */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <table className="min-w-full text-gray-300 mb-4">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Unit Price</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map((item) => (
                    <tr
                      key={item.productId}
                      className="border-b text-gray-600 border-gray-600"
                    >
                      <td className="py-2 px-4 flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-blue-400 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4">R{item.price}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">R{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Back to Orders Link */}
            <Link to="/my-orders" className="text-blue-400 hover:underline">
              Back to My Orders
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;