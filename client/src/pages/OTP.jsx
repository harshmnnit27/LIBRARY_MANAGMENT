
import React, { useEffect, useState } from "react";
import logo from "../assets/gm-with-title.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Link, useParams, Navigate } from "react-router-dom";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(state => state.auth);

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A1504] via-[#7B240B] to-[#5C1A06] p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-500/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-[#8C2C07]/20">

        {/* Left Section - Form */}
        <div className="w-full md:w-[55%] p-10 sm:p-14 lg:p-16 flex flex-col justify-center bg-[#FDFBF7] relative">
          <Link to={"/register"} className="absolute top-8 left-8 text-stone-500 hover:text-[#D95319] text-sm font-semibold flex items-center gap-1 transition-colors">
            ← Back to Register
          </Link>

          <div className="mb-10 mt-6">
            <h2 className="text-3xl font-bold text-[#4A1504] tracking-tight mb-2">Check your Mailbox</h2>
            <p className="text-stone-500 font-medium">We've sent an OTP to your email. Please enter it below.</p>
          </div>

          <form onSubmit={handleOtpVerification} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5C1A06]">Enter OTP</label>
              <div className="relative">
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="XXXXXX"
                  className="w-full px-4 py-3.5 bg-white border border-stone-200 text-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D95319]/20 focus:border-[#D95319] transition-all placeholder:text-stone-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3.5 px-4 bg-gradient-to-r from-[#D95319] to-[#BF4311] text-white rounded-xl hover:from-[#BF4311] hover:to-[#A63C11] shadow-lg shadow-[#D95319]/30 transition-all font-semibold flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "VERIFY"}
            </button>
          </form>
        </div>

        {/* Right Section - Info Panel */}
        <div className="hidden md:flex w-[45%] bg-[#F4EFE6] relative p-12 items-center justify-center border-l border-stone-200">
          <div className="absolute inset-0 opacity-[0.04] pattern-grid-lg"></div>

          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
            <img src={logo} alt="logo" className="h-[200px] w-[200px] mb-8 drop-shadow-md" />
            
            <h3 className="text-2xl font-bold text-[#4A1504] mb-4 tracking-tight">Almost There!</h3>

            <p className="text-stone-600 leading-relaxed mb-10 font-medium">
              Verify your email to complete your registration and unlock your digital library.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OTP;

