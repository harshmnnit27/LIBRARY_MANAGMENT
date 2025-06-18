import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from"react-router-dom"
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

const App = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser());
    dispatch(fetchAllBooks());
    if(isAuthenticated && user ?.role === "Admin"){
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
    if(isAuthenticated && user ?.role === "User"){
      dispatch(fetchUserBorrowedBooks());
    }
}, [isAuthenticated]);

  return (
  <Router>
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/otp-verififcation/:email" element={<OTP />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/sidebar" element={<SideBar/>}/>
    </Routes>
    <ToastContainer theme="dark"/>

  </Router>)
};

export default App;
