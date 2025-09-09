import React from "react";
import { Link } from "react-router-dom";
import register from "../assets/register.webp";
import { registerUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { mergeCart } from "../../redux/slices/CartSlice";
import { useEffect } from "react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("customer"); // Default role

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user }));
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password, role })).unwrap();
      toast.success("Registration successful!");
      // Redirect happens in useEffect
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Failed to register")
    }
  };

  return (
    <div className="flex bg-white m-5 md:m-20 rounded-2xl shadow-lg overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-2 md:p-12">
        <form onSubmit={handleSubmit} className="w-full bg-white p-2 md:p-8">
          <div className="flex justify-center mb-6">
            {/* <h2 className="text-xl font-medium">Fabrica</h2> */}
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
          <p className="text-center mb-6">Enter your details to Register</p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block w-1/2">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Register"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
