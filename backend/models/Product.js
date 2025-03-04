const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, unique: true, required: true },
    dimensions: { length: Number, width: Number, height: Number },
    weight: Number,
    category: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String },
      },
    ],
    isFeatured: { type: Boolean, default: false },
      isPublished: { type: Boolean, default: false },

      // Branding Price Category //
brandingPrice: {
  sizesPrice: { type: Map, of: Number }, // No default value
  colorsPrice: { type: Map, of: Number }, // No default value
  genderPrice: { type: Map, of: Number }, // No default value
  printBackPrice: { type: Map, of: Number }, // No default value
  printFrontPrice: { type: Map, of: Number }, // No default value
},

  // Print Price Category //
  printPrice: {
    sidesPrices: { type: Map, of: Number }, 
paperFinishPrices: { type: Map, of: Number }, 
paperWeightPrices: { type: Map, of: Number }, 
standardSizesPrices: { type: Map, of: Number }, 
laminationPrices: { type: Map, of: Number }, 
cornerTypePrices: { type: Map, of: Number }, 
layoutPrices: { type: Map, of: Number }, 
},

// Signs Category //
signsPrice: {
sizesPrice: { type: Map, of: Number },
materialPrices: { type: Map, of: Number }, 
printingTypePrices: { type: Map, of: Number }, 
finishingOptionsPrices: { type: Map, of: Number },  
printingPreferencesPrices: { type: Map, of: Number }, 
  },

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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
