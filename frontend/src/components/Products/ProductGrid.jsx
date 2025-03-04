import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`} className="block">
          <div className="bg-black text-white w-full relative flex flex-col overflow-hidden border border-gray-700 shadow-lg p-4 rounded-lg h-96">
            {/* Fixed height container, adjust h-96 (24rem) as needed */}
            <div className="relative mx-3 flex h-40 overflow-hidden rounded-xl">
              <img
                src={product?.images?.[0]?.url || "/placeholder.jpg"}
                alt={product?.images?.[0]?.altText || product.name || "Product image"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow flex flex-col justify-between mt-4">
              <div>
                <h3 className="text-lg mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-sm -mt-2 mb-2 text-gray-300">
                    SKU: {product.sku}
                  </p>
                <div className="flex items-center space-x-2">
                  <p className="text-green-500 text-l text-base tracking-tighter">
                    R {product.price}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2 line-clamp-4">
                {product.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ProductGrid;
