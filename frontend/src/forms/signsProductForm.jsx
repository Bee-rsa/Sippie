import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["Signs"];
const sizeOptions = ["XS", "S"];
const material = ["Vinyl", "Acrylic", "Aluminum", "PVC", "Coroplast (Corrugated Plastic)", "Magnetic"];
const printingType = ["Single-Sided", "Double-Sided"];
const finishingOptions = ["Matte", "Glossy", "UV Coating (Weather Protection)"];
const printingPreferences = ["Full Color", "Black & White", "Pantone Matching"];

const SignsProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    signsPrice: {
      productPrice: 0,
      sizeOptionsPrices: {
          "Extra Small": 0,
          "Small": 0,
          "Medium": 0,
          "Large": 0,
          "Extra Large": 0,
          "Double Extra Large": 0,
        },
        materialPrices: { 
            "Vinyl": 0, 
            "Acrylic": 0, 
            "Aluminum": 0, 
            "PVC": 0,
            "Coroplast (Corrugated Plastic)": 0, 
            "Magnetic": 0, 
              },
          printingTypePrices: {
            "Single-Sided": 0, 
            "Double-Sided": 0, 
              }, 
          finishingOptionsPrices: {
            "Matte": 0, 
            "Glossy": 0, 
            "UV Coating (Weather Protection)": 0, 
              },
          printingPreferencesPrices: {
            "Full Color": 0, 
            "Black & White": 0, 
            "Pantone Matching": 0, 
              }, 
          },
        sizeOptions: [],
        material: [],
        printingType: [],
        finishingOptions: [],
        printingPreferences: [],
    category: "",
    image: "",
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
    signsPrice: {
      productPrice: 0,
      sizeOptionsPrices: {
          "Extra Small": 0,
          "Small": 0,
          "Medium": 0,
          "Large": 0,
          "Extra Large": 0,
          "Double Extra Large": 0,
        },
        materialPrices: { 
            "Vinyl": 0, 
            "Acrylic": 0, 
            "Aluminum": 0, 
            "PVC": 0,
            "Coroplast (Corrugated Plastic)": 0, 
            "Magnetic": 0, 
              },
          printingTypePrices: {
            "Single-Sided": 0, 
            "Double-Sided": 0, 
              }, 
          finishingOptionsPrices: {
            "Matte": 0, 
            "Glossy": 0, 
            "UV Coating (Weather Protection)": 0, 
              },
          printingPreferencesPrices: {
            "Full Color": 0, 
            "Black & White": 0, 
            "Pantone Matching": 0, 
              }, 
          },
        sizeOptions: [],
        material: [],
        printingType: [],
        finishingOptions: [],
        printingPreferences: [],
    category: "",
    image: "",
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

      reader.readAsDataURL(file); // base64
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
    signsPrice: {
      ...prev.signsPrice,
      productPrice: parsedValue,
    },
  }));
};

// Handle Size Price Change
const handleSizeOptionsPricesChange = (size, value) => {
  const parsedValue = value === "" ? "" : parseFloat(value);
  setNewProduct((prev) => ({
    ...prev,
    signsPrice: {
      ...prev.signsPrice,
      sizeOptionsPrices: {
        ...prev.signsPrice.sizeOptionsPrices,
        [size]: parsedValue, // Corrected key
      },
    },
  }));
};

// Handle Material Price Change
const handleMaterialPriceChange = (materialType, value) => {
  const parsedValue = value === "" ? "" : parseFloat(value);
  setNewProduct((prev) => ({
    ...prev,
    signsPrice: {
      ...prev.signsPrice,
      materialPrices: {
        ...prev.signsPrice.materialPrices,
        [materialType]: parsedValue, // Corrected key
      },
    },
  }));
};

// Handle Printing Type Price Change
const handlePrintingTypePricesChange = (printingType, value) => {
  const parsedValue = value === "" ? "" : parseFloat(value);
  setNewProduct((prev) => ({
    ...prev,
    signsPrice: {
      ...prev.signsPrice,
      printingTypePrices: {
        ...prev.signsPrice.printingTypePrices,
        [printingType]: parsedValue, // Corrected key
      },
    },
  }));
};

// Handle Finishing Options Price Change
const handleFinishingOptionsPricesChange = (finishingOption, value) => {
  const parsedValue = value === "" ? "" : parseFloat(value);
  setNewProduct((prev) => ({
    ...prev,
    signsPrice: {
      ...prev.signsPrice,
      finishingOptionsPrices: {
        ...prev.signsPrice.finishingOptionsPrices,
        [finishingOption]: parsedValue, // Corrected key
      },
    },
  }));
};

