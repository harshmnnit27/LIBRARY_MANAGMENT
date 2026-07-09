
import React, { useState, useEffect } from "react";
import logo from "../assets/gm-with-title.png";
import logo_with_title from "../assets/gm-with-title2.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* LEFT SECTION */}
      <div className="hidden md:flex w-1/2 bg-[#001F3F] text-white flex-col items-center justify-center px-8 py-12">
        <img src={logo_with_title} alt="logo" className="mb-12 h-[250px] w-[250px]" />
        <h3 className="text-xl text-center max-w-md leading-8">
          “Access your digital library, track your borrowed books, and manage your goals—all in one place.”
        </h3>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-6 py-12 relative">
        <Link
          to={"/login"}
          className="absolute top-6 left-6 text-[#001F3F] hover:underline text-sm"
        >
          ← Back to Login
        </Link>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="logo" className="h-[250px] w-[250px]" />
          </div>
          <h2 className="text-2xl font-bold text-center text-[#001F3F]">Forgot Password</h2>
          <p className="text-sm text-gray-600 text-center mb-6">Please enter your email to receive a reset link.</p>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-800 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#001F3F] text-white py-3 rounded-md font-semibold hover:bg-[#003366] transition"
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

