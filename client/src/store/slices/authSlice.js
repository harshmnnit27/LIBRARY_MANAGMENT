import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:4000";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    otpVerificationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    otpVerificationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.message = "Logged out successfully";
    },

    resetAuthSlice(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  otpVerificationRequest,
  otpVerificationSuccess,
  otpVerificationFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  logout,
  resetAuthSlice,
} = authSlice.actions;

// Async Thunks
export const register = (data) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const res = await axios.post(`${API_BASE}/api/v1/auth/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailed(error.response?.data?.message || "Registration failed"));
  }
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(otpVerificationRequest());
  try {
    const res = await axios.post(`${API_BASE}/api/v1/auth/verify-otp`, { email, otp }, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(otpVerificationSuccess(res.data));
  } catch (error) {
    dispatch(otpVerificationFailed(error.response?.data?.message || "OTP verification failed"));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios.post(`${API_BASE}/api/v1/auth/login`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailed(error.response?.data?.message || "Login failed"));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const res = await axios.post(`${API_BASE}/api/v1/auth/password/forgot`, { email }, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(forgotPasswordSuccess(res.data));
  } catch (error) {
    dispatch(forgotPasswordFailed(error.response?.data?.message || "Request failed"));
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const res = await axios.post(`${API_BASE}/api/v1/auth/reset-password/${token}`, passwords, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(resetPasswordSuccess(res.data));
  } catch (error) {
    dispatch(resetPasswordFailed(error.response?.data?.message || "Reset failed"));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const res = await axios.get(`${API_BASE}/api/v1/auth/me`, {
      withCredentials: true,
    });
    if (!res.data || !res.data.user) {
      dispatch(getUserFailed("No user returned from backend"));
      dispatch(logout());
      return;
    }
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // If unauthorized, force logout and do not treat as crash
      dispatch(getUserFailed("Unauthorized. Please log in."));
      dispatch(logout());
    } else {
      dispatch(getUserFailed(error.response?.data?.message || "Failed to fetch user"));
      dispatch(logout());
    }
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.post(`${API_BASE}/api/v1/auth/update-password`, data); // Adjust URL as needed
    dispatch(authSlice.actions.updatePasswordSuccess(response.data));
  } catch (error) {
    dispatch(authSlice.actions.updatePasswordFailure(error.response?.data || error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${API_BASE}/api/v1/auth/logout`, { withCredentials: true });
  } catch {
    // ignore error
  }
  dispatch(logout());
};

export default authSlice.reducer;