// Handle Printing Preferences Price Change
const handlePrintingPreferencesPricesChange = (printingPreference, value) => {
  const parsedValue = value === "" ? "" : parseFloat(value);
  setNewProduct((prev) => ({
    ...prev,
    signsPrice: {
      ...prev.signsPrice,
      printingPreferencesPrices: {
        ...prev.signsPrice.printingPreferencesPrices,
        [printingPreference]: parsedValue, // Corrected key
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
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Create New Sign Product</h2>

<form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-m font-medium text-yellow-400">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-m font-medium text-yellow-400">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>

        <div>
          <label htmlFor="productPrice" className="block text-m font-medium text-yellow-400">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={newProduct.signsPrice?.productPrice ?? ""} // Ensure default is an empty string if no value
            onChange={(e) => handleProductPriceChange(e.target.value)} // Trigger handleProductPriceChange on input
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Enter Amount"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-m font-medium text-yellow-400">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
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
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && <span className="ml-3 text-m text-yellow-400">Image uploaded</span>}
        </div>

        <hr className="my-4 border-gray-600" />

        <h2 className="text-2xl font-bold text-white">Printing Options</h2>

        <div className="space-y-2"></div>

{/* Size Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("sizeOptions")}>
    <label className="block text-m font-medium text-yellow-400">Size Options</label>
    {expandedSections.sizeOptions ? <ChevronUp className="h-5 w-5 text-yellow-400" /> : <ChevronDown className="h-5 w-5 text-yellow-400" />}
  </div>
  {expandedSections.sizeOptions && (
    <ul className="space-y-1">
      {sizeOptions.map((size) => (
        <li key={size} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.sizeOptions.includes(size) ? "bg-yellow-400" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("sizeOptions", size)}
            />
            <span className={`text-white ${newProduct.sizeOptions.includes(size) ? "text-yellow-400" : ""}`}>
              {size}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.signsPrice?.sizeOptionsPrices?.[size] ?? ""}
            onChange={(e) => handleSizeOptionsPricesChange(size, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Material Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("material")}>
    <label className="block text-m font-medium text-yellow-400">Material Options</label>
    {expandedSections.material ? <ChevronUp className="h-5 w-5 text-yellow-400" /> : <ChevronDown className="h-5 w-5 text-yellow-500" />}
  </div>
  {expandedSections.material && (
    <ul className="space-y-1">
      {material.map((mat) => (
        <li key={mat} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.material.includes(mat) ? "bg-yellow-400" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("material", mat)}
            />
            <span className={`text-white ${newProduct.material.includes(mat) ? "text-yellow-400" : ""}`}>
              {mat}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.signsPrice?.materialPrices?.[mat] ?? ""}
            onChange={(e) => handleMaterialPriceChange(mat, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Printing Type Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("printingType")}>
    <label className="block text-m font-medium text-yellow-400">Printing Type Options</label>
    {expandedSections.printingType ? <ChevronUp className="h-5 w-5 text-yellow-400" /> : <ChevronDown className="h-5 w-5 text-yellow-400" />}
  </div>
  {expandedSections.printingType && (
    <ul className="space-y-1">
      {printingType.map((type) => (
        <li key={type} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.printingType.includes(type) ? "bg-yellow-400" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("printingType", type)}
            />
            <span className={`text-white ${newProduct.printingType.includes(type) ? "text-yellow-400" : ""}`}>
              {type}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.signsPrice?.printingTypePrices?.[type] ?? ""}
            onChange={(e) => handlePrintingTypePricesChange(type, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Finishing Options */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("finishingOptions")}>
    <label className="block text-m font-medium text-yellow-400">Finishing Options</label>
    {expandedSections.finishingOptions ? <ChevronUp className="h-5 w-5 text-yellow-400" /> : <ChevronDown className="h-5 w-5 text-yellow-400" />}
  </div>
  {expandedSections.finishingOptions && (
    <ul className="space-y-1">
      {finishingOptions.map((option) => (
        <li key={option} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.finishingOptions.includes(option) ? "bg-yellow-400" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("finishingOptions", option)}
            />
            <span className={`text-white ${newProduct.finishingOptions.includes(option) ? "text-yellow-400" : ""}`}>
              {option}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.signsPrice?.finishingOptionsPrices?.[option] ?? ""}
            onChange={(e) => handleFinishingOptionsPricesChange(option, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Printing Preferences */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("printingPreferences")}>
    <label className="block text-m font-medium text-yellow-400">Printing Preferences</label>
    {expandedSections.printingPreferences ? <ChevronUp className="h-5 w-5 text-yellow-400" /> : <ChevronDown className="h-5 w-5 text-yellow-400" />}
  </div>
  {expandedSections.printingPreferences && (
    <ul className="space-y-1">
      {printingPreferences.map((preference) => (
        <li key={preference} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.printingPreferences.includes(preference) ? "bg-yellow-400" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("printingPreferences", preference)}
            />
            <span className={`text-white ${newProduct.printingPreferences.includes(preference) ? "text-yellow-400" : ""}`}>
              {preference}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.signsPrice?.printingPreferencesPrices?.[preference] ?? ""}
            onChange={(e) => handlePrintingPreferencesPricesChange(preference, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
          />
        </li>
      ))}
    </ul>
  )}
</div>


        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default SignsProductForm;
