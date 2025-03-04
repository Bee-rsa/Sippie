import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { id: productId, printPrice, brandingPrice, signsPrice, price, category } = product;

  console.log("Product Object:", product);
  console.log("Category:", category);
  console.log("Price Data:", { printPrice, brandingPrice, signsPrice, price });

  // Improved getProductPrice function
  const getProductPrice = () => {
    let selectedPrice = null;

    if (category?.toLowerCase() === "print" && printPrice?.productPrice !== undefined) {
      selectedPrice = printPrice.productPrice;
    } else if (category?.toLowerCase() === "branding" && brandingPrice?.productPrice !== undefined) {
      selectedPrice = brandingPrice.productPrice;
    } else if (category?.toLowerCase() === "signs" && signsPrice?.productPrice !== undefined) {
      selectedPrice = signsPrice.productPrice;
    } else if (price !== undefined) {
      selectedPrice = price;
    }

    console.log("Final Selected Price:", selectedPrice);
    return selectedPrice ?? "Price not available";
  };

  const productPrice = getProductPrice();

  return (
    <div
      className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg"
      data-product-id={productId}
      id={`product-card-${productId}`}
    >
      {/* Product Image */}
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-contain w-full h-full"
          src={product.image}
          alt="product image"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col px-5 pb-4">
        <h5 className="text-xl font-semibold tracking-tight text-white">{product.name}</h5>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-emerald-400">
              {productPrice !== "Price not available" ? `R${productPrice}` : productPrice}
            </span>
          </p>
        </div>

        {/* Product Description */}
        <p className="text-sm text-gray-300 mt-2 mb-2 line-clamp-5">
          {product.description}
        </p>

        {/* Product ID */}
        <p className="text-center text-sm text-black mb-2">Product ID: {product._id}</p>

        {/* Printing Options Button */}
        <div className="text-center">
          <Link
            to={`/products/${product._id}`}
            className="flex items-center justify-center w-full rounded-lg bg-emerald-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            <ShoppingCart size={22} className="mr-2" />
            Printing Options
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
