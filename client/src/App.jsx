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
  const { user, isAuthenticated, fetchingUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser());
  }, [dispatch]);

  useEffect(()=>{
    if(isAuthenticated){
      dispatch(fetchAllBooks());
      if(user?.role === "Admin"){
        dispatch(fetchAllUsers());
        dispatch(fetchAllBorrowedBooks());
      } else if (user?.role === "User"){
        dispatch(fetchUserBorrowedBooks());
      }
    }
  }, [isAuthenticated, user?.role, dispatch]);

  // While we are verifying the token, show a loading screen.
  // This prevents the app from incorrectly redirecting to /login
  // for 0.1s before the auth check completes.
  if (fetchingUser) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#1a1a2e",
        color: "#a78bfa",
        fontSize: "1.2rem",
        fontFamily: "sans-serif",
        gap: "12px"
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
          </path>
        </svg>
        Authenticating...
      </div>
    );
  }

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
