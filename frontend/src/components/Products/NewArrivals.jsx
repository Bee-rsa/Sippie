import { useState } from "react";
import Image1 from "../../assets/Work From Home Freelance Blog Banner_20250907_204209_0000.png";
import Image2 from "../../assets/Work From Home Freelance Blog Banner_20250907_204055_0000.png";
import Image3 from "../../assets/Work From Home Freelance Blog Banner_20250907_204136_0000.png";
import Image4 from "../../assets/Work From Home Freelance Blog Banner_20250907_203939_0000.png";

const NewArrivals = () => {
  const images = [
    { 
      src: Image1, 
      header: "Strawberry Flavour:",
      description: "A refreshing burst of sweet and juicy strawberries, perfect for an energizing pick-me-up.",
      glow: "hover:shadow-red-400"
    },
    { 
      src: Image2, 
      header: "Orange Flavour:",
      description: "Packed with zesty citrus goodness, this tangy flavor delivers a vibrant boost of energy and freshness.",
      glow: "hover:shadow-orange-400"
    },
    { 
      src: Image3, 
      header: "Grape Flavour:",
      description: "Bold and delicious, this grape blend gives you a smooth, fruity taste with a satisfying kick.",
      glow: "hover:shadow-purple-400"
    },
    { 
      src: Image4, 
      header: "Green Tea Zen:",
      description: "A calming mix of green tea essence and natural energy, perfect for focus, balance, and clarity.",
      glow: "hover:shadow-green-400"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const toggleDescription = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const nextImage = () => setMobileIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setMobileIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-16 px-4 lg:px-0 bg-black">
      {/* Desktop Layout */}
      <div className="hidden md:flex container mx-auto justify-center gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex items-start gap-4 transition-all duration-300 cursor-pointer"
            onClick={() => toggleDescription(index)}
          >
            <div className="w-[200px]">
              <img
                src={img.src}
                alt={`New Arrival ${index + 1}`}
                className={`w-full h-[300px] object-cover rounded-lg transition-all duration-300 hover:-translate-y-8 shadow-none hover:shadow-xl ${img.glow}`}
                draggable="false"
              />
            </div>

            {activeIndex === index && (
              <div className="p-4 bg-black text-white rounded-lg w-[300px]">
                <h3
                  className={`text-3xl font-bold mb-2 pb-1 border-b-4 whitespace-nowrap ${
                    index === 0
                      ? "border-red-400"
                      : index === 1
                      ? "border-orange-400"
                      : index === 2
                      ? "border-purple-400"
                      : "border-green-400"
                  }`}
                  style={{
                    color: "transparent",
                    WebkitTextStrokeWidth: "1px",
                    WebkitTextStrokeColor:
                      index === 0
                        ? "rgb(248 113 113)"
                        : index === 1
                        ? "rgb(251 191 36)"
                        : index === 2
                        ? "rgb(168 85 247)"
                        : "rgb(34 197 94)",
                  }}
                >
                  {img.header}
                </h3>
                <p className="text-sm text-gray-300">{img.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

{/* Mobile Slider */}
<div className="md:hidden container mx-auto relative flex flex-col items-center w-full">
  <div className="w-full flex justify-center">
    {/* Image wrapper with max width = 100% of screen */}
    <div className="w-full max-w-full px-4">
      <img
        src={images[mobileIndex].src}
        alt={`New Arrival ${mobileIndex + 1}`}
        className={`w-full h-auto object-contain rounded-lg transition-all duration-300 shadow-xl ${images[mobileIndex].glow}`}
        draggable="false"
      />
    </div>

    <div className="p-4 bg-black text-white rounded-lg mt-4 text-center w-full px-4">
      <h3
        className="text-2xl font-bold mb-2 border-b-4 inline-block"
        style={{
          color: "transparent",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor:
            mobileIndex === 0
              ? "rgb(248 113 113)"
              : mobileIndex === 1
              ? "rgb(251 191 36)"
              : mobileIndex === 2
              ? "rgb(168 85 247)"
              : "rgb(34 197 94)",
        }}
      >
        {images[mobileIndex].header}
      </h3>
      <p className="text-sm mt-2 text-gray-300">{images[mobileIndex].description}</p>
    </div>
  </div>

  {/* Navigation Buttons */}
  <div className="flex justify-between w-full mt-4 px-4">
    <button
      onClick={prevImage}
      className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
    >
      Prev
    </button>
    <button
      onClick={nextImage}
      className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
    >
      Next
    </button>
  </div>
</div>

    </section>
  );
};

export default NewArrivals;
