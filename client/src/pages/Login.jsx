import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/gm-with-title.png";
import { Mail, Lock, ArrowRight, BookOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
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
  }, [dispatch, message, error]);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A1504] via-[#7B240B] to-[#5C1A06] p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-amber-500/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-[#8C2C07]/20">

        {/* Left Section - Form */}
        <div className="w-full md:w-[55%] p-10 sm:p-14 lg:p-16 flex flex-col justify-center bg-[#FDFBF7]">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#4A1504] tracking-tight mb-2">Welcome Back</h2>
            <p className="text-stone-500 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5C1A06]">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 text-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D95319]/20 focus:border-[#D95319] transition-all placeholder:text-stone-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5C1A06]">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 text-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D95319]/20 focus:border-[#D95319] transition-all placeholder:text-stone-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-[#D95319] focus:ring-[#D95319]" />
                <span className="text-sm text-stone-600">Remember me</span>
              </label>
              <Link to="/password/forgot" className="text-sm font-semibold text-[#D95319] hover:text-[#BF4311] transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-3.5 px-4 bg-gradient-to-r from-[#D95319] to-[#BF4311] text-white rounded-xl hover:from-[#BF4311] hover:to-[#A63C11] shadow-lg shadow-[#D95319]/30 transition-all font-semibold flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-sm mt-10 text-stone-600 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#D95319] font-semibold hover:text-[#BF4311] transition-colors">
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Section - Info Panel */}
        <div className="hidden md:flex w-[45%] bg-[#F4EFE6] relative p-12 items-center justify-center border-l border-stone-200">
          <div className="absolute inset-0 opacity-[0.04] pattern-grid-lg"></div>

          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
            <div className="w-24 h-24 bg-[#FDFBF7] rounded-3xl shadow-sm border border-[#E8DEC3] flex items-center justify-center mb-8">
              <BookOpen className="w-12 h-12 text-[#D95319]" />
            </div>

            <h3 className="text-2xl font-bold text-[#4A1504] mb-4 tracking-tight">Wisdom. Discipline. Knowledge.</h3>

            <p className="text-stone-600 leading-relaxed mb-10 font-medium">
              Access your digital library, track your borrowed books, and manage your goals in the spirit of the Gurukul.
            </p>

            <div className="p-6 bg-white rounded-2xl shadow-sm border border-stone-200 w-full flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-[#D95319] rounded-xl flex items-center justify-center shadow-lg shadow-[#D95319]/20">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-[#4A1504]">Granthamitra</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;



