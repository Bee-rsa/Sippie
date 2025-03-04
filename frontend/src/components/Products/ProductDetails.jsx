import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import PropTypes from "prop-types";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [quantity ] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [printOptions, setPrintOptions] = useState({});
  const [dynamicPrice, setDynamicPrice] = useState(0);

  const productFetchId = productId || id;

  // Fetch product details and similar products
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // Initialize main image and dynamic price
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
    if (selectedProduct?.price) {
      setDynamicPrice(selectedProduct.price); // Initialize dynamic price
    }
  }, [selectedProduct]);

  // Memoize calculateDynamicPrice
  const calculateDynamicPrice = useCallback(
    (selectedOptions) => {
      if (!selectedProduct) return 0; // Return 0 if no product is selected
  
      let totalPrice = selectedProduct.price; // Start with the base price
  
      // Add additional prices only for selected options
      Object.entries(selectedOptions).forEach(([optionType, selectedOption]) => {
        console.log(`Processing option type: ${optionType}, selected option: ${selectedOption}`);
  
        // Check and add printPrice
        if (selectedProduct.printPrice?.[`${optionType}Prices`]?.[selectedOption]) {
          console.log(`Adding printPrice for ${optionType}:`, selectedProduct.printPrice[`${optionType}Prices`][selectedOption]);
          totalPrice += selectedProduct.printPrice[`${optionType}Prices`][selectedOption];
        }
  
        // Check and add brandingPrice
        if (selectedProduct.brandingPrice?.[`${optionType}Price`]?.[selectedOption]) {
          console.log(`Adding brandingPrice for ${optionType}:`, selectedProduct.brandingPrice[`${optionType}Price`][selectedOption]);
          totalPrice += selectedProduct.brandingPrice[`${optionType}Price`][selectedOption];
        }
  
        // Check and add signsPrice
        if (selectedProduct.signsPrice?.[`${optionType}Prices`]?.[selectedOption]) {
          console.log(`Adding signsPrice for ${optionType}:`, selectedProduct.signsPrice[`${optionType}Prices`][selectedOption]);
          totalPrice += selectedProduct.signsPrice[`${optionType}Prices`][selectedOption];
        }
      });
  
      console.log("Calculated Total Price:", totalPrice); // Debugging
      return totalPrice;
    },
    [selectedProduct]
  );

  // Recalculate dynamic price whenever printOptions or quantity changes
  useEffect(() => {
    if (!selectedProduct) return; // Exit if selectedProduct is null

    const newPrice = calculateDynamicPrice(printOptions);
    console.log("Recalculating price:", newPrice * quantity); // Debugging
    setDynamicPrice(newPrice * quantity);
  }, [printOptions, quantity, calculateDynamicPrice, selectedProduct]);



  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedProduct) return; // Exit if selectedProduct is null

    if (Object.values(printOptions).some((option) => !option)) {
      toast.error("Please select all options before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    // Calculate the total price for the product
    const totalPrice = calculateDynamicPrice(printOptions) * quantity;

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        printOptions,
        guestId,
        userId: user?._id,
        price: totalPrice, // Pass the dynamically calculated price
        printPrice: selectedProduct.printPrice,
        brandingPrice: selectedProduct.brandingPrice,
        signsPrice: selectedProduct.signsPrice,
        dimensions: selectedProduct.dimensions,
          weight: selectedProduct.weight,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  // Handle option selection
  const handleOptionSelect = (optionType, value) => {
    setPrintOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions, [optionType]: value };
      console.log("Updated Options:", updatedOptions); // Debugging
      return updatedOptions;
    });
  };

  // Render option buttons
  const renderOptionButtons = (optionType, options) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(optionType, option)}
            className={`px-4 py-2 rounded border ${
              printOptions[optionType] === option
                ? "bg-white text-black"
                : "text-white border-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  // Render print options
  const renderPrintOptions = (optionType) => {
    const printOptionsArray = Array.isArray(selectedProduct.printOptions[optionType])
      ? selectedProduct.printOptions[optionType]
      : [];

    if (printOptionsArray.length === 0) return null;

    if (optionType === "colors") {
      return (
        <div className="mb-4">
          <p className="text-gray-300 capitalize">{optionType}:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {printOptionsArray.map((color) => (
              <button
                key={color}
                onClick={() => handleOptionSelect(optionType, color)}
                className={`w-8 h-8 rounded-full border ${
                  printOptions[optionType] === color
                    ? "border-4 border-black"
                    : "border-gray-300"
                }`}
                style={{
                  backgroundColor: color.toLocaleLowerCase(),
                  filter: "brightness(0.5)",
                }}
              ></button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-4">
        <p className="text-gray-300 capitalize">{optionType}:</p>
        {renderOptionButtons(optionType, printOptionsArray)}
      </div>
    );
  };


  return (
    <div className="p-4 sm:p-6 -mt-1 bg-black">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-black p-4 sm:p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-white" : "border-gray-600"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
                {selectedProduct.name}
              </h1>
              <p className="text-sm md:text-base -mt-2 mb-2 text-gray-300">
                SKU: {selectedProduct.sku}
              </p>

              <p className="text-lg text-green-500 mb-1 line-through">
                {selectedProduct.originalPrice && `R ${selectedProduct.originalPrice}`}
              </p>
              <p className="text-xl text-green-500 mb-2">
                R {dynamicPrice.toFixed(2)} {/* Display dynamic price */}
              </p>

              <p className="text-gray-300 mb-4">{selectedProduct.description}</p>

              <div className="mb-4">
  <p className="text-gray-300"><strong>Dimensions:</strong> 
    {selectedProduct.dimensions 
      ? `${selectedProduct.dimensions.length} x ${selectedProduct.dimensions.width} x ${selectedProduct.dimensions.height} cm`
      : "N/A"}
  </p>
  <p className="text-gray-300"><strong>Weight:</strong> 
    {selectedProduct.weight ? `${selectedProduct.weight} kg` : "N/A"}
  </p>
</div>


              {/* Dynamically Display Print Options */}
              {selectedProduct.printOptions &&
                Object.keys(selectedProduct.printOptions).map((optionType) =>
                  renderPrintOptions(optionType)
                )}

            

              <h1 className="text-2xl md:text-3xl text-white font-bold text-left mb-4">Job Summary</h1>
              <h2 className="text-sm md:text-base text-white text-left mb-4">See the total pricing and checkout</h2>
                  
              <p className="text-xl text-green-500 mb-2">
                R {dynamicPrice > 0 ? dynamicPrice.toFixed(2) : selectedProduct.price.toFixed(2)}
              </p>

              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-green-500 text-white py-2 px-6 rounded w-full mb-4 ${
                  isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-green-600"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </button>


            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4 text-white">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string,
};

ProductDetails.defaultProps = {
  productId: null,
};

export default ProductDetails;