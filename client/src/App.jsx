import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from"react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import OTP from "./pages/OTP"
import ResetPassword from "./pages/ResetPassword"
import {ToastContainer} from "react-toastify"
import SideBar from "./layout/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from "./store/slices/borrowSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser());
    dispatch(fetchAllBooks());
    if(isAuthenticated && user ?.role === "Admin"){
      // console.log("THE LOGGED IN USER IS AN ADMIN");
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
    if(isAuthenticated && user ?.role === "User"){
      // console.log("THE LOGGED IN USER IS AN ADMIN");
      dispatch(fetchUserBorrowedBooks());
    }
}, [isAuthenticated]);

  return (
  <Router>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/otp-verififcation/:email" element={<OTP />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/sidebar" element={<SideBar/>}/>

      <Route path="/dashboard" element={<Home component="Dashboard" />} />
      <Route path="/books" element={<Home component="Books" />} />
      <Route path="/catalog" element={<Home component="Catalog" />} />
      <Route path="/users" element={<Home component="Users" />} />
      <Route path="/my-borrowed-books" element={<Home component="My Borrowed Books" />} />

    </Routes>
    <ToastContainer theme="dark"/>

  </Router>)
};

export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import OTP from "./pages/OTP";
// import ResetPassword from "./pages/ResetPassword";
// import SideBar from "./layout/SideBar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser } from "./store/slices/authSlice";
// import { fetchAllUsers } from "./store/slices/userSlice";
// import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from "./store/slices/borrowSlice";
// import { fetchAllBooks } from "./store/slices/bookSlice";

// const App = () => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUser());
//     dispatch(fetchAllBooks());

//     if (isAuthenticated && user?.role === "Admin") {
//       dispatch(fetchAllUsers());
//       dispatch(fetchAllBorrowedBooks());
//     }
//     if (isAuthenticated && user?.role === "User") {
//       dispatch(fetchUserBorrowedBooks());
//     }
//   }, [isAuthenticated]);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/password/forgot" element={<ForgotPassword />} />
//         <Route path="/otp-verififcation/:email" element={<OTP />} />
//         <Route path="/password/reset/:token" element={<ResetPassword />} />

//         {/* Protected Routes */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home selectedComponent="Dashboard" />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Home selectedComponent="Dashboard" />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/books"
//           element={
//             <ProtectedRoute>
//               <Home selectedComponent="Books" />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/catalog"
//           element={
//             <ProtectedRoute>
//               <Home selectedComponent="Catalog" />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <Home selectedComponent="Users" />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/my-borrowed-books"
//           element={
//             <ProtectedRoute>
//               <Home selectedComponent="My Borrowed Books" />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//       <ToastContainer theme="dark" />
//     </Router>
//   );
// };

// export default App;

