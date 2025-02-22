import { motion } from "framer-motion";
import { Trash, Star, Edit } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { toast } from "react-toastify";
import EditProductModal from "./EditProductModal";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products, updateProduct } = useProductStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle edit button click
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // Function to handle product updates using the store's updateProduct
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      if (typeof updateProduct === "function") {
        await updateProduct(productId, updatedData);
        toast.success("Product updated successfully!");
      } else {
        console.error("updateProduct is not a function");
        toast.error("Failed to update product: updateProduct is not a function");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <>
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Featured
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    R{Number.isFinite(product.productPrice) ? product.productPrice.toFixed(2) : "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1 rounded-full ${
                      product.isFeatured
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-600 text-gray-300"
                    } hover:bg-yellow-500 transition-colors duration-200`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </>
  );
};

export default ProductsList;