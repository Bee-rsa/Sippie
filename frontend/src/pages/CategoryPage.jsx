import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import TableOfContents from "../components/TableOfContents";

const CategoryPage = () => {
  const { fetchProductsByCategory, products, totalPages, currentPage } = useProductStore();
  const { category } = useParams();
  const [page, setPage] = useState(1);

  // Scroll to the top of the page when category or page changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, [category, page]);

  // Fetch products when category or page changes
  useEffect(() => {
    fetchProductsByCategory(category, page);
  }, [fetchProductsByCategory, category, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen font-poppins">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <TableOfContents />

          {/* Main Content */}
          <div className="md:col-span-3">
            <motion.h1
              className="text-center text-4xl sm:text-5xl font-bold text-green-500 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.h1>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {products?.length === 0 && (
                <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                  No products found
                </h2>
              )}

              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-4 py-2 rounded ${
                    currentPage === index + 1
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;