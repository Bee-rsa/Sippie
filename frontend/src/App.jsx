import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AboutUs from "./pages/AboutUs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails"; // Create this component for individual product details
import DesignCustomization from "./pages/DesignCustomization";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import ProceedToCheckOut from "./pages/ProceedToCheckout"; // Import the ProceedToCheckOut page
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.js";
import { useCartStore } from "./stores/useCartStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-black text-white relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full' />
        </div>
      </div>

      <div className='relative z-50 pt-20'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/design-customization' element={<DesignCustomization />} />
          <Route path='/contact-page' element={<ContactPage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route
            path='/secret-dashboard'
            element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
          />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
          {/* Add the new route for ProceedToCheckOut */}
          <Route path='/proceed-to-checkout' element={user ? <ProceedToCheckOut /> : <Navigate to='/login' />} />
        </Routes>
        {/* Footer placed outside the Routes to ensure it's always displayed */}
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
