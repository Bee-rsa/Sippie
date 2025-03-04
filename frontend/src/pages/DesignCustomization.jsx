import { useRef, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import images
import DesignImage from '../assets/Design.jpg';
import ShopfrontImage from '../assets/Shop.jpg';
import WallDesignImage from '../assets/Wall.jpg';
import VehicleDesignImage from '../assets/Vehicle.jpg';
import ClothingDesignImage from '../assets/Clothes.jpg';
import ApparelDesignImage from '../assets/Work.jpg';

const DesignCustomization = () => {
  const form = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const designTypes = [
    { title: "Graphic Design", description: "Bring your brand to life with stunning graphic design.", image: DesignImage },
    { title: "Shopfront Design", description: "Transform your store's exterior into a captivating experience.", image: ShopfrontImage },
    { title: "Wall Design", description: "Create dynamic, engaging wall murals or displays.", image: WallDesignImage },
    { title: "Vehicle Design", description: "Turn your vehicle into a moving billboard!", image: VehicleDesignImage },
    { title: "Clothing Design", description: "Custom t-shirts, hoodies, or caps for your brand.", image: ClothingDesignImage },
    { title: "Apparel Design", description: "From concept to creation, custom apparel that reflects your style.", image: ApparelDesignImage },
  ];

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % designTypes.length), [designTypes.length]);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev - 1 + designTypes.length) % designTypes.length), [designTypes.length]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_47j7o4y', 'template_4i20bf9', form.current, { publicKey: '62QEvBoAkwjeNxNXX' })
      .then(() => {
        toast.success("Thank you! We received your request.");
        form.current.reset();
      })
      .catch((error) => {
        console.error('FAILED...', error.text);
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold mt-8 text-blue-500 text-center mb-12">
        Professional Custom Design Services
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/2 text-white py-16 px-4 sm:px-6 lg:px-6 rounded-lg border-2 border-gray-500">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            Explore Our Design Possibilities
          </h2>
          <div className="relative">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold">{designTypes[currentSlide].title}</h3>
              <p className="text-lg">{designTypes[currentSlide].description}</p>
            </div>
            <img 
              src={designTypes[currentSlide].image} 
              alt={designTypes[currentSlide].title} 
              className="w-full h-64 object-cover rounded-lg" 
            />
            <button 
              onClick={prevSlide} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-white bg-black p-2 rounded-full"
            >
              &#8592;
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-white bg-black p-2 rounded-full"
            >
              &#8594;
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-4 sm:px-6 py-8 bg-black text-white rounded-lg border-2 border-gray-500">
          <h2 className="text-3xl font-bold text-green-500 mb-6">
            Request a Custom Design Quote
          </h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label className="block text-lg font-medium">Full Name</label>
              <input type="text" name="user_name" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Email Address</label>
              <input type="email" name="user_email" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Design Type</label>
              <select name="design" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg bg-black text-white">
                {designTypes.map((design, index) => (
                  <option key={index} value={design.title}>{design.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium">Tell Us More On How We Can Help</label>
              <textarea name="message" rows="4" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg"></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesignCustomization;
