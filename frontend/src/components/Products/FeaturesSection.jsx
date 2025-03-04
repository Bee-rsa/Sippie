const FeaturesSection = () => {
  return (
    <div className="bg-black mt-24 min-h-screen">
      <h2 className="text-center text-4xl sm:text-4xl font-bold text-green-500 mb-8">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Unit 1 */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-8 rounded-lg shadow-lg text-center h-full">
          <h3 className="text-xl font-bold text-black mb-4">Hundreds of Products</h3>
          <p className="text-gray-900 mb-4">
            From Coasters and Die-cut Cards to Labels and Signs. We provide fast online printing for homes and businesses to suit your needs. For bulk orders, please contact our seasoned sales team.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white bg-black rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
          >
            Shop Now!
          </a>
        </div>

        {/* Unit 2 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-300 p-8 rounded-lg shadow-lg text-center h-full">
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
        <div className="bg-gradient-to-r from-blue-300 to-white p-8 rounded-lg shadow-lg text-center h-full">
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
  );
};

export default FeaturesSection;
