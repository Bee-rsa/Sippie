import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

// Helper functions for localStorage persistence
const loadCart = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return [];
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage", error);
  }
};

export const useCartStore = create((set, get) => ({
  cart: loadCart(), // Load initial cart from localStorage
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,
  totalWithCourier: 0, // Add this
  setTotalWithCourier: (amount) => set({ totalWithCourier: amount }),



  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      saveCart(res.data); // Persist cart
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0, totalWithCourier: 0 });
    localStorage.removeItem("cart"); // Remove from localStorage
  
    try {
      await axios.post("/cart/clear"); // Clear cart from backend
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },



  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id);
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        saveCart(newCart); // Persist new cart
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  removeFromCart: async (productId) => {
    await axios.delete(`/cart`, { data: { productId } });
    set((prevState) => {
      const newCart = prevState.cart.filter((item) => item._id !== productId);
      saveCart(newCart);
      return { cart: newCart };
    });
    get().calculateTotals();
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    await axios.put(`/cart/${productId}`, { quantity });
    set((prevState) => {
      const newCart = prevState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      saveCart(newCart);
      return { cart: newCart };
    });
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart, coupon, total } = get(); 

    if (!Array.isArray(cart) || cart.length === 0) {
        return; // Do nothing if the cart is empty (keeps previous total)
    }

    const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

    let newTotal = subtotal;

    if (coupon) {
        const discount = subtotal * (coupon.discountPercentage / 100);
        newTotal = subtotal - discount;
    }

    set({ subtotal, total: isNaN(newTotal) ? total : newTotal });
},

}));
