import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["Print"];
const Sides = ["Single Side", "Double Side"];
const PaperFinish = ["Gloss Finish", "Matte Finish", "Soft Touch Lamination"];
const PaperWeight = ["80 - 100 gsm", "120 - 170 gsm", "200 - 300 gsm", "350 - 400 gsm"];
const StandardSizes = ["A4", "A5", "A6", "DL"];
const Lamination = ["Gloss Lamination", "Matte Lamination", "Soft Touch Lamination"];
const CornerType = ["Square Corners", "Rounded Corners"];
const Layout = ["Portrait", "Landscape"];

const PrintProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    printPrice: {
      productPrice: 0,
      sidesPrices: {
        "Single Side": 0,
        "Double Side": 0,
      },
      paperFinishPrices: {
        "Gloss Finish": 0,
        "Matte Finish": 0,
        "Soft Touch Lamination": 0,
      },
      paperWeightPrices: {
        "80 - 100 gsm": 0,
        "120 - 170 gsm": 0,
        "200 - 300 gsm": 0,
        "350 - 400 gsm": 0,
      },
      standardSizesPrices: {
        "A4": 0,
        "A5": 0,
        "A6": 0,
        "DL": 0,
      },
      laminationPrices: {
        "Gloss Lamination": 0,
        "Matte Lamination": 0,
        "Soft Touch Lamination": 0,
      },
      cornerTypePrices: {
        "Square Corners": 0,
        "Rounded Corners": 0,
      },
      layoutPrices: {
        "Portrait": 0,
        "Landscape": 0,
      },
    },
    category: "",
    image: "",
    sides: [],
    paperFinish: [],
    paperWeight: [],
    standardSizes: [],
    lamination: [],
    cornerType: [],
    layout: [],
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
        printPrice: {
          productPrice: 0,
          sidesPrices: {
            "Single Side": 0,
            "Double Side": 0,
          },
          paperFinishPrices: {
            "Gloss Finish": 0,
            "Matte Finish": 0,
            "Soft Touch Lamination": 0,
          },
          paperWeightPrices: {
            "80 - 100 gsm": 0,
            "120 - 170 gsm": 0,
            "200 - 300 gsm": 0,
            "350 - 400 gsm": 0,
          },
          standardSizesPrices: {
            "A4": 0,
            "A5": 0,
            "A6": 0,
            "DL": 0,
          },
          laminationPrices: {
            "Gloss Lamination": 0,
            "Matte Lamination": 0,
            "Soft Touch Lamination": 0,
          },
          cornerTypePrices: {
            "Square Corners": 0,
            "Rounded Corners": 0,
          },
          layoutPrices: {
            "Portrait": 0,
            "Landscape": 0,
          },
        },
        category: "",
        sides: [],
        paperFinish: [],
        paperWeight: [],
        standardSizes: [],
        lamination: [],
        cornerType: [],
        layout: [],
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
      printPrice: {
        ...prev.printPrice,
        productPrice: parsedValue,
      },
    }));
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

      <hr className="my-4 border-gray-600" />

      <h2 className="text-2xl font-bold mb-4 text-white">Product Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
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
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            required
          />
        </div>

        <div>
          <label htmlFor="productPrice" className="block text-m font-medium text-pink-500">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={newProduct.printPrice?.productPrice ?? ""} // Ensure default is an empty string if no value
            onChange={(e) => handleProductPriceChange(e.target.value)} // Trigger handleProductPriceChange on input
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            placeholder="Enter Amount"
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
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
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
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-700"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newProduct.image && <span className="ml-3 text-m text-pink-500">Image uploaded</span>}
        </div>

        <hr className="my-4 border-gray-600" />

<h2 className="text-2xl font-bold text-white">Printing Options</h2>

