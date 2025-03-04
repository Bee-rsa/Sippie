import { Link } from "react-router-dom";
import FAQSection from "../components/Layout/FAQSection";
import StepsToOrder from "../components/Layout/StepsToOrder"; // Import StepsToOrder
import Design from "../assets/VDH DESIGN.png";
import Print from "../assets/VDH PRINT.png";
import Signs from "../assets/VDH SIGNS.png"; // Add image for Signs
import Branding from "../assets/VDH BRANDING.png"; // Add image for Branding
import Paints from "../assets/VDH PAINT.png"; // Add image for Paints

const categories = [
  { href: "/collections/all?category=Print", imageUrl: Print },
  { href: "/collections/all?category=Signs", imageUrl: Signs },
  { href: "/collections/all?category=Branding", imageUrl: Branding },
  { href: "/collections/all?category=Paints", imageUrl: Paints },
];

const HomePage = () => {
  return (
    <div className="relative -mt-1 bg-black min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-green-500 mb-4">
          Browse Our Catalogue
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover high-quality, custom printing services for all your business and personal needs
        </p>

        {/* Design Category Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Center the Design Image on small screens */}
          <div className="flex justify-center sm:col-span-2 lg:col-span-1 relative">
            <Link to="/design-customization">
              <img
                src={Design}
                alt="Design"
                className="h-56"
              />
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div> {/* Tint overlay */}
            </Link>
          </div>

          {/* Grid layout for other categories */}
          {categories.map((category) => (
            <div className="flex justify-center sm:col-span-2 lg:col-span-1 relative" key={category.href}>
              <Link to={category.href}>
                <img
                  src={category.imageUrl}
                  alt={category.href}
                  className="h-56"
                />
                <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div> {/* Tint overlay */}
              </Link>
            </div>
          ))}
        </div>

        {/* What We Offer Section */}
        <div className="mt-24">
          <h2 className="text-center text-4xl sm:text-4xl font-bold text-green-500 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Unit 1 */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-black mb-4">Hundreds of Products</h3>
              <p className="text-gray-900 mb-4">
                From Coasters and Die-cut Cards to Labels and Signs. We provide fast online printing for homes and businesses to suit your needs. For Bulk orders please contact our seasoned sales team.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-black rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              >
                Shop Now!
              </a>
            </div>

            {/* Unit 2 */}
            <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-300 p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-black mb-4">Secure Payment</h3>
              <p className="text-gray-900 mb-4">
                Experience the ease and security of online shopping! You can pay online using our secure payment gateway. We ensure your payment information is safely encrypted for peace of mind.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-black rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              >
                Shop Now!
              </a>
            </div>

            {/* Unit 3 */}
            <div className="flex-1 bg-gradient-to-r from-blue-300 to-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-black mb-4">National Delivery</h3>
              <p className="text-gray-900 mb-4">
                Nationwide delivery to get your order to you quickly and efficiently. Our trusted delivery partners guarantee fast shipping, ensuring your products arrive in perfect condition, no matter where you are located.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-black rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
              >
                Shop Now!
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ and Steps to Order Section Side by Side */}
      <div className="bg-black text-white mb py-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-12">
          <div className="lg:w-1/2">
            <FAQSection />
          </div>
          <div className="lg:w-1/2">
            <StepsToOrder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
