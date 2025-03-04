import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/slices/productsSlice.js";
import PropTypes from "prop-types";

const categories = ["Print"];
const Sides = ["Single Side", "Double Side"];
const PaperFinish = ["Gloss Finish", "Matte Finish", "Soft Touch Lamination"];
const PaperWeight = ["80 - 100 gsm", "120 - 170 gsm", "200 - 300 gsm", "350 - 400 gsm"];
const StandardSizes = ["A4", "A5", "A6", "DL"];
const Lamination = ["Gloss Lamination", "Matte Lamination", "Soft Touch Lamination"];
const CornerType = ["Square Corners", "Rounded Corners"];
const Layout = ["Portrait", "Landscape"];

// Collapsible header component
const CollapsibleHeader = ({ title, isOpen, toggleOpen }) => (
  <div className="flex items-center justify-between cursor-pointer" onClick={toggleOpen}>
    <label className="block text-m font-medium text-pink-500 mb-2">{title}</label>
    {isOpen ? <ChevronUp className="text-pink-500" /> : <ChevronDown className="text-pink-500" />}
  </div>
);

CollapsibleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

const PrintProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  // Form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    sku: "",
    dimensions: { length: "", width: "", height: "" }, // Moved out of printOptions
    weight: "", // Moved out of printOptions
    category: "",
    images: [],
    printPrice: {
      sidesPrices: {},
      paperFinishPrices: {},
      paperWeightPrices: {},
      standardSizesPrices: {},
      laminationPrices: {},
      cornerTypePrices: {},
      layoutPrices: {},
    },
    printOptions: {
      sides: [],
      paperFinish: [],
      paperWeight: [],
      standardSizes: [],
      lamination: [],
      cornerType: [],
      layout: [],
      isFeatured: false,
      isPublished: false,
    },
  });

  // Collapsible sections state for all print option groups
  const [openSides, setOpenSides] = useState(false);
  const [openPaperFinish, setOpenPaperFinish] = useState(false);
  const [openPaperWeight, setOpenPaperWeight] = useState(false);
  const [openStandardSizes, setOpenStandardSizes] = useState(false);
  const [openLamination, setOpenLamination] = useState(false);
  const [openCornerType, setOpenCornerType] = useState(false);
  const [openLayout, setOpenLayout] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert dimensions and weight to numbers (defaulting empty strings to 0)
    const dimensions = {
      length: Number(newProduct.dimensions.length) || 0,
      width: Number(newProduct.dimensions.width) || 0,
      height: Number(newProduct.dimensions.height) || 0,
    };
    const productToSubmit = {
      ...newProduct,
      dimensions,
      weight: Number(newProduct.weight) || 0,
    };
    try {
      await dispatch(createProduct(productToSubmit)).unwrap();
      // Reset form after submission
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        sku: "",
        dimensions: { length: "", width: "", height: "" },
        weight: "",
        category: "",
        images: [],
        printPrice: {
          sidesPrices: {},
          paperFinishPrices: {},
          paperWeightPrices: {},
          standardSizesPrices: {},
          laminationPrices: {},
          cornerTypePrices: {},
          layoutPrices: {},
        },
        printOptions: {
          sides: [],
          paperFinish: [],
          paperWeight: [],
          standardSizes: [],
          lamination: [],
          cornerType: [],
          layout: [],
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

  // Handle Number of Sides Price Change
  const handleSidesPriceChange = (side, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      printPrice: {
        ...prev.printPrice,
        sidesPrices: {
          ...prev.printPrice.sidesPrices,
          [side]: parsedValue, // Update price for specific side
        },
      },
    }));
  };

  // Handle Paper Finish Prices Change
  const handlePaperFinishPriceChange = (finish, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      printPrice: {
        ...prev.printPrice,
        paperFinishPrices: {
          ...prev.printPrice.paperFinishPrices,
          [finish]: parsedValue, // Update price for specific finish
        },
      },
    }));
  };

  // Handle Paper Weight Prices Change
  const handlePaperWeightPriceChange = (weight, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      printPrice: {
        ...prev.printPrice,
        paperWeightPrices: {
          ...prev.printPrice.paperWeightPrices,
          [weight]: parsedValue, // Update price for specific weight
        },
      },
    }));
  };

  // Handle Standard Sizes Prices Change
  const handleStandardSizesPriceChange = (size, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      printPrice: {
        ...prev.printPrice,
        standardSizesPrices: {
          ...prev.printPrice.standardSizesPrices,
          [size]: parsedValue, // Update price for specific size
        },
      },
    }));
  };

  // Handle Lamination Prices Change
  const handleLaminationPriceChange = (lamination, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      printPrice: {
        ...prev.printPrice,
        laminationPrices: {
          ...prev.printPrice.laminationPrices,
          [lamination]: parsedValue, // Update price for specific lamination
        },
      },
    }));
  };

  // Handle Corner Type Prices Change
  const handleCornerTypePriceChange = (cornerType, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      printPrice: {
        ...prev.printPrice,
        cornerTypePrices: {
          ...prev.printPrice.cornerTypePrices,
          [cornerType]: parsedValue, // Update price for specific corner type
        },
      },
    }));
  };

  // Handle Layout Prices Change
  const handleLayoutPriceChange = (layout, value) => {
    const parsedValue = value === "" ? "" : parseFloat(value);
    setNewProduct((prev) => ({
      ...prev,
      printPrice: {
        ...prev.printPrice,
        layoutPrices: {
          ...prev.printPrice.layoutPrices,
          [layout]: parsedValue, // Update price for specific layout
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
      <h2 className="text-2xl font-bold mb-6 text-pink-700">Create New Print Product</h2>
      {error && <p className="text-pink-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Product Info */}
        <div>
          <label htmlFor="name" className="block text-m font-medium text-pink-500">
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
          <label htmlFor="description" className="block text-m font-medium text-pink-500">
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
          <label htmlFor="price" className="block text-m font-medium text-pink-500">
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
          <label htmlFor="sku" className="block text-m font-medium text-pink-500">
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
          <label htmlFor="category" className="block text-m font-medium text-pink-500">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700 transition-all duration-200"
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
          <label htmlFor="image" className="bg-pink-600 text-white py-2 px-4 rounded-md cursor-pointer">
            <Upload className="inline mr-2" />
            Upload Product Image
          </label>
        </div>

        <hr className="my-4 border-gray-600" />

        <h2 className="text-2xl font-bold text-white">Printing Options</h2>

        {/* Sides Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Sides" isOpen={openSides} toggleOpen={() => setOpenSides(!openSides)} />
          {openSides && (
            <div className="space-y-2">
              {Sides.map((side) => (
                <div
                  key={side}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.sides.includes(side)
                      ? "bg-pink-500 border-pink-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("sides", side)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={side}
                      checked={newProduct.printOptions.sides.includes(side)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{side}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.printPrice.sidesPrices[side] ?? ""}
                    onChange={(e) => handleSidesPriceChange(side, e.target.value)}
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

        {/* Paper Finish Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Paper Finish" isOpen={openPaperFinish} toggleOpen={() => setOpenPaperFinish(!openPaperFinish)} />
          {openPaperFinish && (
            <div className="space-y-2">
              {PaperFinish.map((finish) => (
                <div
                  key={finish}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.paperFinish.includes(finish)
                      ? "bg-pink-500 border-pink-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("paperFinish", finish)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={finish}
                      checked={newProduct.printOptions.paperFinish.includes(finish)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{finish}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.printPrice?.paperFinishPrices?.[finish] ?? ""}
                    onChange={(e) => handlePaperFinishPriceChange(finish, e.target.value)}
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

        {/* Paper Weight Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Paper Weight" isOpen={openPaperWeight} toggleOpen={() => setOpenPaperWeight(!openPaperWeight)} />
          {openPaperWeight && (
            <div className="space-y-2">
              {PaperWeight.map((weight) => (
                <div
                  key={weight}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.paperWeight.includes(weight)
                      ? "bg-pink-500 border-pink-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("paperWeight", weight)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={weight}
                      checked={newProduct.printOptions.paperWeight.includes(weight)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{weight}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.printPrice?.paperWeightPrices?.[weight] ?? ""}
                    onChange={(e) => handlePaperWeightPriceChange(weight, e.target.value)}
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

        {/* Standard Sizes Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Standard Sizes" isOpen={openStandardSizes} toggleOpen={() => setOpenStandardSizes(!openStandardSizes)} />
          {openStandardSizes && (
            <div className="space-y-2">
              {StandardSizes.map((size) => (
                <div
                  key={size}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.standardSizes.includes(size)
                      ? "bg-pink-500 border-pink-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("standardSizes", size)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={newProduct.printPrice?.standardSizes?.[size] ?? ""}
                      checked={newProduct.printOptions.standardSizes.includes(size)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{size}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.printPrice.standardSizesPrices[size] ?? ""}
                    onChange={(e) => handleStandardSizesPriceChange(size, e.target.value)}
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

        {/* Lamination Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Lamination" isOpen={openLamination} toggleOpen={() => setOpenLamination(!openLamination)} />
          {openLamination && (
            <div className="space-y-2">
              {Lamination.map((lamination) => (
                <div
                  key={lamination}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.lamination.includes(lamination)
                      ? "bg-pink-500 border-pink-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("lamination", lamination)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={newProduct.printPrice?.laminationPrices?.[lamination] ?? ""}
                      checked={newProduct.printOptions.lamination.includes(lamination)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{lamination}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.printPrice.laminationPrices[lamination] ?? ""}
                    onChange={(e) => handleLaminationPriceChange(lamination, e.target.value)}
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

        {/* Corner Type Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Corner Type" isOpen={openCornerType} toggleOpen={() => setOpenCornerType(!openCornerType)} />
          {openCornerType && (
            <div className="space-y-2">
              {CornerType.map((cornerType) => (
                <div
                  key={cornerType}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.cornerType.includes(cornerType)
                      ? "bg-pink-500 border-pink-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("cornerType", cornerType)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={newProduct.printPrice?.cornerTypePrices?.[cornerType] ?? ""}
                      checked={newProduct.printOptions.cornerType.includes(cornerType)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{cornerType}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.printPrice?.cornerTypePrices?.[cornerType] ?? ""}
                    onChange={(e) => handleCornerTypePriceChange(cornerType, e.target.value)}
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

        {/* Layout Section */}
        <div className="mb-6">
          <CollapsibleHeader title="Layout" isOpen={openLayout} toggleOpen={() => setOpenLayout(!openLayout)} />
          {openLayout && (
            <div className="space-y-2">
              {Layout.map((layout) => (
                <div
                  key={layout}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    newProduct.printOptions.layout.includes(layout)
                      ? "bg-pink-500 border-pink-500"
                      : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  } border cursor-pointer`}
                  onClick={() => toggleOption("layout", layout)}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={newProduct.printPrice?.layoutPrices?.[layout] ?? ""}
                      checked={newProduct.printOptions.layout.includes(layout)}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <span className="ml-2 text-white">{layout}</span>
                  </label>
                  <input
                    type="number"
                    value={newProduct.printPrice?.layoutPrices?.[layout] ?? ""}
                    onChange={(e) => handleLayoutPriceChange(layout, e.target.value)}
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
          <label className="block text-sm font-medium text-pink-500 mb-2">
            Product Dimensions
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="length"
              name="length"
              value={newProduct.dimensions.length}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  dimensions: {
                    ...newProduct.dimensions,
                    length: e.target.value,
                  },
                })
              }
              className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200"
              placeholder="Length"
              step="0.01"
            />
            <input
              type="number"
              id="width"
              name="width"
              value={newProduct.dimensions.width}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  dimensions: {
                    ...newProduct.dimensions,
                    width: e.target.value,
                  },
                })
              }
              className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200"
              placeholder="Width"
              step="0.01"
            />
            <input
              type="number"
              id="height"
              name="height"
              value={newProduct.dimensions.height}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  dimensions: {
                    ...newProduct.dimensions,
                    height: e.target.value,
                  },
                })
              }
              className="w-1/3 bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200"
              placeholder="Height"
              step="0.01"
            />
          </div>
        </div>

        {/* Weight Section */}
        <div>
          <label htmlFor="weight" className="block text-m font-medium text-pink-500">
            Weight
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={newProduct.weight || ""}
            onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-pink-600 text-white py-2 px-6 rounded-md w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default PrintProductForm;