const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    printOptions: {
      // Print Category
      sides: { type: [String], default: [] }, // Added default value
      paperFinish: { type: [String], default: [] }, // Added default value
      paperWeight: { type: [String], default: [] }, // Added default value
      standardSizes: { type: [String], default: [] }, // Added default value
      lamination: { type: [String], default: [] }, // Added default value
      cornerType: { type: [String], default: [] }, // Added default value
      layout: { type: [String], default: [] }, // Added default value

      // Signs Category
      material: { type: [String], default: [] }, // Added default value
      printingType: { type: [String], default: [] }, // Added default value
      finishingOptions: { type: [String], default: [] }, // Added default value
      printingPreferences: { type: [String], default: [] }, // Added default value

      // Branding Category
      sizes: { type: [String], default: [] }, // Added default value
      colors: { type: [String], default: [] }, // Added default value
      gender: { type: [String], default: [] }, // Added default value
      printBack: { type: [String], default: [] }, // Added default value
      printFront: { type: [String], default: [] }, // Added default value

      dimensions: {
        length: { type: Number, default: 0 }, // Added default value
        width: { type: Number, default: 0 }, // Added default value
        height: { type: Number, default: 0 }, // Added default value
      },
      weight: {
        type: Number,
        default: 0, // Added default value
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      recipientName: { type: String, required: false },
      phone: { type: String, required: false },
      address: { type: String, required: false },
      city: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);