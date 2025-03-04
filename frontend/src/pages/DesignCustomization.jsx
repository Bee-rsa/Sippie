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
        { 
          title: "Graphic Design", 
          description: "Bring your brand to life with stunning graphic design. Our team create visuals that convey your message and leave a lasting impact.", 
          image: DesignImage 
        },
        { 
          title: "Shopfront Design", 
          description: "Transform your store's exterior into a captivating experience. Shopfronts that attract attention and enhance your brand's identity.", 
          image: ShopfrontImage 
        },
        { 
          title: "Wall Design", 
          description: "Create dynamic, engaging wall murals or displays. Our wall designs serve as powerful storytelling tools, elevating your brand's presence in any space.", 
          image: WallDesignImage 
        },
        { 
          title: "Vehicle Design", 
          description: "Turn your vehicle into a moving billboard! Our vehicle designs ensure that your brand is always on the move, reaching a wide audience wherever you go.", 
          image: VehicleDesignImage 
        },
        { 
          title: "Clothing Design", 
          description: "Custom t-shirts, hoodies, or caps for your brand. We offer high-quality, unique designs that bring your ideas to life on every piece of apparel.", 
          image: ClothingDesignImage 
        },
        { 
          title: "Apparel Design", 
          description: "From concept to creation, custom apparel that reflects your style. Our apparel designs are tailored to your brand's personality, ensuring a perfect fit for your audience.", 
          image: ApparelDesignImage 
        }
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
    <div className="min-h-screen -mt-1 bg-black py-12 px-3 sm:px-5 lg:px-6">
      <h1 className="text-4xl font-bold mt-6 text-blue-500 text-center mb-10">
        Professional Custom Design Services
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2 text-white py-12 px-3 sm:px-4 lg:px-5 rounded-lg border-2 border-gray-500" style={{ height: 'auto' }}>
          <h2 className="text-2xl font-bold text-green-500 mb-4 text-center">
            Explore Our Design Possibilities
          </h2>
          <div className="relative" style={{ height: '100%' }}>
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold">{designTypes[currentSlide].title}</h3>
              <p className="text-lg">{designTypes[currentSlide].description}</p>
            </div>
            <div className="relative w-full h-full">
              <img 
                src={designTypes[currentSlide].image} 
                alt={designTypes[currentSlide].title} 
                className="w-full"
                style={{ height: '300px', objectFit: 'contain' }} // Fixed height, full image visible
              />
            </div>
            <button 
              onClick={prevSlide} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl text-white bg-black p-2 rounded-full"
            >
              &#8592;
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl text-white bg-black p-2 rounded-full"
            >
              &#8594;
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-3 sm:px-4 py-6 bg-black text-white rounded-lg border-2 border-gray-500" style={{ height: 'auto' }}>
          <h2 className="text-2xl font-bold text-green-500 mb-4">
            Request a Custom Design Quote
          </h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <label className="block text-lg font-medium">Full Name</label>
              <input type="text" name="user_name" required className="mt-2 w-full p-2 border border-gray-300 text-black rounded-lg bg-gray-300" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium">Email Address</label>
              <input type="email" name="user_email" required className="mt-2 w-full p-2 border border-gray-300 text-black rounded-lg bg-gray-300" />
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium">Design Type</label>
              <select name="design" required className="mt-2 w-full p-2 border border-gray-300  rounded-lg bg-black text-white">
                {designTypes.map((design, index) => (
                  <option key={index} value={design.title}>{design.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-lg font-medium">Tell Us More On How We Can Help</label>
              <textarea name="message" rows="3" required className="mt-2 w-full p-2 border border-gray-300 text-black rounded-lg bg-gray-300"></textarea>
            </div>
            <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesignCustomization;
