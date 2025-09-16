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
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      {/* About / Featured Collection */}

      {/* Map & Stations Section */}
<section className="bg-white py-12 px-6 w-full">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

    {/* Satellite Map Image */}
    <div className="w-full h-[400px]">
      <img
        src="https://maps.googleapis.com/maps/api/staticmap?center=Durban+University+of+Technology,Durban,South+Africa&zoom=15&size=600x400&maptype=satellite&key=YOUR_API_KEY"
        alt="DUT Satellite Map"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>

    {/* Stations List */}
    <div className="flex flex-col justify-center">
      <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
        Stations where you can get Sippie Energy Drink:
      </h2>
      <ul className="list-disc list-inside space-y-3 text-lg font-poppins text-gray-700">
        <li>Steve Biko Campus – Student Centre</li>
        <li>Ritson Campus – Cafeteria</li>
        <li>Mansfield Hall – Entrance Kiosk</li>
        <li>ML Sultan Campus – Food Court</li>
        <li>Indumiso Campus – Main Hall</li>
      </ul>
    </div>
  </div>
</section>


     {/* Merchandise */}
<section className="bg-white -mt-8 p-6 mb-8 w-full">
  <h2 className="text-center text-6xl sm:text-5xl font-bold text-black mb-12">
    Pre-order Merchandise!
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { 
        img: step4Image, 
      },
      { 
        img: step5Image, 
      },
      { 
        img: step6Image, 
      },
      { 
        img: step7Image, 
      },
    ].map((step, idx) => (
      <div key={idx} className="flex flex-col items-start p-6 border rounded-lg bg-gray-50 w-full h-full">
        <img 
          src={step.img} 
          alt={`Product ${idx + 1}`} 
          className="w-full h-auto object-contain mb-4" 
        />
        <h3 
          className="font-bold text-xl font-poppins mb-2"
          style={{
            color: 'transparent',
            WebkitTextStroke: `1.5px ${step.color}`,
          }}
        >
          {step.title}
        </h3>
        <p className="text-left mb-4 font-poppins">{step.desc}</p>
      </div>
    ))}
  </div>
</section>



      {/* Why Choose Us Section */}
      <section className="bg-white p-6 mb-8 w-full">
      <h2 className="text-center text-4xl sm:text-5xl font-bold text-black mb-12">
  Want To Join The Delivery Club?
</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {[
    { 
      img: step1Image, 
      title: 'Register', 
      desc: 'Sign up with Sippie by providing your email and creating a secure password. Start managing your deliveries efficiently and access all the tools our platform offers.' 
    },
    { 
      img: step2Image, 
      title: 'Accept Orders', 
      desc: 'Browse available delivery requests and accept the ones that fit your schedule. Get all the details you need, including pickup locations and package info.' 
    },
    { 
      img: step3Image, 
      title: 'Deliver Sippie', 
      desc: 'Pick up the package, complete the delivery, and update the status in real-time. Enjoy a seamless process from start to finish with Sippie’s platform.' 
    },
  ].map((step, idx) => (
    <div key={idx} className="flex flex-col items-start p-6 border rounded-lg bg-gray-50 w-full h-full">
      <img src={step.img} alt={`Step ${idx + 1}`} className="w-full h-60 object-cover mb-4" />
      <h3 className="font-semibold text-xl text-custom-blue font-poppins">
        Step {idx + 1}: {step.title}
      </h3>
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
