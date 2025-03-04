const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema(
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
    quantity: {
      type: Number,
      required: true,
    },
    dimensions: { 
      length: Number, 
      width: Number, 
      height: Number 
    },
    weight: Number,
    printOptions: {
      // Print Category //
    sides: { type: [String], required: false },
		paperFinish: { type: [String], required: false },
		paperWeight: { type: [String], required: false },
		standardSizes: { type: [String], required: false },
		lamination: { type: [String], required: false },
		cornerType: { type: [String], required: false },
		layout: { type: [String], required: false },
    // Signs Category //
    material: { type: [String], required: false },
	printingType: { type: [String], required: false },
	finishingOptions: { type: [String], required: false },
	printingPreferences: { type: [String], required: false },
  // Branding Category //
      sizes: { type: [String], required: false },
      colors: { type: [String], required: false },
      gender: { type: [String], required: false },
      printBack: {type: [String], required: false },
		printFront: { type: [String], required: false },
    },
  },
  { _id: false }
);

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkoutItems: [checkoutItemSchema],
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
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed, // store payment-related details(transaction ID, paypal response)
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: {
      type: Date,
    },
    dimensions: { 
      length: Number, 
      width: Number, 
      height: Number 
    },
    weight: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
