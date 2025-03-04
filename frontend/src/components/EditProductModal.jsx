import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // For toast notifications
import PropTypes from "prop-types"; // Import PropTypes

const EditProductModal = ({ product, onClose, onUpdate }) => {
  // Base product state
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    description: product.description,
  });

  // State for models (price groups/options)
  const [models, setModels] = useState({});

  // Extract models based on the product's category.
  // Also extract the "productPrice" from the respective group.
  const extractModels = (category) => {
    const { printPrice, brandingPrice, signsPrice } = product;
    let extracted = {};

    switch (category) {
      case "Print":
        extracted = printPrice || {};
        break;
      case "Signs":
        extracted = signsPrice || {};
        break;
      case "Branding":
        extracted = brandingPrice || {};
        break;
      default:
        extracted = {};
    }
    setModels(extracted);

    // Set the base product price (if available) from the selected model.
    if (extracted.productPrice !== undefined) {
      setUpdatedProduct((prev) => ({
        ...prev,
        price: extracted.productPrice,
      }));
    }
  };

  // Run on initial mount and whenever product or category changes.
  useEffect(() => {
    extractModels(product.category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, updatedProduct.category]);

  // Handler to update base product fields
  const handleChange = (field, value) => {
    setUpdatedProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Handler to update the image
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("image", reader.result);
      };
      reader.readAsDataURL(file); // Convert the file to base64 format
    }
  };

  const handleRemoveImage = () => {
    handleChange("image", "");
  };

  // Update category and re-extract models when category changes.
  const handleCategoryChange = (category) => {
    handleChange("category", category);
    extractModels(category);
  };

  // Handler to update model values.
  // subKey is either a key inside a group (for options) or "productPrice".
  const handleModelChange = (groupKey, subKey, value) => {
    setModels((prevModels) => {
      const updatedGroup = { ...prevModels[groupKey], [subKey]: value };
      const newModels = { ...prevModels, [groupKey]: updatedGroup };

      // If the changed subKey is productPrice, update the overall product price.
      if (subKey === "productPrice") {
        setUpdatedProduct((prev) => ({
          ...prev,
          price: value,
        }));
      }
      return newModels;
    });
  };

  // Render each model group in a two-column layout.
  const renderModels = () => {
    return Object.entries(models).map(([groupKey, groupValue]) => {
      // Only render groups that are objects (Maps of values)
      if (typeof groupValue === "object" && groupValue !== null) {
        // Convert groupKey to spaced words (e.g., "SizePrice" -> "Size Price")
        const spacedGroupKey = groupKey.replace(/([A-Z])/g, " $1").trim();
        return (
          <div key={groupKey} className="mb-2">
            <h3 className="font-semibold capitalize mb-1 text-xs text-green-500">
              {spacedGroupKey}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(groupValue).map(([subKey, subValue]) => {
                const spacedSubKey = subKey.replace(/([A-Z])/g, " $1").trim();
                return (
                  <div
                    key={subKey}
                    className="flex items-center space-x-1 border p-1 rounded-md w-full"
                  >
                    <label className="w-20 text-xs text-white whitespace-nowrap">
                      {subKey === "productPrice"
                        ? "Base Price"
                        : spacedSubKey}
                      :
                    </label>
                    <input
                      type="number"
                      value={subValue}
                      onChange={(e) =>
                        handleModelChange(
                          groupKey,
                          subKey,
                          Number(e.target.value)
                        )
                      }
                      className="ml-auto p-1 text-xs rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-green-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  // Render a footer for the models section
  const renderModelsFooter = () => {
    return (
      <div className="pt-2 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          Adjust the values above to update the respective pricing options.
        </p>
      </div>
    );
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...updatedProduct, models };
    console.log("Data being sent to onUpdate:", updatedData);

    if (typeof onUpdate === "function") {
      onUpdate(product._id, updatedData);
      toast.success("Product updated successfully!");
    } else {
      console.error("onUpdate is not a function");
      toast.error("Failed to update product: onUpdate is not a function");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-2 transition-all duration-300 ease-in-out">
      <div className="flex w-full max-w-screen-xl gap-4">
        {/* Modal Container */}
        <div className="bg-gray-800 rounded-md w-2/3 border border-gray-700 shadow-md">
          {/* Modal Header */}
          <div className="px-4 py-2 flex justify-between items-center bg-gradient-to-r from-green-600 to-teal-500 rounded-t-md">
            <h2 className="text-xl font-semibold text-white font-poppins">
              Edit Product
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 text-3xl hover:text-red-900 transition-colors"
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="px-4 py-2 space-y-2">
            {/* Product Name */}
            <div>
              <label className="text-green-500 text-xs font-medium font-poppins">
                Name
              </label>
              <input
                type="text"
                value={updatedProduct.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                placeholder="Product Name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-green-500 text-xs font-medium font-poppins">
                Description
              </label>
              <input
                type="text"
                value={updatedProduct.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full p-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                placeholder="Product Description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-green-500 text-xs font-medium font-poppins">
                Price
              </label>
              <input
                type="number"
                value={updatedProduct.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full p-1 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
                placeholder="Price"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-green-500 text-xs font-poppins font-medium">
                Image
              </label>
              <div className="text-white mt-1 text-xs">
                {updatedProduct.image ? (
                  <span>New image selected</span>
                ) : (
                  <span>{product.image || "No image uploaded"}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-1/3 p-1 bg-gray-700 text-white font-poppins rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {updatedProduct.image && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-400 transition-colors text-xs"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-green-500 text-xs font-medium font-poppins">
                Category
              </label>
              <div className="flex space-x-2">
                {["Design", "Print", "Signs", "Branding", "Paint"].map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`text-white text-xs px-3 py-1 rounded-md ${
                        updatedProduct.category === category
                          ? "bg-blue-600"
                          : "bg-gray-600"
                      } hover:bg-blue-500 font-poppins`}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Models Section */}
            <div>
              <label className="text-green-500 text-xs font-medium font-poppins">
                Models
              </label>
              <div className="space-y-1 text-white">{renderModels()}</div>
              {renderModelsFooter()}
            </div>
          </form>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-2 px-4 py-2 bg-gray-900 rounded-b-md">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none transition-colors text-xs font-poppins"
            >
              Cancel
            </button>
            <button
              type="submit" // Ensure this is set
              onClick={handleSubmit}
              className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none transition-colors text-xs font-poppins"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Product Preview */}
        <div className="bg-gray-800 rounded-lg w-1/3 border border-gray-700 shadow-xl p-6 space-y-4">
          <h2 className="text-3xl font-bold text-green-500 text-center mb-4 font-poppins">
            Product Preview
          </h2>
          <div className="flex flex-col items-center space-y-4">
            {/* Image Section */}
            <div className="relative w-40 h-40 rounded-md overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
              <img
                src={updatedProduct.image || product.image}
                alt={updatedProduct.name || product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="text-left space-y-2 font-poppins">
              <h3 className="text-2xl text-white font-semibold">
                {updatedProduct.name}
              </h3>
              <p className="text-m text-gray-300">
                {updatedProduct.description}
              </p>
              <p className="text-2xl text-green-500 mt-2 font-semibold">
                R{updatedProduct.price}
              </p>
            </div>

            {/* Category Section */}
            <div className="w-full text-left font-poppins">
              <span
                className={`text-l px-3 py-2 rounded-lg ${
                  updatedProduct.category === "Design"
                    ? "bg-blue-700 text-white"
                    : updatedProduct.category === "Print"
                    ? "bg-pink-700 text-white"
                    : updatedProduct.category === "Signs"
                    ? "bg-yellow-600 text-white"
                    : updatedProduct.category === "Branding"
                    ? "bg-red-700 text-white"
                    : "bg-lime-400 text-white"
                }`}
              >
                {updatedProduct.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define prop types for the component
EditProductModal.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    printPrice: PropTypes.object,
    brandingPrice: PropTypes,
    signsPrice: PropTypes.object,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditProductModal;