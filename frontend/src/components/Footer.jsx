import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-custom-blue text-white py-4 w-full"> {/* Reduced top padding */}
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-start">
        {/* Logo Section */}
        <div className="mb-4"> {/* Added margin bottom */}
          <Link to="/">
            <img 
              src="/VDH LOGO.png" // Replace with the actual logo image link
              alt="Logo"
              className="h-24" // Adjust the size of the logo
            />
          </Link>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-1 font-poppins sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {/* Products Section */}
          <div>
            <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">Catalogue</h2>
            <ul>
              <li><a href="/category/Design" className="hover:underline">Design</a></li>
              <li><a href="/category/Print" className="hover:underline">Print</a></li>
              <li><a href="/category/Signs" className="hover:underline">Signs</a></li>
              <li><a href="/category/Branding" className="hover:underline">Branding</a></li>
              <li><a href="/category/Paint" className="hover:underline">Paint</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h2 className="font-bold mb-4 inline-block border-b border-white pb-2">Company</h2>
            <ul>
              <li><a href="/about-us" className="hover:underline">About Us</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="contact-page" className="hover:underline">Talk To An Expert</a></li>
              <li><a href="/help-center" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-8">
          <a href="https://www.facebook.com/profile.php?id=100063795589745" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF" 
              alt="Facebook" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://wa.me/27723695678" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://img.icons8.com/?size=100&id=16733&format=png&color=FFFFFF" 
            alt="WhatsApp" 
            className="h-8 w-8 hover:opacity-80" 
          />
        </a>

          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" 
              alt="LinkedIn" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF" 
              alt="Instagram" 
              className="h-8 w-8 hover:opacity-80" 
            />
          </a>
        </div>

        {/* Copyright and Trademark Notice */}
        <p className="text-sm text-white mt-4 font-poppins">
          © {new Date().getFullYear()} Van Der Holtz Promotions ™. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
