import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // adjust path if needed
import popupReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer, // now state.auth will exist!
    popup: popupReducer,
    user: userReducer,
    book: bookReducer,
    borrow: borrowReducer
  },
});
