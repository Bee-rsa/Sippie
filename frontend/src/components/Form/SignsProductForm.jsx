import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/slices/productsSlice.js";
import PropTypes from "prop-types";

const categories = ["Signs"];
const sizesOptions = ["XS", "S"];
const material = ["Vinyl", "Acrylic", "Aluminum", "PVC", "Coroplast (Corrugated Plastic)", "Magnetic"];
const printingType = ["Single-Sided", "Double-Sided"];
const finishingOptions = ["Matte", "Glossy", "UV Coating (Weather Protection)"];
const printingPreferences = ["Full Color", "Black & White", "Pantone Matching"];

// CollapsibleHeader component
const CollapsibleHeader = ({ title, isOpen, toggleOpen }) => (
  <div className="flex items-center justify-between cursor-pointer" onClick={toggleOpen}>
    <label className="block text-m font-medium text-yellow-500 mb-2">{title}</label>
    {isOpen ? <ChevronUp className="text-yellow-500" /> : <ChevronDown className="text-yellow-500" />}
  </div>
);

CollapsibleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

const SignsProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  // Form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    category: "",
    images: [],
    signsPrice: {
      sizesPrice: {},
      materialPrices: {},
      printingTypePrices: {},
      finishingOptionsPrices: {},
      printingPreferencesPrices: {},
    },
    printOptions: {
      categories: [],
      sizes: [],
      material: [],
      printingType: [],
      finishingOptions: [],
      printingPreferences: [],
      dimensions: { length: 0, width: 0, height: 0 },
      weight: 0,
      isFeatured: false,
      isPublished: false,
    },
  });

  // Collapsible sections state for all print options groups
  const [openSizes, setOpenSizes] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openPrintingType, setOpenPrintingType] = useState(false);
  const [openFinishingOptions, setOpenFinishingOptions] = useState(false);
  const [openPrintingPreferences, setOpenPrintingPreferences] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProduct(newProduct)).unwrap();
      // Reset the form after successful submission
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        sku: "",
        category: "",
        images: [],
        signsPrice: {
          sizesPrice: {},
          materialPrices: {},
          printingTypePrices: {},
          finishingOptionsPrices: {},
          printingPreferencesPrices: {},
        },
        printOptions: {
          categories: [],
          sizes: [],
          material: [],
          printingType: [],
          finishingOptions: [],
          printingPreferences: [],
          dimensions: { length: 0, width: 0, height: 0 },
          weight: 0,
          isFeatured: false,
          isPublished: false,
        },
      });
    } catch (err) {
      console.error("Error creating product", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          images: [...prev.images, { url: reader.result, altText: "" }],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper for updating nested printOptions state
  const updatePrintOption = (field, value) => {
    setNewProduct((prev) => ({
      ...prev,
      printOptions: {
        ...prev.printOptions,
        [field]: value,
      },
    }));
  };

  // Toggle multi-select options
  const toggleOption = (field, option) => {
    const currentOptions = newProduct.printOptions[field];
    if (currentOptions.includes(option)) {
      updatePrintOption(field, currentOptions.filter((item) => item !== option));
    } else {
      updatePrintOption(field, [...currentOptions, option]);
    }
  };

  // Handle Sizes Price Change
  const handleSizesPriceChange = (size, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      signsPrice: {
        ...prev.signsPrice,
        sizesPrice: {
          ...prev.signsPrice.sizesPrice,
          [size]: parsedValue,
        },
      },
    }));
  };

  // Handle Material Price Change
  const handleMaterialPriceChange = (material, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      signsPrice: {
        ...prev.signsPrice,
        materialPrices: {
          ...prev.signsPrice.materialPrices,
          [material]: parsedValue,
        },
      },
    }));
  };

  // Handle Printing Type Price Change
  const handlePrintingTypePriceChange = (type, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      signsPrice: {
        ...prev.signsPrice,
        printingTypePrices: {
          ...prev.signsPrice.printingTypePrices,
          [type]: parsedValue,
        },
      },
    }));
  };

  // Handle Finishing Options Price Change
  const handleFinishingOptionsPriceChange = (option, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      signsPrice: {
        ...prev.signsPrice,
        finishingOptionsPrices: {
          ...prev.signsPrice.finishingOptionsPrices,
          [option]: parsedValue,
        },
      },
    }));
  };

  // Handle Printing Preferences Price Change
  const handlePrintingPreferencesPriceChange = (preference, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      signsPrice: {
        ...prev.signsPrice,
        printingPreferencesPrices: {
          ...prev.signsPrice.printingPreferencesPrices,
          [preference]: parsedValue,
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
      <h2 className="text-2xl font-bold mb-6 text-yellow-700">Create New Signs Product</h2>
      {error && <p className="text-yellow-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Product Info */}
        <div>
          <label htmlFor="name" className="block text-m font-medium text-yellow-500">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-m font-medium text-yellow-500">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-m font-medium text-yellow-500">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price || ""}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="sku" className="block text-m font-medium text-yellow-500">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={newProduct.sku}
            onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-m font-medium text-yellow-500">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-yellow-700 transition-all duration-200"
            required
          >
            <option value="" className="bg-gray-700 text-white">
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-700 text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="image" className="bg-yellow-600 text-white py-2 px-4 rounded-md cursor-pointer">
            <Upload className="inline mr-2" />
            Upload Product Image
          </label>
        </div>

        <hr className="my-4 border-gray-600" />

        <h2 className="text-2xl font-bold text-white">Printing Options</h2>

        {/* Sizes Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Sizes" isOpen={openSizes} toggleOpen={() => setOpenSizes(!openSizes)} />
          {openSizes && (
            <div className="space-y-2">
              {sizesOptions.map((size) => (
                <div
                  key={size}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.sizes.includes(size)
                      ? "bg-yellow-500 border-yellow-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("sizes", size)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={size}
                      checked={newProduct.printOptions.sizes.includes(size)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{size}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.signsPrice?.sizesPrice?.[size] ?? ""}
                    onChange={(e) => handleSizesPriceChange(size, e.target.value)}
                    step="0.01"
                    className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
                    placeholder="Price"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Material Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Material" isOpen={openMaterial} toggleOpen={() => setOpenMaterial(!openMaterial)} />
          {openMaterial && (
            <div className="space-y-2">
              {material.map((mat) => (
                <div
                  key={mat}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.material.includes(mat)
                      ? "bg-yellow-500 border-yellow-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("material", mat)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={mat}
                      checked={newProduct.printOptions.material.includes(mat)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{mat}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.signsPrice?.materialPrices?.[mat] ?? ""}
                    onChange={(e) => handleMaterialPriceChange(mat, e.target.value)}
                    step="0.01"
                    className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
                    placeholder="Price"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Printing Type Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Printing Type" isOpen={openPrintingType} toggleOpen={() => setOpenPrintingType(!openPrintingType)} />
          {openPrintingType && (
            <div className="space-y-2">
              {printingType.map((type) => (
                <div
                  key={type}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.printingType.includes(type)
                      ? "bg-yellow-500 border-yellow-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("printingType", type)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={type}
                      checked={newProduct.printOptions.printingType.includes(type)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{type}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.signsPrice?.printingTypePrices?.[type] ?? ""}
                    onChange={(e) => handlePrintingTypePriceChange(type, e.target.value)}
                    step="0.01"
                    className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
                    placeholder="Price"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Finishing Options Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Finishing Options" isOpen={openFinishingOptions} toggleOpen={() => setOpenFinishingOptions(!openFinishingOptions)} />
          {openFinishingOptions && (
            <div className="space-y-2">
              {finishingOptions.map((option) => (
                <div
                  key={option}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.finishingOptions.includes(option)
                      ? "bg-yellow-500 border-yellow-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("finishingOptions", option)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={option}
                      checked={newProduct.printOptions.finishingOptions.includes(option)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{option}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.signsPrice?.finishingOptionsPrices?.[option] ?? ""}
                    onChange={(e) => handleFinishingOptionsPriceChange(option, e.target.value)}
                    step="0.01"
                    className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
                    placeholder="Price"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Printing Preferences Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Printing Preferences" isOpen={openPrintingPreferences} toggleOpen={() => setOpenPrintingPreferences(!openPrintingPreferences)} />
          {openPrintingPreferences && (
            <div className="space-y-2">
              {printingPreferences.map((preference) => (
                <div
                  key={preference}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.printingPreferences.includes(preference)
                      ? "bg-yellow-500 border-yellow-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("printingPreferences", preference)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={preference}
                      checked={newProduct.printOptions.printingPreferences.includes(preference)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{preference}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.signsPrice?.printingPreferencesPrices?.[preference] ?? ""}
                    onChange={(e) => handlePrintingPreferencesPriceChange(preference, e.target.value)}
                    step="0.01"
                    className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
                    placeholder="Price"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <hr className="my-4 border-gray-600" />

        <h2 className="text-2xl font-bold text-white">Courier Options</h2>

        {/* Dimensions Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-yellow-500 mb-2">
            Product Dimensions
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="length"
              name="length"
              value={newProduct.printOptions.dimensions.length}
              onChange={(e) =>
                updatePrintOption("dimensions", {
                  ...newProduct.printOptions.dimensions,
                  length: e.target.value,
                })
              }
              className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200"
              placeholder="Length"
              step="0.01"
            />
            <input
              type="number"
              id="width"
              name="width"
              value={newProduct.printOptions.dimensions.width}
              onChange={(e) =>
                updatePrintOption("dimensions", {
                  ...newProduct.printOptions.dimensions,
                  width: e.target.value,
                })
              }
              className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200"
              placeholder="Width"
              step="0.01"
            />
            <input
              type="number"
              id="height"
              name="height"
              value={newProduct.printOptions.dimensions.height}
              onChange={(e) =>
                updatePrintOption("dimensions", {
                  ...newProduct.printOptions.dimensions,
                  height: e.target.value,
                })
              }
              className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-200"
              placeholder="Height"
              step="0.01"
            />
          </div>
        </div>

        {/* Weight Section */}
        <div>
          <label htmlFor="weight" className="block text-m font-medium text-yellow-500">
            Weight
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={newProduct.printOptions.weight || ""}
            onChange={(e) => updatePrintOption("weight", e.target.value)}
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-yellow-600 text-white py-2 px-6 rounded-md w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default SignsProductForm;