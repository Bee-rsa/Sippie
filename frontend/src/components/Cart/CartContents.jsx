import PropTypes from "prop-types";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Helper function to normalize printOptions
  const normalizePrintOptions = (printOptions) => {
    return {
      sides: printOptions.sides || [],
      paperFinish: printOptions.paperFinish || [],
      paperWeight: printOptions.paperWeight || [],
      standardSizes: printOptions.standardSizes || [],
      lamination: printOptions.lamination || [],
      cornerType: printOptions.cornerType || [],
      layout: printOptions.layout || [],
      material: printOptions.material || [],
      printingType: printOptions.printingType || [],
      finishingOptions: printOptions.finishingOptions || [],
      printingPreferences: printOptions.printingPreferences || [],
      sizes: printOptions.sizes || [],
      colors: printOptions.colors || [],
      gender: printOptions.gender || [],
      printBack: printOptions.printBack || [],
      printFront: printOptions.printFront || [],
      weight: printOptions.weight || 0,
    };
  };

  const handleAddToCart = (productId, delta, quantity, dimensions, weight, printOptions, price) => {
    const newQuantity = quantity + delta;
    const normalizedPrintOptions = normalizePrintOptions(printOptions);

    if (newQuantity >= 1) {
      // Update the quantity if it's greater than or equal to 1
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          dimensions,
          weight,
          printOptions: normalizedPrintOptions, // Use normalized printOptions
          price: parseFloat(price), // Ensure price is a number
        })
      );
    } else {
      // If the quantity drops to 0, remove the product from the cart
      handleRemoveFromCart(productId, normalizedPrintOptions, price);
    }
  };

  const handleRemoveFromCart = (productId, dimensions, weight, printOptions, price) => {
    const cartData = {
      productId,
      printOptions,
      dimensions,
      weight,
      price: parseFloat(price),
    };

    // Only include userId and guestId if they are present
    if (userId) cartData.userId = userId;
    else if (guestId) cartData.guestId = guestId;

    // Call the dispatch with the cartData
    dispatch(removeFromCart(cartData));
  };

  const formatPrintOptions = (printOptions) => {
    if (!printOptions || typeof printOptions !== "object") return "No options selected";

    return Object.entries(printOptions)
      .filter(([, value]) => {
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
        if (Array.isArray(value) && value.length === 1) return `${formattedKey}: ${value[0]}`;
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

  const generateKey = (productId, printOptions) => {
    if (!printOptions || Object.keys(printOptions).length === 0) {
      return `${productId}-no-options`;
    }
    const sortedOptions = Object.keys(printOptions)
      .sort()
      .reduce((acc, key) => {
        acc[key] = printOptions[key];
        return acc;
      }, {});
    return `${productId}-${JSON.stringify(sortedOptions)}`;
  };

  const groupedProducts = cart.products.reduce((acc, product) => {
    const key = generateKey(product.productId, product.printOptions);
    if (!acc[key]) {
      acc[key] = { ...product, variants: [] };
    }
    acc[key].variants.push(product);
    return acc;
  }, {});

  // Calculate the total price for the entire cart
  const cartTotalPrice = Object.values(groupedProducts).reduce((sum, group) => {
    const { price, variants } = group;
    const totalQuantity = variants.reduce((sum, variant) => sum + variant.quantity, 0);
    return sum + price * totalQuantity;
  }, 0);

  return (
    <div className="space-y-6">
      {Object.values(groupedProducts).map((group, index) => {
        const { productId, name, image, price, printOptions, variants } = group;
        const totalQuantity = variants.reduce(
          (sum, variant) => sum + variant.quantity,
          0
        );
        const totalPrice = price * totalQuantity; // Calculate total price for this group

        return (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start justify-between p-4 border-b border-gray-200"
          >
            {/* Product Image and Details */}
            <div className="flex items-start sm:flex-row flex-col space-x-4 sm:space-x-6">
              <img
                src={image}
                alt={name}
                className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-lg"
              />
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-medium text-gray-800">{name}</h3>
                <div className="text-sm text-gray-500">
                  <span className="font-semibold text-green-500">Selected Options:</span>
                  <ul className="list-none pl-0">{formatPrintOptions(printOptions)}</ul>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        productId,
                        -1,
                        totalQuantity,
                        printOptions,
                        price
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{totalQuantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        productId,
                        1,
                        totalQuantity,
                        printOptions,
                        price
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price and Delete Button */}
            <div className="flex justify-end flex-col items-end space-y-2 mt-4 sm:mt-0 ml-auto">
  <p className="text-lg font-semibold text-gray-800">
    R {totalPrice ? totalPrice.toLocaleString() : "0.00"}
  </p>
  <button
    onClick={() =>
      handleRemoveFromCart(productId, printOptions, price)
    }
    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
  >
    <RiDeleteBin3Line className="h-5 w-5 justify-end text-red-600" />
  </button>
</div>

          </div>
        );
      })}

      {/* Cart Total */}
      <div className="flex justify-end p-4 bg-gray-50 rounded-lg">
        <p className="text-xl font-bold text-gray-800">
          Total: R {cartTotalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

CartContents.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        printOptions: PropTypes.object,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      })
    ).isRequired,
  }).isRequired,
  userId: PropTypes.string,
  guestId: PropTypes.string,
};

export default CartContents;
