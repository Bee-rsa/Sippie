import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/slices/productsSlice.js";
import PropTypes from "prop-types";

const categories = ["Branding"];

// List format for options
const sizeOptions = ["Extra Small", "Small", "Medium", "Large", "Extra Large", "Double Extra Large"];
const colorOptions = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
const genderOptions = ["Male", "Female", "Unisex"];
const printBackOptions = ["A2", "A3", "A4", "None"];
const printFrontOptions = ["A2", "A3", "A4", "None"];

// Move the CollapsibleHeader component outside
const CollapsibleHeader = ({ title, isOpen, toggleOpen }) => (
  <div className="flex items-center justify-between cursor-pointer" onClick={toggleOpen}>
    <label className="block text-m font-medium text-red-500 mb-2">{title}</label>
    {isOpen ? <ChevronUp className="text-red-500" /> : <ChevronDown className="text-red-500" />}
  </div>
);

CollapsibleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

const BrandingProductForm = () => {
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
    brandingPrice: {
      sizesPrice: {},
      colorsPrice: {},
      genderPrice: {},
      printBackPrice: {},
      printFrontPrice: {},
    },
    printOptions: {
      sizes: [],
      colors: [],
      gender: [],
      printBack: [],
      printFront: [],
      dimensions: { length: 0, width: 0, height: 0 },
      weight: 0,
      isFeatured: false,
      isPublished: false,
    },
  });

  // Collapsible sections state for all print options groups
  const [openSizes, setOpenSizes] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openPrintFront, setOpenPrintFront] = useState(false);
  const [openPrintBack, setOpenPrintBack] = useState(false);

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
        brandingPrice: {
          sizesPrice: {},
          colorsPrice: {},
          genderPrice: {},
          printBackPrice: {},
          printFrontPrice: {},
        },
        printOptions: {
          sizes: [],
          colors: [],
          gender: [],
          printBack: [],
          printFront: [],
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
        [field]: value, // Update the specific field (e.g., sizes)
      },
    }));
  };

  const handleSizesPriceChange = (size, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        sizesPrice: {
          ...prev.brandingPrice.sizesPrice,
          [size]: parsedValue, // Update price for specific size
        },
      },
    }));
  };

  const handleColorPriceChange = (color, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        colorsPrice: {
          ...prev.brandingPrice.colorsPrice,
          [color]: parsedValue,
        },
      },
    }));
  };

  const handleGenderPriceChange = (gender, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        genderPrice: {
          ...prev.brandingPrice.genderPrice,
          [gender]: parsedValue,
        },
      },
    }));
  };

  const handlePrintBackPriceChange = (option, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value); // Parse the value
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        printBackPrice: {
          ...prev.brandingPrice.printBackPrice,
          [option]: parsedValue, // Use the option parameter
        },
      },
    }));
  };
  
  const handlePrintFrontPriceChange = (option, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value); // Parse the value
    setNewProduct((prev) => ({
      ...prev,
      brandingPrice: {
        ...prev.brandingPrice,
        printFrontPrice: {
          ...prev.brandingPrice.printFrontPrice,
          [option]: parsedValue, // Use the option parameter
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
      <h2 className="text-2xl font-bold mb-6 text-red-700">Create New Branding Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Product Info */}
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
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
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
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-m font-medium text-red-500">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="sku" className="block text-m font-medium text-red-500">
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
          <label htmlFor="category" className="block text-m font-medium text-red-500">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 transition-all duration-200"
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
          <label htmlFor="image" className="bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer">
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
      {sizeOptions.map((size) => (
        <div
          key={size}
          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
            newProduct.printOptions.sizes.includes(size)
              ? "bg-red-500 border-red-500"
              : "bg-gray-800 border-gray-700 hover:bg-gray-700"
          } border cursor-pointer`} // Add cursor-pointer to indicate clickable area
          onClick={() => {
            const updatedSizes = newProduct.printOptions.sizes.includes(size)
              ? newProduct.printOptions.sizes.filter((s) => s !== size) // Remove the size if it exists
              : [...newProduct.printOptions.sizes, size]; // Add the size if it doesn't exist

            updatePrintOption("sizes", updatedSizes); // Update the state
          }}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={size}
              checked={newProduct.printOptions.sizes.includes(size)}
              onChange={() => {}} // Empty onChange to avoid double triggers
              className="hidden"
            />
            <span className="ml-2 text-white">{size}</span>
          </label>
          <input
            type="number"
            value={newProduct.brandingPrice?.sizesPrice?.[size] ?? ""}
            onChange={(e) => handleSizesPriceChange(size, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
            onClick={(e) => e.stopPropagation()} // Prevent price input clicks from triggering the container's onClick
          />
        </div>
      ))}
    </div>
  )}
</div>

        {/* Colors Section */}
<div className="mb-6">
  <CollapsibleHeader title="Colors" isOpen={openColors} toggleOpen={() => setOpenColors(!openColors)} />
  {openColors && (
    <div className="space-y-2">
      {colorOptions.map((color) => (
        <div
          key={color}
          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
            newProduct.printOptions.colors.includes(color)
              ? "bg-red-500 border-red-500"
              : "bg-gray-800 border-gray-700 hover:bg-gray-700"
          } border cursor-pointer`}
          onClick={() => {
            const updatedColors = newProduct.printOptions.colors.includes(color)
              ? newProduct.printOptions.colors.filter((c) => c !== color) // Remove the color if it exists
              : [...newProduct.printOptions.colors, color]; // Add the color if it doesn't exist

            updatePrintOption("colors", updatedColors); // Update the state
          }}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={color}
              checked={newProduct.printOptions.colors.includes(color)}
              onChange={() => {}} // Empty onChange to avoid double triggers
              className="hidden"
            />
            <span className="ml-2 text-white">{color}</span>
          </label>
          <input
            type="number"
            value={newProduct.brandingPrice?.colorsPrice?.[color] ?? ""}
            onChange={(e) => handleColorPriceChange(color, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
            onClick={(e) => e.stopPropagation()} // Prevent price input clicks from triggering the container's onClick
          />
        </div>
      ))}
    </div>
  )}
</div>

{/* Gender Section */}
<div className="mb-6">
  <CollapsibleHeader title="Gender" isOpen={openGender} toggleOpen={() => setOpenGender(!openGender)} />
  {openGender && (
    <div className="space-y-2">
      {genderOptions.map((gender) => (
        <div
          key={gender}
          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
            newProduct.printOptions.gender.includes(gender)
              ? "bg-red-500 border-red-500"
              : "bg-gray-800 border-gray-700 hover:bg-gray-700"
          } border cursor-pointer`}
          onClick={() => {
            const updatedGender = newProduct.printOptions.gender.includes(gender)
              ? newProduct.printOptions.gender.filter((g) => g !== gender) // Remove the gender if it exists
              : [...newProduct.printOptions.gender, gender]; // Add the gender if it doesn't exist

            updatePrintOption("gender", updatedGender); // Update the state
          }}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={gender}
              checked={newProduct.printOptions.gender.includes(gender)}
              onChange={() => {}} // Empty onChange to avoid double triggers
              className="hidden"
            />
            <span className="ml-2 text-white">{gender}</span>
          </label>
          <input
            type="number"
            value={newProduct.brandingPrice?.genderPrice?.[gender] ?? ""}
            onChange={(e) => handleGenderPriceChange(gender, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
            onClick={(e) => e.stopPropagation()} // Prevent price input clicks from triggering the container's onClick
          />
        </div>
      ))}
    </div>
  )}
</div>

{/* Print Back Section */}
<div className="mb-6">
  <CollapsibleHeader title="Print Back" isOpen={openPrintBack} toggleOpen={() => setOpenPrintBack(!openPrintBack)} />
  {openPrintBack && (
    <div className="space-y-2">
      {printBackOptions.map((option) => (
        <div
          key={option}
          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
            newProduct.printOptions.printBack.includes(option)
              ? "bg-red-500 border-red-500"
              : "bg-gray-800 border-gray-700 hover:bg-gray-700"
          } border cursor-pointer`}
          onClick={() => {
            const updatedPrintBack = newProduct.printOptions.printBack.includes(option)
              ? newProduct.printOptions.printBack.filter((s) => s !== option) // Remove the option if it exists
              : [...newProduct.printOptions.printBack, option]; // Add the option if it doesn't exist

            updatePrintOption("printBack", updatedPrintBack); // Update the state
          }}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={option}
              checked={newProduct.printOptions.printBack.includes(option)}
              onChange={() => {}} // Empty onChange to avoid double triggers
              className="hidden"
            />
            <span className="ml-2 text-white">{option}</span>
          </label>
          <input
            type="number"
            value={newProduct.brandingPrice?.printBackPrice?.[option] ?? ""}
            onChange={(e) => handlePrintBackPriceChange(option, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
            onClick={(e) => e.stopPropagation()} // Prevent price input clicks from triggering the container's onClick
          />
        </div>
      ))}
    </div>
  )}
</div>

{/* Print Front Section */}
<div className="mb-6">
  <CollapsibleHeader title="Print Front" isOpen={openPrintFront} toggleOpen={() => setOpenPrintFront(!openPrintFront)} />
  {openPrintFront && (
    <div className="space-y-2">
      {printFrontOptions.map((option) => (
        <div
          key={option}
          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
            newProduct.printOptions.printFront.includes(option)
              ? "bg-red-500 border-red-500"
              : "bg-gray-800 border-gray-700 hover:bg-gray-700"
          } border cursor-pointer`}
          onClick={() => {
            const updatedPrintFront = newProduct.printOptions.printFront.includes(option)
              ? newProduct.printOptions.printFront.filter((s) => s !== option) // Remove the option if it exists
              : [...newProduct.printOptions.printFront, option]; // Add the option if it doesn't exist

            updatePrintOption("printFront", updatedPrintFront); // Update the state
          }}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={option}
              checked={newProduct.printOptions.printFront.includes(option)}
              onChange={() => {}} // Empty onChange to avoid double triggers
              className="hidden"
            />
            <span className="ml-2 text-white">{option}</span>
          </label>
          <input
            type="number"
            value={newProduct.brandingPrice?.printFrontPrice?.[option] ?? ""}
            onChange={(e) => handlePrintFrontPriceChange(option, e.target.value)}
            step="0.01"
            className="w-20 bg-gray-700 border border-gray-600 rounded-md text-white px-2 py-1"
            placeholder="Price"
            onClick={(e) => e.stopPropagation()} // Prevent price input clicks from triggering the container's onClick
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
  <label className="block text-sm font-medium text-red-500 mb-2">
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
      className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
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
      className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
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
      className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200"
      placeholder="Height"
      step="0.01"
    />
  </div>
</div>

{/* Weight Section */}
<div>
  <label htmlFor="weight" className="block text-m font-medium text-red-500">
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
          className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </motion.div>
  );

};

export default BrandingProductForm;