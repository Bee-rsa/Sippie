import { useEffect, useRef, useState } from "react";
import heroImg from "../../assets/Work From Home Freelance Blog Banner_20250907_185918_0000(1).png";

const Hero = () => {
  const mobileTextRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver for mobile text sliding
  useEffect(() => {
    const currentRef = mobileTextRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-50px",
        threshold: 0.1,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-blue to-white mb-8 -mt-[1px] overflow-hidden">
      <div className="flex flex-col md:flex-row items-start justify-start h-auto md:h-[600px] lg:h-[750px]">

        {/* Image on the far left */}
        <img
          src={heroImg}
          alt="Hero"
          className="mt-12 h-96 sm:h-[28rem] md:h-96 lg:h-[550px] object-contain"
        />

        {/* Text Content for larger screens (static, styled like mobile) */}
        {/* Text Content on the right for devices bigger than mobile */}
<div className="hidden md:flex flex-col justify-center text-left text-gray-900 -ml-28 flex-1 pr-8">

  {/* Container for text and borders */}
  <div className="inline-block">

    {/* Top border */}
    <div className="border-t-4 border-gray-400 mb-4"></div>

    {/* Main Text */}
    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase mb-4">
      Fuel your focus. 
    </h1>

    {/* Bottom border */}
    <div className="border-b-4 border-gray-400 mb-4"></div>

    {/* Additional words underneath */}
    <p className="text-sm md:text-lg text-gray-700">
      Power your day with Sippie.
    </p>

  </div>
</div>


        {/* Text Content for mobile (below image, slides in/out) */}
        <div
          ref={mobileTextRef}
          className={`md:hidden flex flex-col justify-center text-left text-gray-900 p-6 mt-6 transform transition-transform duration-700 ease-out
            ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-60 opacity-0"}`}
        >
          <div className="inline-block">
            <div className="border-t-4 border-gray-400 mb-4"></div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase mb-4 text-gray-900">
              Unleash your thirst
            </h1>
            <div className="border-b-4 border-gray-400 mb-4"></div>
            <p className="text-sm text-gray-700">
              Discover refreshing energy in every sip. Our drink fuels your adventures and keeps you going all day long. Hydrate, energize, and conquer!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
