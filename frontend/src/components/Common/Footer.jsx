import { IoLogoInstagram } from "react-icons/io";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";

// Make sure to include this in your index.html <head> or import via CSS
// <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet">

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-blue mt-6 py-16">
      <div className="container mx-auto px-4 lg:px-0 flex flex-col items-center">

        {/* Graffiti-style Follow Us Header with fading side rectangles */}
        <div className="flex items-center mb-12 w-full justify-center gap-4">
          <div
            className="flex-1 h-4 max-w-[200px]"
            style={{
              background: "linear-gradient(to left, black, transparent)"
            }}
          ></div>

          <h3
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-black text-center"
            style={{
              fontFamily: "'Permanent Marker', cursive",
              textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
            }}
          >
            Follow Our Socials
          </h3>

          <div
            className="flex-1 h-4 max-w-[200px]"
            style={{
              background: "linear-gradient(to right, black, transparent)"
            }}
          ></div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-12 mb-8">
          <a href="#" className="text-black hover:text-gray-100 transition-colors">
            <SiTiktok className="h-12 w-12" />
          </a>
          <a href="#" className="text-black hover:text-gray-100 transition-colors">
            <IoLogoInstagram className="h-12 w-12" />
          </a>
          <a href="#" className="text-black hover:text-gray-100 transition-colors">
            <TbBrandMeta className="h-12 w-12" />
          </a>
          <a href="tel:+27879586190" className="text-black hover:text-gray-100 transition-colors">
            <FiPhoneCall className="h-12 w-12" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 w-full text-center text-gray-200">
          <p className="text-sm tracking-tighter">
            © 2025 Sippie Pty (Ltd) ™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
