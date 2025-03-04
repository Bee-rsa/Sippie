import { Link } from "react-router-dom";
import LogoImg from "../../assets/VDH LOGO.png";

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div>
          <div className="mb-4">
            <Link to="/">
              <img  src={LogoImg} alt="Logo" className="h-24" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-poppins">
            <div>
              <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">
                Catalogue
              </h2>
              <ul>
                <li>
                  <a href="/category/Design" className="hover:text-green-500">
                    Design
                  </a>
                </li>
                <li>
                  <a href="/collections/all?category=Print" className="hover:text-green-500">
                    Print
                  </a>
                </li>
                <li>
                  <a href="/collections/all?category=Signs" className="hover:text-green-500">
                    Signs
                  </a>
                </li>
                <li>
                  <a href="/collections/all?category=Branding" className="hover:text-green-500">
                    Branding
                  </a>
                </li>
                <li>
                  <a href="/collections/all?category=Paints" className="hover:text-green-500">
                    Paint
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">
                Company
              </h2>
              <ul>
                <li>
                  <a href="/about-us" className="hover:text-green-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:text-green-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" className="hover:text-green-500">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
              <a href="/contact-page" className="hover:text-green-500">
                Talk To An Expert
              </a>
            </li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <a
              href="https://www.facebook.com/profile.php?id=100063795589745"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF"
                alt="Facebook"
                className="h-8 w-8 hover:opacity-80"
              />
            </a>
            <a
              href="https://wa.me/27723695678"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=16733&format=png&color=FFFFFF"
                alt="WhatsApp"
                className="h-8 w-8 hover:opacity-80"
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png"
                alt="LinkedIn"
                className="h-8 w-8 hover:opacity-80"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF"
                alt="Instagram"
                className="h-8 w-8 hover:opacity-80"
              />
            </a>
          </div>
          <p className="text-sm text-white mt-4 font-poppins">
            © {new Date().getFullYear()} Van Der Holtz Promotions ™. All rights reserved.
          </p>
        </div>
        {/* Right Side - Newsletter */}
        <div className="mt-28">
          <h3 className="text-lg text-green-500 mb-4">Newsletter</h3>
          <p className="font-medium text-m text-gray-300 mb-6">
          Join our community for insider access to new collections and special events.
        </p>
          {/* Newsletter Form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm text-black border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 text-sm rounded-r-md hover:bg-green-700 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
