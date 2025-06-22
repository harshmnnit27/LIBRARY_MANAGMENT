// import React, { useState, useEffect } from 'react';
// import logo from "../assets/black-logo.png";
// import { Link, Navigate } from 'react-router-dom';
// import logo_with_title from "../assets/logo-with-title.png";
// import {useDispatch, useSelector} from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { resetAuthSlice, register } from "../store/slices/authSlice";
// import { toast } from "react-toastify";


// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const {loading, error, message, isAuthenticated} =useSelector(state => state.auth);
//   const navigateTo = useNavigate();

//   const handleRegister = (e)=>{
//     e.preventDefault();
//     const data = new FormData();
//     data.append("name", name);
//     data.append("email", email);
//     data.append("password", password);
//     dispatch(register(data));
//   };

//   useEffect(()=>{
//     if(message){
//       navigateTo(`/otp-verififcation/${email}`)
//     }
//     if(error){
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//   }, [dispatch, error, loading, message, navigateTo, email]);

//   if(isAuthenticated){
//     return <Navigate to={"/"} />;
//   }
//   return <>
  
//   <div className="flex flex-col justify-center md:flex-row h-screen">
//     {/* LEFT */}
//     <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
//       <div className="text-center h-[376px]">
//         <div className="flex justify-center mb-12">
//           <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />
//         </div>
//         <p className="text-gray-300 scroll-mb-12">Already have Account? Sign in now.</p>
//         <Link to={"/login"} className="mt-4 inline-block border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition">SIGN IN</Link>
//       </div>
//     </div>
//     {/* RIGHT */}
//     <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
//       <div className="w-full max-w-sm">
//         <div className="flex justify-center mb-12">
//           <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
//             <h3 className="font-medium text-4xl overflow-hidden">Sign Up</h3>
//             <img src={logo} alt="logo" className="h-auto w-24 object-cover"  />
//           </div>
//         </div>
//         <p className="text-gray-800 text-center mb-12">Please provide your information to sign up.</p>
//         <form onSubmit={handleRegister}>

//           <div className="mb-2">
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//           </div>

//           <div className="mb-2">
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//           </div>

//           <div className="mb-2">
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//           </div>
//           <div className="block md:hidden font-semibold mt-5">
//             <p>Already havev Account?</p>
//             <Link to="/login" className="text-sm text-gray-500 hover:underline">Sign In</Link>
//           </div>
//           <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition  ">SIGN UP</button>
//         </form>
//       </div>

//     </div>
//   </div>
//   </>;
// };

// export default Register;


import React, { useState, useEffect } from 'react';
import logo from "../assets/gm-with-title.png";
import { Link, Navigate } from 'react-router-dom';
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthSlice, register } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(state => state.auth);
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

  useEffect(() => {
    if (message) {
      navigateTo(`/otp-verififcation/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, loading, message, navigateTo, email]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 text-center p-8">
        <img src={logo} alt="logo" className="mb-12 h-[250px] w-[250px]" />
        <h2 className="text-2xl font-bold text-[#001F3F]">Already have an account?</h2>
        <p className="text-gray-600 mt-2 mb-6">Log in to continue exploring the library.</p>
        <Link to="/login" className="px-6 py-2 border-2 border-[#001F3F] rounded-md text-[#001F3F] font-semibold hover:bg-[#001F3F] hover:text-white transition">
          Sign In
        </Link>
      </div>

      {/* RIGHT PANEL (Form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-[#001F3F] px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="logo" className="h-[250px] w-[250px]" />
          </div>
          <h2 className="text-2xl font-bold text-center text-[#001F3F]">Create Your Account</h2>
          <p className="text-sm text-gray-600 text-center mb-6">Sign up to borrow books and set goals.</p>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-800 font-medium">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Pandala Govind"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]" required />
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-gray-800 font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]" required />
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-gray-800 font-medium">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003366]" required />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#001F3F] text-white py-3 rounded-md font-semibold hover:bg-[#003366] transition">
              Sign Up
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already registered? <Link to="/login" className="text-[#003366] font-medium hover:underline">Sign in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
