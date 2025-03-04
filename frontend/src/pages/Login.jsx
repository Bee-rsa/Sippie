import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex -mt-1">
      <div className="w-full bg-black flex flex-col justify-center items-center p-8 ">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800 p-8 rounded-lg"
        >
          <p className="text-sm text-white mt-2 flex justify-left mb-6">
            © {new Date().getFullYear()} Van Der Holtz Promotions ™. All rights reserved.
          </p>
          <h2 className="text-2xl font-bold text-green-500 text-left mb-6">Welcome Back! 👋🏻</h2>
          <p className="text-left text-white mb-6">
            Please enter your username and password to Login.
          </p>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? "loading..." : "Sign In"}
          </button>
          <p className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-green-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
};
export default Login;
