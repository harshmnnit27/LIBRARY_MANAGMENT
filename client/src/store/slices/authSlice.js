import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    const res = await axios.post("/api/auth/register", data, {
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
    const res = await axios.post("/api/auth/verify-otp", { email, otp }, {
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
    const res = await axios.post("/api/auth/login", data, {
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
    const res = await axios.post("/api/auth/forgot-password", { email }, {
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
    const res = await axios.post(`/api/auth/reset-password/${token}`, passwords, {
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
    const res = await axios.get("/api/auth/me", {
      withCredentials: true,
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed(error.response?.data?.message || "Failed to fetch user"));
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());

  try {
    const response = await axios.post('/api/update-password', data); // Adjust URL as needed
    dispatch(authSlice.actions.updatePasswordSuccess(response.data));
  } catch (error) {
    dispatch(authSlice.actions.updatePasswordFailure(error.response?.data || error.message));
  }
};

export default authSlice.reducer;
