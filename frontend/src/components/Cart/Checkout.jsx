import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";
import Courier from "./Courier";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    recipientName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [selectedCourier, setSelectedCourier] = useState("standard");

  // VAT rate (15%)
  const VAT_RATE = 0.15;

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    console.log(cart);
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // Toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculate subtotal (excluding VAT and courier)
  const calculateSubtotal = () => {
    return cart.products.reduce((total, product) => {
      const productTotal = product.price * product.quantity;
      return total + productTotal;
    }, 0);
  };

  // Calculate VAT amount
  const calculateVAT = () => {
    const subtotal = calculateSubtotal();
    return subtotal * VAT_RATE;
  };

  // Calculate total price including VAT and courier
  const calculateTotalPriceWithVATAndCourier = () => {
    const subtotal = calculateSubtotal();
    const vat = calculateVAT();
    const courierCost = selectedCourier === "express" ? 200 : 0;
    return subtotal + vat + courierCost;
  };

  // Format VAT for display
  const formattedVAT = calculateVAT().toLocaleString("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });

  // Handle checkout creation
  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    const isExpressCourier = selectedCourier === "express";
    const isDeliveryValid = Object.values(shippingAddress).every(
      (field) => field.trim() !== ""
    );

    // Ensure a courier is selected
    if (!selectedCourier) {
      showToast("Please select a courier option.");
      return;
    }

    if (isExpressCourier && !isDeliveryValid) {
      showToast("Please fill out all delivery fields for express shipping");
      return;
    }

    if (cart?.products?.length > 0) {
      const totalPrice = calculateTotalPriceWithVATAndCourier();
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            printOptions: product.printOptions,
            dimensions: product.dimensions,
            weight: product.weight, // Fixed: Replaced semicolon with colon
            price: product.price,
            image: product.image,
            name: product.name,
          })),
          shippingAddress: isExpressCourier ? shippingAddress : null,
          paymentMethod: "Paypal",
          totalPrice,
          courierOption: selectedCourier,
        })
      );

      if (res.payload?._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handleCourierChange = (option) => {
    setSelectedCourier(option);
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  // Calculate total weight
const calculateTotalWeight = () => {
  return cart.products.reduce((total, product) => {
    return total + (product.weight || 0); // Ensure weight exists
  }, 0);
};

// Calculate total dimensions (length x width x height)
const calculateTotalDimensions = () => {
  return cart.products.reduce(
    (total, product) => {
      if (product.dimensions) {
        total.length += product.dimensions.length || 0;
        total.width += product.dimensions.width || 0;
        total.height += product.dimensions.height || 0;
      }
      return total;
    },
    { length: 0, width: 0, height: 0 }
  );
};

// Inside your component, call these functions:
const totalWeight = calculateTotalWeight();
const totalDimensions = calculateTotalDimensions();

// Pass the calculated values to Courier component
<Courier
  onCourierChange={handleCourierChange}
  totalWeight={totalWeight}
  totalDimensions={totalDimensions}
/>;


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
        const formattedKey = key
          .replace(/([A-Z])/g, " $1")
          .replace(/_/g, " ")
          .trim()
          .replace(/\b\w/g, (char) => char.toUpperCase());

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
      ));
  };

  const convertToUSD = (amount) => {
    const conversionRate = 0.055;
    return (amount * conversionRate).toFixed(2);
  };

  const totalPrice = calculateTotalPriceWithVATAndCourier();
  const totalPriceUSD = convertToUSD(totalPrice);

  if (loading) return <p className="text-white">Loading cart ...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p className="text-white">Your cart is empty</p>;
  }

  return (
    <div className="bg-black -mt-1 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg animate-slide-in">
          {toastMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter bg-black text-white">
        {/* Left Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl uppercase mb-6">Checkout</h2>
          <form onSubmit={handleCreateCheckout}>
            <h3 className="text-lg mb-4">Contact Details</h3>
            <div className="mb-4">
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                value={user ? user.email : ""}
                className="w-full p-2 border rounded bg-gray-700 text-white"
                disabled
              />
            </div>
            {/* Conditionally render delivery fields */}
            {selectedCourier === "express" && (
              <>
                <h3 className="text-lg mb-4">Delivery Information</h3>
                <div>
                  <label className="block text-gray-300">Recipient Name</label>
                  <input
                    type="text"
                    value={shippingAddress.recipientName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        recipientName: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">Address</label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300">City</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded bg-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300">Postal Code</label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          postalCode: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded bg-gray-700 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">Country</label>
                  <input
                    type="text"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">Phone</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded bg-gray-700 text-white"
                    required
                  />
                </div>
              </>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg mb-4">Order Summary</h3>
          <div className="border-t border-gray-700 py-4 mb-4">
            {cart.products.map((product, index) => (
              <div
                key={index}
                className="flex items-start justify-between py-2 border-b border-gray-700"
              >
                <div className="flex items-start">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover mr-4"
                  />
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-green-500">
                      Selected Options:
                    </span>
                    <ul className="list-none pl-0">
                      {formatPrintOptions(product.printOptions)}
                    </ul>
                    {/* Add dimensions and weight */}
                    <div className="mt-2">
                      <p><strong>Dimensions:</strong> {product.dimensions ? `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height}` : 'Not available'}</p>
                      <p><strong>Weight:</strong> {product.weight ? `${product.weight} kg` : 'Not available'}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xl">R{product.price?.toLocaleString()}</p>
              </div>
            ))}
          </div>
          {/* VAT Display */}
          <div className="flex justify-between items-center text-lg mb-4">
            <p>Subtotal</p>
            <p>R{calculateSubtotal().toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-lg mb-4">
            <p>VAT (15%)</p>
            <p>+{formattedVAT}</p>
          </div>
          
          <Courier onCourierChange={handleCourierChange} />
          <div className="flex justify-between items-center text-lg mb-4">
            <p>Courier</p>
            <p>{selectedCourier === "express" ? "R200" : "R0.00"}</p>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t border-gray-700 pt-4">
            <p>Total</p>
            <p>R{totalPrice.toLocaleString()}</p>
          </div>

          {/* Continue to Payment Button */}
          <div className="mt-6">
            <p className="text-sm text-green-500 mb-4">
              For payment purposes, your amount will be converted to USD.
              Total: ${totalPriceUSD} USD
            </p>
          
            {!checkoutId ? (
              <button
                type="submit"
                onClick={handleCreateCheckout}
                className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
              >
                Continue to Payment
              </button>
            ) : (
              <PayPalButton
                amount={totalPriceUSD}
                onSuccess={handlePaymentSuccess}
                onError={() => showToast("Payment failed. Please try again.")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;