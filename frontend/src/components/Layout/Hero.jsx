import { useEffect, useRef, useState } from "react";
import heroImg from "../../assets/Work From Home Freelance Blog Banner_20250907_185918_0000(1).png";

const Hero = () => {
  const mobileTextRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <section className="relative bg-gradient-to-b from-blue to-white -mb-24 -mt-[1px] overflow-hidden">
      <div className="flex flex-col md:flex-row items-start justify-start h-auto md:h-[600px] lg:h-[750px]">

        {/* Hero Image */}
        <img
          src={heroImg}
          alt="Hero"
          className="lg:mt-12 sm:-mt-24 h-96 sm:h-[28rem] md:h-96 lg:h-[550px] object-contain"
        />

        {/* Desktop Text */}
        <div className="hidden md:flex flex-col justify-center text-left text-gray-900 mt-24 -ml-28 flex-1 pr-8">
          <div className="inline-block text-center">
            <div className="h-1 w-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 via-white to-pink-500"></div>
            <h1 
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase mb-6 
                         bg-gradient-to-r from-blue-600 via-orange-500 to-white bg-clip-text text-transparent"
            >
              Fuel your focus.
            </h1>
            <div className="h-1 w-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500 via-white to-pink-500"></div>
            <p className="text-base md:text-lg text-gray-600 italic font-light">
              Power your day with <span className="font-semibold text-black">Sippie</span>.
            </p>
          </div>
        </div>

        {/* Mobile Text */}
        <div
          ref={mobileTextRef}
          className={`md:hidden flex flex-col justify-center text-center text-gray-900 p-6 mb-56 -mt-12 transform transition-transform duration-700 ease-out
            ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
        >
          <div className="inline-block">
           <div className="h-1 w-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-white to-pink-500"></div>
           <h1
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight uppercase mb-6
             bg-gradient-to-r from-orange-900 via-orange-500 to-white bg-clip-text text-transparent
             whitespace-nowrap"
              >
                Fuel your focus.
              </h1>

            <div className="h-1 w-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500 via-white to-blue-500"></div>
            <p className="text-base md:text-lg text-gray-600 italic font-light">
              Power your day with <span className="font-semibold text-black">Sippie</span>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
