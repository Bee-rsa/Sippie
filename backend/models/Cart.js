const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
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
    dimensions: {
        length: { type: Number, default: 0 }, // Added default value
        width: { type: Number, default: 0 }, // Added default value
        height: { type: Number, default: 0 }, // Added default value
      },
      weight: {
        type: Number,
        default: 0, // Added default value
      },
    price: Number, // Dynamically calculated price
  printPrice: {
    sidesPrices: { type: Map, of: Number, default: {} },
    paperFinishPrices: { type: Map, of: Number, default: {} },
    paperWeightPrices: { type: Map, of: Number, default: {} },
    standardSizesPrices: { type: Map, of: Number, default: {} },
    laminationPrices: { type: Map, of: Number, default: {} },
    cornerTypePrices: { type: Map, of: Number, default: {} },
    layoutPrices: { type: Map, of: Number, default: {} },
  },
  signsPrice: {
    sizesPrice: { type: Map, of: Number, default: {} },
    materialPrices: { type: Map, of: Number, default: {} },
    printingTypePrices: { type: Map, of: Number, default: {} },
    finishingOptionsPrices: { type: Map, of: Number, default: {} },
    printingPreferencesPrices: { type: Map, of: Number, default: {} },
  },
  brandingPrice: {
   sizesPrice: { type: Map, of: Number, default: {} },
  colorsPrice: { type: Map, of: Number, default: {} }, 
  genderPrice: { type: Map, of: Number, default: {} },
  printBackPrice: { type: Map, of: Number, default: {} }, 
  printFrontPrice: { type: Map, of: Number, default: {} }, 
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
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false } 
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Cart", cartSchema);