<div className="space-y-2">
            {/* Number of Sides Options */}
            <div className="border border-gray-600 p-4 rounded-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("sides")}
            >
              <label className="block text-m font-medium text-pink-500">Number Of Sides</label>
              {expandedSections.sides ? <ChevronUp className="h-5 w-5 text-pink-500" /> : <ChevronDown className="h-5 w-5 text-pink-500" />}
            </div>
            {expandedSections.sides && (
              <ul className="space-y-1 mt-2">
                {Sides.map((side) => (
                  <li key={side} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.sides.includes(side) ? "bg-pink-500" : "bg-gray-700"} border-gray-600`}
                        onClick={() => handleSelection("sides", side)}
                      />
                      <span className={`text-white ${newProduct.sides.includes(side) ? "text-pink-500" : ""}`}>
                        {side}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={newProduct.printPrice?.sidesPrices[side] ?? ""}
                      onChange={(e) => handleSidesPriceChange(side, e.target.value)}
                      className="ml-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
                      placeholder={`Price for ${side}`}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

  {/* Paper Finish */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("paperFinish")}>
    <label className="block text-m font-medium text-pink-500">Paper Finish</label>
    {expandedSections.paperFinish ? <ChevronUp className="h-5 w-5 text-pink-500" /> : <ChevronDown className="h-5 w-5 text-pink-500" />}
  </div>
  {expandedSections.paperFinish && (
    <ul className="space-y-1 mt-2">
      {PaperFinish.map((finish) => (
        <li key={finish} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.paperFinish.includes(finish) ? "bg-pink-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("paperFinish", finish)}
            />
            <span className={`text-white ${newProduct.paperFinish.includes(finish) ? "text-pink-500" : ""}`}>
              {finish}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.printPrice?.paperFinishPrices[finish] ?? ""}
            onChange={(e) => handlePaperFinishPriceChange(finish, e.target.value)}
            className="ml-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            placeholder={`Price for ${finish}`}
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Paper Weight */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("paperWeight")}>
    <label className="block text-m font-medium text-pink-500">Paper Weight</label>
    {expandedSections.paperWeight ? <ChevronUp className="h-5 w-5 text-pink-500" /> : <ChevronDown className="h-5 w-5 text-pink-500" />}
  </div>
  {expandedSections.paperWeight && (
    <ul className="space-y-1 mt-2">
      {PaperWeight.map((weight) => (
        <li key={weight} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.paperWeight.includes(weight) ? "bg-pink-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("paperWeight", weight)}
            />
            <span className={`text-white ${newProduct.paperWeight.includes(weight) ? "text-pink-500" : ""}`}>
              {weight}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.printPrice?.paperWeightPrices[weight] ?? ""}
            onChange={(e) => handlePaperWeightPriceChange(weight, e.target.value)}
            className="ml-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            placeholder={`Price for ${weight}`}
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Standard Sizes */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("standardSizes")}>
    <label className="block text-m font-medium text-pink-500">Standard Sizes</label>
    {expandedSections.standardSizes ? <ChevronUp className="h-5 w-5 text-pink-500" /> : <ChevronDown className="h-5 w-5 text-pink-500" />}
  </div>
  {expandedSections.standardSizes && (
    <ul className="space-y-1 mt-2">
      {StandardSizes.map((size) => (
        <li key={size} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.standardSizes.includes(size) ? "bg-pink-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("standardSizes", size)}
            />
            <span className={`text-white ${newProduct.standardSizes.includes(size) ? "text-pink-500" : ""}`}>
              {size}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.printPrice?.standardSizesPrices[size] ?? ""}
            onChange={(e) => handleStandardSizesPriceChange(size, e.target.value)}
            className="ml-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            placeholder={`Price for ${size}`}
          />
        </li>
      ))}
    </ul>
  )}
</div>

  {/* Lamination */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("lamination")}>
    <label className="block text-m font-medium text-pink-500">Lamination</label>
    {expandedSections.lamination ? <ChevronUp className="h-5 w-5 text-pink-500" /> : <ChevronDown className="h-5 w-5 text-pink-500" />}
  </div>
  {expandedSections.lamination && (
    <ul className="space-y-1 mt-2">
      {Lamination.map((lam) => (
        <li key={lam} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.lamination.includes(lam) ? "bg-pink-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("lamination", lam)}
            />
            <span className={`text-white ${newProduct.lamination.includes(lam) ? "text-pink-500" : ""}`}>
              {lam}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.printPrice?.laminationPrices[lam] ?? ""}
            onChange={(e) => handleLaminationPriceChange(lam, e.target.value)}
            className="ml-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            placeholder={`Price for ${lam}`}
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Corner Type */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("cornerType")}>
    <label className="block text-m font-medium text-pink-500">Corner Type</label>
    {expandedSections.cornerType ? <ChevronUp className="h-5 w-5 text-pink-500" /> : <ChevronDown className="h-5 w-5 text-pink-500" />}
  </div>
  {expandedSections.cornerType && (
    <ul className="space-y-1 mt-2">
      {CornerType.map((corner) => (
        <li key={corner} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.cornerType.includes(corner) ? "bg-pink-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("cornerType", corner)}
            />
            <span className={`text-white ${newProduct.cornerType.includes(corner) ? "text-pink-500" : ""}`}>
              {corner}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.printPrice?.cornerTypePrices[corner] ?? ""}
            onChange={(e) => handleCornerTypePriceChange(corner, e.target.value)}
            className="ml-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            placeholder={`Price for ${corner}`}
          />
        </li>
      ))}
    </ul>
  )}
</div>

{/* Layout */}
<div className="border border-gray-600 p-4 rounded-lg">
  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("layout")}>
    <label className="block text-m font-medium text-pink-500">Layout</label>
    {expandedSections.layout ? <ChevronUp className="h-5 w-5 text-pink-500" /> : <ChevronDown className="h-5 w-5 text-pink-500" />}
  </div>
  {expandedSections.layout && (
    <ul className="space-y-1 mt-2">
      {Layout.map((layout) => (
        <li key={layout} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-6 h-6 border-2 rounded-md cursor-pointer ${newProduct.layout.includes(layout) ? "bg-pink-500" : "bg-gray-700"} border-gray-600`}
              onClick={() => handleSelection("layout", layout)}
            />
            <span className={`text-white ${newProduct.layout.includes(layout) ? "text-pink-500" : ""}`}>
              {layout}
            </span>
          </div>
          <input
            type="number"
            value={newProduct.printPrice?.layoutPrices[layout] ?? ""}
            onChange={(e) => handleLayoutPriceChange(layout, e.target.value)}
            className="ml-4 bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-pink-700"
            placeholder={`Price for ${layout}`}
          />
        </li>
      ))}
    </ul>
  )}
</div>
</div>

<button
  type="submit"
  className="w-full bg-pink-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-offset-2"
>
  {loading ? "Saving..." : "Create Product"}
</button>
      </form>
    </motion.div>
  );
};

export default PrintProductForm;
