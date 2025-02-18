import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["Branding"];
const sizeOptions = ["Extra Small", "Small", "Medium", "Large", "Extra Large", "Double Extra Large"];
const colour = ["Black", "White", "Navy Blue", "Gray", "Beige", "Green", "Yellow", "Brown", "Red", "Pink"];
const printBackOptions = ["A2", "A3", "A4", "None"];
const printFrontOptions = ["A2", "A3", "A4", "None"];

const BrandingProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brandingPrice: {
      productPrice: 0,
      sizePrices: {
        "Extra Small": 0,
        Small: 0,
        Medium: 0,
        Large: 0,
        "Extra Large": 0,
        "Double Extra Large": 0,
      },
      colourPrices: {
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
      printBackPrices: {
        "A2": 0, 
        "A3": 0, 
        "A4": 0, 
        "None": 0,
      },
      printFrontPrices: {
        "A2": 0, 
        "A3": 0, 
        "A4": 0, 
        "None": 0,
      },
    },
    category: "",
    image: "",
    size: [],
    colour: [],
    printBack: [],
    printFront: [],
  });

  const [expandedSections, setExpandedSections] = useState({
    sides: false,
    paperFinish: false,
    paperWeight: false,
    standardSizes: false,
    lamination: false,
    cornerType: false,
    layout: false,
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        brandingPrice: {
          productPrice: 0,
          sizePrices: {
            "Extra Small": 0,
            Small: 0,
            Medium: 0,
            Large: 0,
            "Extra Large": 0,
            "Double Extra Large": 0,
          },
          colourPrices: {
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
          printBackPrices: {
            "A2": 0, 
            "A3": 0, 
            "A4": 0, 
            "None": 0,
          },
          printFrontPrices: {
            "A2": 0, 
            "A3": 0, 
            "A4": 0, 
            "None": 0,
          },
        },
        category: "",
        size: [],
        colour: [],
        image: "",
        printBack: [],
        printFront: [],
      });
    } catch {
      console.log("Error creating product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file); // Base64
    }
  };

  const handleSelection = (type, option) => {
    setNewProduct((prevState) => {
      const updatedOptions = prevState[type].includes(option)
        ? prevState[type].filter((item) => item !== option) // Remove if already selected
        : [...prevState[type], option]; // Add if not selected
      return { ...prevState, [type]: updatedOptions };
    });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle Product Price Change
  const handleProductPriceChange = (value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        productPrice: parsedValue,
      },
    }));
  };

  // Handle Size Price Change
  const handleSizePriceChange = (size, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        sizePrices: {
          ...prev.brandingPrice.sizePrices,
          [size]: parsedValue, // Update price for specific size
        },
      },
    }));
  };

  const handleColourPriceChange = (colour, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        colourPrices: {
          ...prev.brandingPrice.colourPrices,
          [colour]: parsedValue,
        },
      },
    }));
  };

  const handlePrintBackPriceChange = (printBackOptions, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        printBackPrices: {
          ...prev.brandingPrice.printBackPrices,
          [printBackOptions]: parsedValue, // Use printBackOption here
        },
      },
    }));
  };
  
  const handlePrintFrontPriceChange = (printFrontOptions, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        printFrontPrices: {
          ...prev.brandingPrice.printFrontPrices,
          [printFrontOptions]: parsedValue, // Use printFrontOption here
        },
      },
    }));
  };
  

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-red-700">Create New Print Product</h2>

      <hr className="my-4 border-gray-600" />

      <h2 className="text-2xl font-bold mb-4 text-white">Product Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-m font-medium text-red-500">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-m font-medium text-red-500">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700"
            required
          />
        </div>

        <div>
          <label htmlFor="productPrice" className="block text-m font-medium text-red-500">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={newProduct.brandingPrice?.productPrice ?? ""} // Ensure default is an empty string if no value
            onChange={(e) => handleProductPriceChange(e.target.value)} // Trigger handleProductPriceChange on input
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700"
            placeholder="Enter Amount"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-m font-medium text-red-500">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-1 flex items-center">
          <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && <span className="ml-3 text-m text-red-500">Image uploaded</span>}
        </div>

        <hr className="my-4 border-gray-600" />

        <h2 className="text-2xl font-bold text-white">Printing Options</h2>

        <div className="space-y-2">
          {/* T-Shirt Size Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("tshirtSizes")}>
    <label className="block text-m font-medium text-red-500">Size Options</label>
    {expandedSections.tshirtSizes ? <ChevronUp className="h-5 w-5 text-red-500" /> : <ChevronDown className="h-5 w-5 text-red-500" />}
  </div>
  {expandedSections.tshirtSizes && (
    <ul className="space-y-1">
      {sizeOptions.map((size) => (
        <li key={size} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.size.includes(size) ? "bg-red-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("size", size)}
            />
            <span className={`text-white ${newProduct.size.includes(size) ? "text-red-500" : ""}`}>
              {size}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.brandingPrice?.sizePrices?.[size] ?? ""}
            onChange={(e) => handleSizePriceChange(size, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Colour Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("colourOptions")}>
    <label className="block text-m font-medium text-red-500">Colour Options</label>
    {expandedSections.colourOptions ? <ChevronUp className="h-5 w-5 text-red-500" /> : <ChevronDown className="h-5 w-5 text-red-500" />}
  </div>
  {expandedSections.colourOptions && (
    <ul className="space-y-1">
      {colour.map((colour) => (
        <li key={colour} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.colour.includes(colour) ? "bg-red-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("colour", colour)}
            />
            <span className={`text-white ${newProduct.colour.includes(colour) ? "text-red-500" : ""}`}>
              {colour}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.brandingPrice?.colourPrices?.[colour] ?? ""}
            onChange={(e) => handleColourPriceChange(colour, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Print Back Size Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("printBackSizeOptions")}>
    <label className="block text-m font-medium text-red-500">Print Back Size</label>
    {expandedSections.printBackSizeOptions ? <ChevronUp className="h-5 w-5 text-red-500" /> : <ChevronDown className="h-5 w-5 text-red-500" />}
  </div>
  {expandedSections.printBackSizeOptions && (
    <ul className="space-y-1">
      {printBackOptions.map((printBackOptions) => (
        <li key={printBackOptions} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.printBack.includes(printBackOptions) ? "bg-red-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("printBack", printBackOptions)}
            />
            <span className={`text-white ${newProduct.printBack.includes(printBackOptions) ? "text-red-500" : ""}`}>
              {printBackOptions}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.brandingPrice?.printBackPrices?.[printBackOptions] ?? ""}
            onChange={(e) => handlePrintBackPriceChange(printBackOptions, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Print Front Size Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("printFrontSizeOptions")}>
    <label className="block text-m font-medium text-red-500">Print Front Size</label>
    {expandedSections.printFrontSizeOptions ? <ChevronUp className="h-5 w-5 text-red-500" /> : <ChevronDown className="h-5 w-5 text-red-500" />}
  </div>
  {expandedSections.printFrontSizeOptions && (
    <ul className="space-y-1">
      {printFrontOptions.map((printFrontOptions) => (
        <li key={printFrontOptions} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.printFront.includes(printFrontOptions) ? "bg-red-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("printFront", printFrontOptions)}
            />
            <span className={`text-white ${newProduct.printFront.includes(printFrontOptions) ? "text-red-500" : ""}`}>
              {printFrontOptions}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.brandingPrice?.printFrontPrices?.[printFrontOptions] ?? ""}
            onChange={(e) => handlePrintFrontPriceChange(printFrontOptions, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>
        </div>


        <button
          type="submit"
          className="mt-4 w-full bg-red-700 text-white py-2 px-4 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default BrandingProductForm;

