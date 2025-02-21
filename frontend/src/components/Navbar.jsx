import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useState, useEffect } from "react";
import { useCartStore } from "../stores/useCartStore";
 // Ensure this import is added

const Navbar = () => {
  const { user } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const logout = useUserStore((state) => state.logout);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from your auth store
      clearCart(); // Clear the cart when logging out
      setIsMobileMenuOpen(false); // Close the mobile menu when logging out
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  // State to control the visibility of the navbar
  const [isVisible, setIsVisible] = useState(true);

  // State to store the previous scroll position
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // State to control the mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect hook to track scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        // Hide the navbar when scrolling down
        setIsVisible(false);
      } else {
        // Show the navbar when scrolling up
        setIsVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-black backdrop-blur-md shadow-lg z-40 transition-all duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/VDH LOGO.png" // Replace with your logo image path
              alt="E-Commerce Logo"
              className="h-32" // Adjust the height as needed
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 font-poppins">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart className="inline-block mr-1 group-hover:text-emerald-400" size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-green-700 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-emerald-400 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`fixed top-0 right-0 h-screen w-screen bg-black z-50 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-emerald-400 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-4 font-poppins p-4">
            <Link
              to={"/"}
              className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <hr className="w-full border-gray-700" /> {/* Horizontal line */}
            {user && (
              <>
                <Link
                  to={"/cart"}
                  className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
                  onClick={toggleMobileMenu}
                >
                  <ShoppingCart className="inline-block mr-1 group-hover:text-emerald-400" size={20} />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <hr className="w-full border-gray-700" /> {/* Horizontal line */}
              </>
            )}
            {isAdmin && (
              <>
                <Link
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out items-center"
                  to={"/secret-dashboard"}
                  onClick={toggleMobileMenu}
                >
                  <Lock className="inline-block mr-1" size={18} />
                  <span>Dashboard</span>
                </Link>
                <hr className="w-full border-gray-700" /> {/* Horizontal line */}
              </>
            )}

            {user ? (
              <>
                <button
                  className="bg-gray-700 hover:bg-gray-600 font-bold text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span className="ml-2">Log Out</span>
                </button>
                <hr className="w-full border-gray-700" /> {/* Horizontal line */}
              </>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-green-700 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
                  onClick={toggleMobileMenu}
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
                <hr className="w-full border-gray-700" /> {/* Horizontal line */}
                <Link
                  to={"/login"}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
                  onClick={toggleMobileMenu}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <hr className="w-full border-gray-700" /> {/* Horizontal line */}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;