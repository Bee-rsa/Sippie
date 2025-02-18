import { useState } from "react";
import toast from "react-hot-toast"; // For toast notifications

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    description: product.description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(product._id, updatedProduct); // Call the update function
    toast.success("Product updated successfully!");
  };

  const handleCategoryChange = (category) => {
    setUpdatedProduct({ ...updatedProduct, category });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedProduct({ ...updatedProduct, image: reader.result }); // Set the base64 image data as the new image
      };
      reader.readAsDataURL(file); // Convert the file to base64 format
    }
  };

  const handleRemoveImage = () => {
    setUpdatedProduct({ ...updatedProduct, image: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center p-4 transition-all duration-300 ease-in-out">
      <div className="flex w-full max-w-screen-xl gap-6">
        {/* Modal Container */}
        <div className="bg-gray-800 rounded-lg w-2/3 border border-gray-700 shadow-2xl">
          {/* Modal Header */}
          <div className="px-6 py-4 flex justify-between items-center bg-gradient-to-r from-green-600 to-teal-500 rounded-t-lg">
            <h2 className="text-2xl font-semibold text-white font-poppins">Edit Product</h2>
            <button
              onClick={onClose}
              className="text-red-500 text-4xl hover:text-red-900 transition-colors"
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            {/* Product Name */}
            <div>
              <label className="text-white text-sm font-medium font-poppins">Name</label>
              <input
                type="text"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
                placeholder="Product Name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-white text-sm font-medium font-poppins">Description</label>
              <input
                type="text"
                value={updatedProduct.description || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, description: e.target.value })
                }
                className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
                placeholder="Product Description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-white text-sm font-medium font-poppins">Price</label>
              <input
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
                className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
                placeholder="Price"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-white text-sm font-poppins font-medium">Image</label>
              {/* File name displayed on top */}
              <div className="text-white mt-2 text-sm">
                {updatedProduct.image ? (
                  <span>New image selected</span>
                ) : (
                  <span>{product.image || "No image uploaded"}</span>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-1/3 p-2 bg-gray-700 text-white font-poppins rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {updatedProduct.image && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-400 transition-colors"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-white text-sm font-medium font-poppins">Category</label>
              <div className="flex space-x-3">
                {["Design", "Print", "Signs", "Branding", "Paint"].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`text-white text-sm px-4 py-1 rounded-md ${updatedProduct.category === category ? "bg-blue-600" : "bg-gray-600"} hover:bg-blue-500 font-poppins`}
                  >
                    {category} 
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-4 px-6 py-4 bg-gray-900 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none transition-colors font-poppins"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none transition-colors font-poppins"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Product Card - Displaying changes as they happen */}
        <div className="bg-gray-800 rounded-lg w-1/3 border border-gray-700 shadow-xl p-6 space-y-4">
          <h2 className="text-3xl font-bold text-green-500 text-center mb-4 font-poppins">Product Preview</h2>
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
              <h3 className="text-2xl text-white font-semibold">{updatedProduct.name}</h3>
              <p className="text-m text-gray-300">{updatedProduct.description}</p>
              <p className="text-2xl text-green-500 mt-2 font-semibold">R{updatedProduct.price}</p>
            </div>

            {/* Category Section */}
            <div className="w-full text-left font-poppins">
              <span
                className={`text-l px-3 py-2 rounded-lg ${updatedProduct.category === "Design" ? "bg-blue-700 text-white" : updatedProduct.category === "Print" ? "bg-pink-700 text-white" : updatedProduct.category === "Signs" ? "bg-yellow-600 text-white" : updatedProduct.category === "Branding" ? "bg-red-700 text-white" : "bg-lime-400 text-white"}`}
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

export default EditProductModal;
