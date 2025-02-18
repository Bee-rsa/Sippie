import { useState, useCallback } from 'react';

const DesignCustomization = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const designTypes = [
    {
      title: "Graphic Design",
      description:
        "Bring your brand to life with stunning graphic design. We create visually striking logos, brochures, posters, and more to effectively communicate your message.",
      image: "../../public/9.png", // Replace with the actual image path
    },
    {
      title: "Shopfront Design",
      description:
        "Transform your store's exterior into a captivating experience. Our shopfront designs attract customers and enhance your brand visibility.",
      image: "../../public/10.png", // Replace with the actual image path
    },
    {
      title: "Wall Design",
      description:
        "Create dynamic, engaging wall murals or displays that make your space stand out. Perfect for offices, retail spaces, and more.",
      image: "../../public/5.jpg", // Replace with the actual image path
    },
    {
      title: "Vehicle Design",
      description:
        "Turn your vehicle into a moving billboard! Our vehicle designs ensure your brand travels with style and recognition wherever you go.",
      image: "../../public/6.png", // Replace with the actual image path
    },
    {
      title: "Clothing Design",
      description:
        "Whether it's custom t-shirts, hoodies, or caps, we bring your designs to life with unique clothing solutions for your brand or personal style.",
      image: "../../public/8.png", // Replace with the actual image path
    },
    {
      title: "Apparel Design",
      description:
        "From concept to creation, we design custom apparel that reflects your brand or personal style. Perfect for businesses, teams, or fashion-forward individuals.",
      image: "../../public/7.png", // Replace with the actual image path
    },
  ];

  // Memoizing nextSlide and prevSlide functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % designTypes.length);
  }, [designTypes.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + designTypes.length) % designTypes.length);
  }, [designTypes.length]);

  return (
    <div className="min-h-screen bg-black py-16 px-6">
      {/* Full-width H1 */}
      <h1 className="text-5xl font-bold mt-8 text-blue-500 text-center mb-12">
        Professional Custom Design Services for Your Business
      </h1>

      {/* Flex container for image and form */}
      <div className="flex flex-col lg:flex-row justify-between items-start space-x-6 px-6">
        {/* Left Side: Design Possibilities with Border */}
        <div className="w-full lg:w-1/2 text-white py-16 px-6 rounded-lg mt-0 lg:mt-0 border-2 border-gray-500">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center mt-[-40px]">
            Explore Our Design Possibilities
          </h2>

          {/* Slideshow */}
          <div className="relative">
            {/* Slide Content */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold">{designTypes[currentSlide].title}</h3>
              <p className="text-lg">{designTypes[currentSlide].description}</p>
            </div>

            {/* Slide Image */}
            <div className="mb-6">
              <img
                src={designTypes[currentSlide].image}
                alt={designTypes[currentSlide].title}
                className="w-full h-64 object-cover rounded-lg" // Ensure all images are same size
              />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-4">
              <button
                onClick={prevSlide}
                className="text-3xl text-white bg-black p-2 rounded-full shadow-md"
              >
                &#8592;
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-4">
              <button
                onClick={nextSlide}
                className="text-3xl text-white bg-black p-2 rounded-full shadow-md"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Request Quotation Form */}
        <div className="w-full lg:w-1/2 px-6 py-8 bg-black text-white rounded-lg shadow-lg border-2 border-gray-500 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold text-green-500 mb-6">
            Request a Custom Design Quote
          </h2>

          <form action="#" method="POST">
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Design Type */}
            <div className="mb-4">
              <label htmlFor="design-type" className="block text-lg font-medium">
                Design Type
              </label>
              <select
                id="design-type"
                name="design-type"
                required
                className="mt-2 w-full p-3 border border-black-300 rounded-lg bg-black text-white"
              >
                <option value="graphic-design">Graphic Design</option>
                <option value="shopfront-design">Shopfront Design</option>
                <option value="wall-design">Wall Design</option>
                <option value="vehicle-design">Vehicle Design</option>
                <option value="clothing-design">Clothing Design</option>
                <option value="apparel-design">Apparel Design</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesignCustomization;
