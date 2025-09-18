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
import step4Image from '../assets/file_0000000086b061f5816473d44975fed9.png';
import step5Image from '../assets/file_00000000a0c061f5b51cab2438e3e15f.png';
import step6Image from '../assets/file_0000000063b461f7a710c7f366ed51af (1).png';
import step7Image from '../assets/file_00000000563061fdbcff775fa185ecce.png';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

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
    <div className="w-full max-w-full overflow-x-hidden">
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
      <div className="container mx-auto mt-16 px-4 max-w-full">
        <ProductGrid products={products} loading={loading} error={error} />
      </div>


      {/* Merchandise Section */}
      <section className="bg-white -mt-8 p-4 sm:p-6 mb-8 w-full max-w-full">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-black mb-8">
          Pre-order Merchandise!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[step4Image, step5Image, step6Image, step7Image].map((img, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 border rounded-lg bg-gray-50 w-full">
              <img 
                src={img} 
                alt={`Product ${idx + 1}`} 
                className="w-full h-auto object-contain mb-4"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Map & Stations Section */}
      <section className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 px-4 overflow-hidden">
  {/* Decorative abstract shapes */}
  <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-100 rounded-full opacity-40 filter blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-blue-200 rounded-full opacity-30 filter blur-3xl animate-pulse"></div>

  <div className="relative max-w-7xl mx-auto flex flex-col md:gap-12">

    {/* Header */}
    <div className="text-center md:text-left mb-10">
      <h2 className="text-4xl sm:text-5xl lg:pl-72 lg:pr-72 font-extrabold text-gray-900 mb-4 leading-tight">
        Stations where you can get <span className="text-blue-600">Sippie Energy Drink</span>
      </h2>
      <p className="text-gray-700 lg:pl-72 lg:pr-72 text-lg sm:text-xl">
        Find Sippie at convenient locations across Durban campuses. Grab your energy boost and keep moving with ease!
      </p>
    </div>

    {/* Station Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[
        "Steve Biko Campus – Student Centre",
        "Ritson Campus – Cafeteria",
        "City Campus – Entrance Kiosk",
        "ML Sultan Campus – Food Court",
      ].map((station, idx) => (
        <div
          key={idx}
          className="flex items-center p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-3 duration-300 group"
        >
          {/* Icon Circle */}
          <div className="flex-shrink-0 mr-5 bg-blue-100 rounded-full p-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 12.414m0 0L9.171 8.171m4.243 4.243l4.243 4.243M3 12h18"
              />
            </svg>
          </div>

          {/* Text */}
          <p className="text-gray-800 font-semibold text-base sm:text-lg">{station}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section className="bg-white p-4 sm:p-6 mb-8 w-full max-w-full">
  <h2 className="text-center text-4xl sm:text-5xl font-bold text-black mb-8">
    Want To Join The Delivery Club?
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[
      { img: step1Image, title: 'Register', desc: 'Sign up with Sippie by providing your email and creating a secure password. Start managing your deliveries efficiently and access all the tools our platform offers.' },
      { img: step2Image, title: 'Accept Orders', desc: 'Browse available delivery requests and accept the ones that fit your schedule. Get all the details you need, including pickup locations and package info.' },
      { img: step3Image, title: 'Deliver Sippie', desc: 'Pick up the package, complete the delivery, and update the status in real-time. Enjoy a seamless process from start to finish with Sippie’s platform.' },
    ].map((step, idx) => (
      <div 
        key={idx} 
        className="flex flex-col items-center p-4 border rounded-lg bg-gray-50 w-full h-full"
      >
        <div className="w-full h-48 sm:h-56 md:h-60 mb-4">
          <img 
            src={step.img} 
            alt={`Step ${idx + 1}`} 
            className="w-full h-full object-cover rounded"
          />
        </div>
        <h3 className="font-semibold text-xl text-custom-blue mb-2 text-center">
          Step {idx + 1}: {step.title}
        </h3>
        <p className="text-center text-gray-700 text-sm">{step.desc}</p>
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
