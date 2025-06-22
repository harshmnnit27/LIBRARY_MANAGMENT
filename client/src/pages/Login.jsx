// import React, { useEffect, useState } from "react";
// import { Navigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import logo from "../assets/black-logo.png";
// import logo_with_title from "../assets/logo-with-title.png";
// import { useDispatch, useSelector } from "react-redux";
// import { login, resetAuthSlice } from "../store/slices/authSlice";



// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch =useDispatch();

//   const { loading, error, message, user, isAuthenticated} =useSelector( (state) => state.auth);

//   const handleLogin = (e)=>{ e.preventDefault();
//     const data = new FormData();
//     data.append("email", email);
//     data.append("password", password);
//     dispatch(login(data));
//   }

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
//     <div className="flex flex-col justify-center md:flex-row h-screen">
//     {/* LEFT SIDE */}
//     <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">  
//       <div className="max-w-sm w-full">
//         <div className="flex justify-center mb-12">
//           <div className="rounded-full flex items-center justify-center">
//             <img src={logo} alt="logo" className="h-24 w-auto" />
//           </div>
//         </div>
//         <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">Welcome Back !!</h1>
//         <p className="text-gray-800 text-center mb-12">Please enter your Credentials to log in.</p>
//         <form onSubmit = {handleLogin}>
//           <div className="mb-4">
//             <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//           </div>
//           <div className="mb-4">
//             <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none" />
//           </div>
//           <Link to={"/password/forgot"} className="font-semibold text-black mb-12">Forgot Password ?</Link>
//           <div className="block md:hidden font-semibold mt-5">
//             <p>New to our platform ?<Link to={"/register"} className="text-sm text-gray-500 hover:underrline"></Link></p>
//           </div>
//           <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">SIGN IN</button>
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

// export default Login;

// import React, { useEffect, useState } from "react";
// import { Navigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import logo from "../assets/black-logo.png";
// import logo_with_title from "../assets/logo-with-title.png";
// import { useDispatch, useSelector } from "react-redux";
// import { login, resetAuthSlice } from "../store/slices/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("email", email);
//     data.append("password", password);
//     dispatch(login(data));
//   };

//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//       dispatch(resetAuthSlice());
//     }
//     if (error) {
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//   }, [dispatch, isAuthenticated, error, loading]);

//   if (isAuthenticated) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <div className="flex flex-col justify-center md:flex-row h-screen">
//       {/* LEFT SIDE */}
//       <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
//         <div className="max-w-sm w-full text-[#001F3F]">
//           <div className="flex justify-center mb-12">
//             <div className="rounded-full flex items-center justify-center">
//               <img src={logo} alt="logo" className="h-24 w-auto" />
//             </div>
//           </div>
//           <h1 className="text-4xl font-medium text-center mb-12">Welcome Back !!</h1>
//           <p className="text-center mb-12">Please enter your credentials to log in.</p>
//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Email"
//                 className="w-full px-4 py-3 border-2 border-[#001F3F] rounded-md focus:outline-none"
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full px-4 py-3 border-2 border-[#001F3F] rounded-md focus:outline-none"
//               />
//             </div>
//             <Link to={"/password/forgot"} className="block text-sm font-semibold text-[#003366] hover:underline mb-6">
//               Forgot Password?
//             </Link>
//             <div className="block md:hidden font-semibold mt-5 text-sm">
//               <p>
//                 New to our platform?{" "}
//                 <Link to={"/register"} className="text-[#003366] hover:underline">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//             <button
//               type="submit"
//               className="border-2 mt-5 border-[#001F3F] w-full font-semibold bg-[#001F3F] text-white py-2 rounded-lg hover:bg-[#003366] transition"
//             >
//               SIGN IN
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="hidden w-full md:w-1/2 bg-[#001F3F] text-white md:flex flex-col items-center justify-center p-8">
//         <div className="text-center h-[400px]">
//           <div className="flex justify-center mb-12">
//             <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />
//           </div>
//           <p className="text-gray-300 mb-12">New to our platform? Sign up now.</p>
//           <Link
//             to={"/register"}
//             className="border-2 mt-5 border-white px-8 w-full font-semibold bg-[#001F3F] text-white py-2 rounded-lg hover:bg-white hover:text-[#001F3F] transition"
//           >
//             SIGN UP
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/gm-with-title.png";
import logo_with_title from "../assets/logo-with-title.png";
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
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 bg-[#001F3F] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="logo" className="h-[250px] w-[250px]" />
            <h2 className="text-2xl font-bold text-[#001F3F]">Welcome Back</h2>
            <p className="text-sm text-gray-500">Login to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                required
              />
            </div>

            <div className="text-right">
              <Link to="/password/forgot" className="text-sm text-[#003366] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#001F3F] text-white rounded-lg hover:bg-[#003366] transition font-semibold shadow-md"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-sm mt-4 text-gray-700">
              New here?{" "}
              <Link to="/register" className="text-[#003366] font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Info Panel */}
      <div className="hidden md:flex w-1/2 bg-[#f4f6f8] items-center justify-center px-8">
        <div className="text-center max-w-sm">
          <img src={logo} alt="Granthamitra" className="mx-auto mb-6 opacity-80 h-[250px] w-[250px]" />
          <h3 className="text-xl font-semibold text-[#001F3F] mb-2">Manage. Borrow. Learn.</h3>
          <p className="text-gray-600">
            Access your digital library, track your borrowed books, and manage your goals—all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



