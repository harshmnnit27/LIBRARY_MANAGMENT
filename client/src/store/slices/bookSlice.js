import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { toggleAddBookPopup } from "./popUpSlice";
import { toast } from "react-toastify";

const API_BASE = "http://localhost:4000";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
        fetchBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        addBookRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        addBookFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },
        resetBookSlice(state){
            state.loading = false;
            state.error = null;
            state.message = null;
        },
    },
});

export const fetchAllBooks = () => async (dispatch) => {
    dispatch(bookSlice.actions.fetchBooksRequest());
    try {
        const res = await axios.get(`${API_BASE}/api/v1/book/all`, { withCredentials: true });
        dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    } catch (error) {
        dispatch(bookSlice.actions.fetchBooksFailed(error.response?.data?.message || "Failed to fetch books"));
    }
}

export const addBook = ()=>async(dispatch)=>{
    dispatch(bookSlice.actions.addBookRequest());
    await axios.post("", data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res=>{
        bookSlice.actions.addBookSuccess(res.data.message);
        toast.success(res.data.message);
        dispatch(toggleAddBookPopup());
    }).catch((err) => {
        dispatch(bookSlice.actions.addBookFailed(err.response.data.message));
    });
};

export const resetBookSlice = ()=>(dispatch)=>{
    dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;