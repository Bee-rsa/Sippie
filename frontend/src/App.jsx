<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import ProductForm from "./components/Admin/ProductForm";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import DesignCustomization from "./pages/DesignCustomization";
import ContactPage from "./pages/ContactPage";


import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/design-customization" element={<DesignCustomization />} />
            <Route path="/contact-page" element={<ContactPage />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="product" element={<ProductForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
=======
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore.js";
import { useCartStore } from "./stores/useCartStore";
import LoadingSpinner from "./components/LoadingSpinner";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AboutUs from "./pages/AboutUs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import DesignCustomization from "./pages/DesignCustomization";
import CartPage from "./pages/CartPage";
import SuccessPayment from "./pages/Success";
import Checkout from "./pages/ProceedToCheckout";
import FailedPage from "./pages/FailedPage";

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full" />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/design-customization" element={<DesignCustomization />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
          <Route path="/proceed-to-checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/success" element={<SuccessPayment />} />
          <Route path="/failed" element={user ? <FailedPage /> : <Navigate to="/login" />} />

        </Routes>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}

>>>>>>> 1342fe2573a7b00321d7aaca583e3aa30f571559
export default App;
