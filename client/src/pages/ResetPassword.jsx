// import React, { useEffect } from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import logo from "../assets/black-logo.png";
// import logo_with_title from "../assets/logo-with-title.png";
// import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";
// import { toast } from "react-toastify";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")

//   const {token} =useParams();

//   const dispatch = useDispatch();

//   const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

//   const handleResetPassword = (e)=>{ e.preventDefault();
//     const formData = new FormData();
//     formData.append("password", password);
//     formData.append("confirmPassword", confirmPassword);
//     dispatch(resetPassword(formData, token));
//   };

//   useEffect(()=>{
//       if(message){
//         toast.success(message);
//         dispatch(resetAuthSlice());
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
  
//   <div className ="flex flex-col justify-center md:flex-row h-screen">
//     {/* LEFT SECTION */}
//     <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
//       <div className="text-center h-[450px]">
//         <div className="flex justify-center mb-12">
//           <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />
//         </div>
//         <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">"Your premier digital library for borrowing and reading books"</h3>
//       </div>
//     </div>
//     {/* RIGHT SECTION */}
//     <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
//           <Link to={"/password/forgot"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end">
//             Back
//           </Link>
//           <div className="w-full max-w-sm">
//             <div className="flex justify-center mb-12">
//               <div className="rounded-full flex items-center justify-center">
//                 <img src={logo} alt="logo" className="h-24 w-auto"/>
//               </div>
//             </div>
//             <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">Forgot Password</h1>
//             <p className="text-gray-800 text-center mb-12">Please enter your new password.</p>
//             <form onSubmit={handleResetPassword}>
//               <div className="mb-4">
//                 <input type="password" required value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//               </div>
//               <div className="mb-4">
//                 <input type="password" required value={confirmpassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//               </div>
//               <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition" disabled={loading ? true : false}>RESET PASSWORD</button>
//             </form>
//           </div>
//         </div>
//   </div>  
//   </>;
// };

// export default ResetPassword;

import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/gm-with-title.png";
import logo_with_title from "../assets/gm-with-title2.png";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  const handleResetPassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    dispatch(resetPassword(formData, token));
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
  }, [dispatch, error, message]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen">
      {/* LEFT SECTION */}
      <div className="hidden md:flex w-1/2 bg-[#001F3F] text-white flex-col justify-center items-center px-8 py-12">
        <img src={logo_with_title} alt="logo" className="mb-12 h-[250px] w-[250px]" />
        <h3 className="text-xl text-center max-w-md leading-8">
          “Your premier digital library for borrowing and reading books.”
        </h3>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-6 py-12 relative">
        <Link
          to="/password/forgot"
          className="absolute top-6 left-6 text-[#001F3F] hover:underline text-sm"
        >
          ← Back to Forgot
        </Link>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="logo" className="h-[250px] w-[250px]" />
          </div>
          <h2 className="text-2xl font-bold text-center text-[#001F3F]">Reset Password</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Please enter and confirm your new password.
          </p>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-800 font-medium">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-800 font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
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

export default ResetPassword;

