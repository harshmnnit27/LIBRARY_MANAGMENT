// import React, { useEffect, useState } from "react";
// import logo from "../assets/black-logo.png";
// import logo_with_title from "../assets/logo-with-title.png";
// import { useDispatch, useSelector } from "react-redux";
// import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
// import { toast } from "react-toastify";
// import { Link, useParams, Navigate } from "react-router-dom";

// const OTP = () => {
//   const { email } = useParams();
//   const [otp, setOtp] =useState("");
//   const dispatch = useDispatch();

//   const {loading, error, message, user, isAuthenticated} =useSelector(state => state.auth);

//   const handleOtpVerification = (e)=>{
//     e.preventDefault();
//     dispatch(otpVerification(email, otp));
//   }

//   useEffect(()=>{
//       if(message){
//         toast.success(message);
//       }
//       if(error){
//         toast.error(error);
//         dispatch(resetAuthSlice());
//       }
//     }, [dispatch, isAuthenticated, error, loading]);
  
//     if(isAuthenticated){
//       return <Navigate to={"/"} />;
//     }

//   return <>
//   <div className="flex flex-col justify-center md:flex-row h-screen">
//     {/* LEFT SIDE */}
//     <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
//       <Link to={"/register"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end">
//         Back
//       </Link>
//       <div className="max-w-sm w-full">
//         <div className="flex justify-center mb-12">
//           <div className="rounded-full flex items-center justify-center">
//             <img src={logo} alt="logo" className="h-24 w-auto" />
//           </div>
//         </div>
//         <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">Check your Mailbox</h1>
//         <p className="text-gray-800 text-center mb-12">Please enter the otp to proceed</p>
//         <form onSubmit = {handleOtpVerification}>
//           <div className="mb-4">
//             <input type="number" value={otp} onChange={(e)=> setOtp(e.target.value)} placeholder="OTP" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//           </div>
//           <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">VERIFY</button>
//         </form>
//       </div>
//     </div>
//     {/* RIGHT SIDE */}
//     <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-t1-[80px] rounded-b1-[80px]">
//       <div className="text-center h-[400px]">
//         <div className="flex justify-center mb-12">
//           <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />
//         </div>
//         <p className="text-gray-300 mb-12">New to our platform? Sign up now.</p>
//         <Link to={"/register"} className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">
//           SIGN UP
//         </Link>
//       </div>
//     </div>
//   </div>
//   </>;
// };

// export default OTP;

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
    <div className="flex min-h-screen">
      {/* LEFT Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#001F3F] px-6 py-12 relative">
        <Link to={"/register"} className="absolute top-6 left-6 text-white hover:underline text-sm">
          ← Back to Register
        </Link>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="logo" className="h-[250px] w-[250px]" />
          </div>
          <h2 className="text-2xl font-bold text-center text-[#001F3F]">Check your Mailbox</h2>
          <p className="text-sm text-gray-600 text-center mb-6">We've sent an OTP to your email. Please enter it below.</p>
          <form onSubmit={handleOtpVerification}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-800 font-medium">Enter OTP</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="XXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#001F3F] text-white py-3 rounded-md font-semibold hover:bg-[#003366] transition"
            >
              VERIFY
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT Panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 text-center p-8">
        <img src={logo} alt="logo" className="mb-12 h-[250px] w-[250px]" />
        <h2 className="text-2xl font-bold text-[#001F3F]">New here?</h2>
        <p className="text-gray-600 mt-2 mb-6">Sign up and start managing your library today.</p>
        <Link
          to={"/register"}
          className="px-6 py-2 border-2 border-[#001F3F] rounded-md text-[#001F3F] font-semibold hover:bg-[#001F3F] hover:text-white transition"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default OTP;

