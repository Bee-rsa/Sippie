import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react"; // Import Trash2 icon
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { toast } from "react-hot-toast"; // Import toast for notifications

const CartPage = () => {
  const { cart, clearCart } = useCartStore(); // Destructure clearCart from useCartStore

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to handle clearing the cart
  const handleClearCart = async () => {
    try {
      await clearCart(); // Call clearCart from useCartStore
      toast.success("Cart cleared successfully"); // Show success message
    } catch (error) {
      toast.error("Failed to clear cart"); // Show error message
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <div className="py-8 md:py-16 scroll-mt-12 mt-12 sm:mt-0">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleClearCart}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {/* Cart Items */}
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold ">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);