import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart
    ? JSON.parse(storedCart)
    : { products: [], printPrice: {}, brandingPrice: {}, signsPrice: {} };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { params: { userId, guestId } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);

// Add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, printOptions, guestId, userId, price, printPrice, brandingPrice, signsPrice },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { productId: productId.toString(), quantity, printOptions, guestId, userId, price, printPrice, brandingPrice, signsPrice }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding to cart");
    }
  }
);

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, guestId, userId, printOptions, price }, { rejectWithValue }) => {
    try {
      console.log("Sending payload to backend:", { productId, quantity, guestId, userId, printOptions, price });

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId: productId.toString(), // Ensure productId is a string
          quantity: Number(quantity), // Ensure quantity is a number
          guestId: guestId || null, // Send guestId if available, otherwise null
          userId: userId || null, // Send userId if available, otherwise null
          printOptions: printOptions || {}, // Ensure printOptions is an object
          price: Number(price), // Ensure price is a number
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating quantity");
    }
  }
);


// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/${productId}`, // Use productId in the URL
        {
          params: { userId, guestId }, // Send userId and guestId as query params
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error removing item");
    }
  }
);




// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("User token missing");
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, user },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error merging cart");
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], printPrice: {}, brandingPrice: {}, signsPrice: {} };
      localStorage.removeItem("cart");
    },
    addToCartLocal: (state, action) => {
      const { productId, quantity, printOptions, price, userId, guestId } = action.payload;

      const existingProductIndex = state.cart.products.findIndex(
        (product) =>
          product.productId === productId &&
          JSON.stringify(product.printOptions) === JSON.stringify(printOptions)
      );

      if (existingProductIndex >= 0) {
        state.cart.products[existingProductIndex].quantity += quantity;
        state.cart.products[existingProductIndex].price = price;
      } else {
        state.cart.products.push({ productId, quantity, printOptions, price, userId, guestId });
      }
      saveCartToStorage(state.cart);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, printOptions } = action.payload;
      const productIndex = state.cart.products.findIndex(
        (product) =>
          product.productId === productId &&
          JSON.stringify(product.printOptions) === JSON.stringify(printOptions)
      );

      if (productIndex >= 0) {
        state.cart.products[productIndex].quantity = quantity;
        saveCartToStorage(state.cart);
      }
    },
    removeItem: (state, action) => {
      const { productId, printOptions } = action.payload;
      state.cart.products = state.cart.products.filter(
        (product) =>
          !(product.productId === productId &&
          JSON.stringify(product.printOptions) === JSON.stringify(printOptions))
      );
      saveCartToStorage(state.cart);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart";
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      });
  },
});

export const { clearCart, addToCartLocal, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
