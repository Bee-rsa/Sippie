const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart by user Id or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// Helper function to save/update a cart in the database
const saveCart = async (cart) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(cart._id, cart, {
      new: true,
    });
    return updatedCart;
  } catch (error) {
    console.error("Error saving cart:", error);
    throw error;
  }
};

// Helper function to calculate total price including additional options
const calculateTotalPrice = (products) => {
  return products.reduce((total, product) => {
    let productTotal = product.price * product.quantity;

    // Add additional prices from printOptions
    if (product.printPrice && product.printOptions) {
      Object.entries(product.printOptions).forEach(([optionType, selectedOption]) => {
        if (product.printPrice[optionType]?.[selectedOption]) {
          productTotal += product.printPrice[optionType][selectedOption] * product.quantity;
        }
      });
    }

    // Add additional prices from brandingPrice
    if (product.brandingPrice && product.printOptions) {
      Object.entries(product.printOptions).forEach(([optionType, selectedOption]) => {
        if (product.brandingPrice[optionType]?.[selectedOption]) {
          productTotal += product.brandingPrice[optionType][selectedOption] * product.quantity;
        }
      });
    }

    // Add additional prices from signsPrice
    if (product.signsPrice && product.printOptions) {
      Object.entries(product.printOptions).forEach(([optionType, selectedOption]) => {
        if (product.signsPrice[optionType]?.[selectedOption]) {
          productTotal += product.signsPrice[optionType][selectedOption] * product.quantity;
        }
      });
    }

    return total + productTotal;
  }, 0);
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, guestId, userId, printOptions, price } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Determine if the user is logged in or a guest
    let cart = await getCart(userId, guestId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId.toString() && JSON.stringify(p.printOptions) === JSON.stringify(printOptions)
      );

      if (productIndex > -1) {
        // If the product already exists, update the quantity and price
        cart.products[productIndex].quantity += quantity;
        cart.products[productIndex].price = price; // Update the price
      } else {
        // Add new product to the cart
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: price, // Use the dynamically calculated price
          dimensions: product.dimensions,
          weight: product.weight,
          brandingPrice: product.brandingPrice,
          printPrice: product.printPrice,
          signsPrice: product.signsPrice,
          printOptions, // Added printOptions here
          quantity,
        });
      }

      // Recalculate the total price
      cart.totalPrice = calculateTotalPrice(cart.products);
      console.log("Updated Cart:", cart); // Log the updated cart
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            dimensions: product.dimensions,
            weight: product.weight,
            price: price, // Use the dynamically calculated price
            brandingPrice: product.brandingPrice,
            printPrice: product.printPrice,
            signsPrice: product.signsPrice,
            printOptions, // Added printOptions here as well
            quantity,
          },
        ],
        totalPrice: calculateTotalPrice([
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            dimensions: product.dimensions,
            weight: product.weight,
            price: price, // Use the dynamically calculated price
            brandingPrice: product.brandingPrice,
            printPrice: product.printPrice,
            signsPrice: product.signsPrice,
            printOptions,
            quantity,
          },
        ]),
      });
      console.log("New Cart:", newCart); // Log the new cart
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, guestId, userId, printOptions, dimensions, weight, price } = req.body;

  console.log("Received payload from frontend:", { productId, quantity, guestId, userId, printOptions, dimensions, weight, price });

  try {
    // Fetch the cart based on userId or guestId
    let cart = await getCart(userId, guestId);
    if (!cart) {
      console.log("Cart not found for userId:", userId, "or guestId:", guestId);
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("Cart found:", cart);

    // Normalize printOptions to match the structure in the cart
    const normalizedPrintOptions = {
      sides: printOptions?.sides || [],
      paperFinish: printOptions?.paperFinish || [],
      paperWeight: printOptions?.paperWeight || [],
      standardSizes: printOptions?.standardSizes || [],
      lamination: printOptions?.lamination || [],
      cornerType: printOptions?.cornerType || [],
      layout: printOptions?.layout || [],
      material: printOptions?.material || [],
      printingType: printOptions?.printingType || [],
      finishingOptions: printOptions?.finishingOptions || [],
      printingPreferences: printOptions?.printingPreferences || [],
      sizes: printOptions?.sizes || [],
      colors: printOptions?.colors || [],
      gender: printOptions?.gender || [],
      printBack: printOptions?.printBack || [],
      printFront: printOptions?.printFront || [],
    };

    console.log("Normalized printOptions:", normalizedPrintOptions);

    // Find the product in the cart
    const productIndex = cart.products.findIndex((p) => {
      const isProductMatch = p.productId.toString() === productId.toString();

      // Compare only relevant printOptions fields
      const isPrintOptionsMatch =
        JSON.stringify({
          sides: p.printOptions?.sides || [],
          paperFinish: p.printOptions?.paperFinish || [],
          paperWeight: p.printOptions?.paperWeight || [],
          standardSizes: p.printOptions?.standardSizes || [],
          lamination: p.printOptions?.lamination || [],
          cornerType: p.printOptions?.cornerType || [],
          layout: p.printOptions?.layout || [],
          material: p.printOptions?.material || [],
          printingType: p.printOptions?.printingType || [],
          finishingOptions: p.printOptions?.finishingOptions || [],
          printingPreferences: p.printOptions?.printingPreferences || [],
          sizes: p.printOptions?.sizes || [],
          colors: p.printOptions?.colors || [],
          gender: p.printOptions?.gender || [],
          printBack: p.printOptions?.printBack || [],
          printFront: p.printOptions?.printFront || [],
        }) === JSON.stringify(normalizedPrintOptions);

      console.log("Checking product:", {
        productId: p.productId.toString(),
        isProductMatch,
        printOptions: p.printOptions,
        isPrintOptionsMatch,
      });

      return isProductMatch && isPrintOptionsMatch;
    });

    if (productIndex > -1) {
      console.log("Product found in cart at index:", productIndex);

      // Update quantity and price
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
        cart.products[productIndex].price = price;
      } else {
        // Remove the product if quantity is 0
        cart.products.splice(productIndex, 1);
      }

      // Recalculate the total price
      cart.totalPrice = calculateTotalPrice(cart.products);

      // Save the updated cart
      await cart.save();

      console.log("Updated cart:", cart);
      return res.status(200).json(cart);
    } else {
      console.log("Product not found in cart. Product ID:", productId, "Print Options:", normalizedPrintOptions);
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/cart
// @desc Remove a product from the cart
// @access Public
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params; // Get productId from URL params
  const { userId, guestId } = req.query; // Get userId and guestId from query params

  // Validate required fields
  if (!userId && !guestId) {
    return res.status(400).json({ message: "User ID or Guest ID is required" });
  }

  try {
    // Fetch the cart from the database
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex > -1) {
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);

      // Recalculate the total price
      cart.totalPrice = calculateTotalPrice(cart.products);

      // Save the updated cart
      await saveCart(cart);

      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) => item.productId.toString() === guestItem.productId.toString() && JSON.stringify(item.printOptions) === JSON.stringify(guestItem.printOptions)
          );

          if (productIndex > -1) {
            // If the items exist in the user cart, update the quantity and price
            userCart.products[productIndex].quantity += guestItem.quantity;
            userCart.products[productIndex].price = guestItem.price; // Update the price
          } else {
            // Otherwise, add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });

        // Recalculate the total price
        userCart.totalPrice = calculateTotalPrice(userCart.products);
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }
        res.status(200).json(userCart);
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // Guest cart has already been merged, return user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;