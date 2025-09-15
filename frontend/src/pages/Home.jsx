import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import step1Image from '../assets/Freight iT_20240926_155145_0001.png';
import step2Image from '../assets/Freight iT_20240926_154924_0001.png';
import step3Image from '../assets/Freight iT_20240926_154659_0001.png';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Gender Collection Section */}
      <GenderCollectionSection />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Best Seller Product */}
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center text-gray-500 mt-8">Loading best seller product...</p>
      )}

      {/* Product Grid */}
      <div className="container mx-auto mt-16 px-4">
        <h2 className="text-3xl text-center font-bold mb-8 text-blue-800">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      {/* About / Featured Collection */}


      {/* Why Choose Us Section */}
      <section className="bg-white p-6 mb-8 w-full">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-black mb-12">
          Want To Join The Delivery Club?
        </h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{[{ img: step1Image, title: 'Register', desc: 'Create an account with Freight iT by providing your email and creating a secure password. This account will allow you to manage your shipments efficiently and access all features of our platform.' },
					{ img: step2Image, title: 'Get Instant Quotes', desc: 'Once registered, input your shipping details, including the dimensions and weight of your cargo. Our system will provide you with instant quotes from various carriers, ensuring you find the best price and service for your needs.' },
					{ img: step3Image, title: 'Book & Track', desc: 'After selecting your preferred carrier based on the quotes, proceed to book your shipment. Make the payment securely and then track your shipment in real-time through our platform until it arrives at its destination.' },
				].map((step, idx) => (
					<div key={idx} className="flex flex-col items-start p-6 border rounded-lg bg-gray-50 w-full h-full">
					<img src={step.img} alt={`Step ${idx + 1}`} className="w-full h-60 object-cover mb-4" />
					<h3 className="font-semibold text-xl text-custom-blue font-poppins">Step {idx + 1}: {step.title}</h3>
					<p className="text-left mb-4 font-poppins">{step.desc}</p>
					</div>
				))}
				</div>

      </section>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default Home;
