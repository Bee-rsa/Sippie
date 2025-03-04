import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		// Design Category // 

		// Print Category // 
		printPrice: {
      productPrice: { type: Number, default: 0 }, // Ensure type is set
      	sidesPrices: {
        type: Map,
        of: Number, 
        default: {
          "Single Side": 0,
          "Double Side": 0,
        },
      },
	  paperFinishPrices: {
        type: Map,
        of: Number, 
        default: {
          "Gloss Finish": 0,
		  "Matte Finish": 0, 
		  "Soft Touch Lamination": 0,
        },
      },
	  paperWeightPrices: {
        type: Map,
        of: Number, 
        default: {
          "Single Side": 0,
          "80 - 100 gsm": 0, 
		  "120 - 170 gsm": 0, 
		  "200 - 300 gsm": 0,
		  "350 - 400 gsm": 0,
        },
      },
	  standardSizesPrices: {
        type: Map,
        of: Number, 
        default: {
          "Single Side": 0,
          "A4": 0, 
		  "A5": 0, 
		  "A6": 0,
		  "DL": 0,
        },
      },
	  laminationPrices: {
        type: Map,
        of: Number, 
        default: {
          "Single Side": 0,
          "Gloss Lamination": 0, 
		  "Matte Lamination": 0,
		  "Soft Touch Lamination": 0,
        },
      },
	  cornerTypePrices: {
        type: Map,
        of: Number, 
        default: {
          "Single Side": 0,
          "Square Corners": 0, 
		  "Rounded Corners": 0,
        },
      },
	  layoutPrices: {
        type: Map,
        of: Number, 
        default: {
          "Single Side": 0,
          "Portrait": 0, 
		  "Landscape": 0,
        },
      },
	},
		sides: {
			type: [String],
			required: false,
		},
		paperFinish: {
      type: [String],
      required: false,
		},
		paperWeight: {
		type: [String],
		required: false,
		},
		standardSizes: {
		type: [String],
		required: false,
		},
		lamination: {
		type: [String],
		required: false,
		},
		cornerType: {
		type: [String],
		required: false,
		},
		layout: {
		type: [String],
		required: false,
		},

		// Signs Category //
		signsPrice: {
      productPrice: { type: Number, default: 0 }, // Ensure type is set
      sizeOptionsPrices: {
        type: Map,
        of: Number, 
        default: {
          "Extra Small": 0,
          "Small": 0,
          "Medium": 0,
          "Large": 0,
          "Extra Large": 0,
          "Double Extra Large": 0,
        },
      },
	  materialPrices: { 
		type: Map,
        of: Number, 
        default: {
			"Vinyl": 0, 
			"Acrylic": 0, 
			"Aluminum": 0, 
			"PVC": 0,
			"Coroplast (Corrugated Plastic)": 0, 
			"Magnetic": 0, 
        },
      },
	  printingTypePrices: {
        type: Map,
        of: Number, 
        default: {
			"Single-Sided": 0, 
			"Double-Sided": 0, 
        },
      }, 
	  finishingOptionsPrices: {
        type: Map,
        of: Number, 
        default: {
			"Matte": 0, 
			"Glossy": 0, 
			"UV Coating (Weather Protection)": 0, 
        },
      }, 
	  printingPreferencesPrices: {
        type: Map,
        of: Number, 
        default: {
			"Full Color": 0, 
			"Black & White": 0, 
			"Pantone Matching": 0, 
        },
      }, 
    },
	sizeOptions: {
			type: [String],
			required: false,
		},
	material: {
			type: [String],
			required: false,
		},
	printingType: {
			type: [String],
			required: false,
		},
	finishingOptions: {
			type: [String],
			required: false,
		},
	printingPreferences: {
			type: [String],
			required: false,
		},

		// Branding Category // 
		brandingPrice: {
      productPrice: { type: Number, default: 0 }, // Ensure type is set
      sizePrices: {
        type: Map,
        of: Number, 
        default: {
          "Extra Small": 0,
          "Small": 0,
          "Medium": 0,
          "Large": 0,
          "Extra Large": 0,
          "Double Extra Large": 0,
        },
      },
	  colourPrices: {
        type: Map,
        of: Number, 
        default: {
			"Black": 0, 
			"White": 0, 
			"Navy Blue": 0, 
			"Gray": 0,
			"Beige": 0, 
			"Green": 0, 
			"Yellow": 0, 
			"Brown": 0,
			"Red": 0,
			"Pink": 0,
        },
      },
	  printBackPrices: {
        type: Map,
        of: Number, 
        default: {
			"A2": 0, 
			"A3": 0, 
			"A4": 0, 
			"None": 0,
        },
      }, 
	  printFrontPrices: {
        type: Map,
        of: Number, 
        default: {
			"A2": 0, 
			"A3": 0, 
			"A4": 0, 
			"None": 0,
        },
      }, 
    },
		size: {
			type: [String],
			required: false,
		},
		colour: {
			type: [String],
			required: false,
		},
		printBack: {
			type: [String],
			required: false,
		},
		printFront: {
			type: [String],
			required: false,
		},

		// Paint Category // 
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
