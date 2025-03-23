const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    // Find orders for the authenticated user, including printOptions data
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.productId", "name image price") // Assuming orderItems contains productId reference
      .sort({ createdAt: -1 }); // sort by most recent orders
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/orders/:id
// @desc Get order details by ID
// @access Private
router.get("/:id", protect, async (req, res) => {
  try {
    // Find order by ID and populate necessary fields, including printOptions
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.productId", "name image price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the full order details, including printOptions
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/orders
// @desc Create a new order with or without a shipping address
// @access Private
router.post("/", protect, async (req, res) => {
  try {
    // Create the order object with the provided data
    const orderData = {
      user: req.user._id,
      orderItems: req.body.orderItems,
      paymentMethod: req.body.paymentMethod,
      totalPrice: req.body.totalPrice,
      paymentStatus: "pending",
      status: "Processing",
      printOptions: req.body.printOptions || {}, // default to empty object if not provided
    };

    // Include shippingAddress only if provided
    if (req.body.shippingAddress) {
      orderData.shippingAddress = {
        recipientName: req.body.shippingAddress.recipientName,
        phone: req.body.shippingAddress.phone,
        address: req.body.shippingAddress.address,
        city: req.body.shippingAddress.city,
        postalCode: req.body.shippingAddress.postalCode,
        country: req.body.shippingAddress.country,
      };
    }

    // Create the new order with the prepared data
    const order = new Order(orderData);

    // Save the new order to the database
    await order.save();

    // Return the created order as a response
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
