
import React, { useEffect, useState } from "react";
import { Eye, NotebookPen, Search, Plus, BookX, BookOpen, Library, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddBookPopup, toggleReadBookPopup, toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice, deleteBook } from "../store/slices/bookSlice";
import { fetchAllBorrowedBooks, resetBorrowSlice, userBorrowBook } from "../store/slices/borrowSlice";
import Header from "../layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();

  const { loading, error, message, books } = useSelector(state => state.book);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector((state) => state.popup);
  const { loading: borrowSliceLoading, error: borrowSliceError, message: borrowSliceMessage } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const [borrowBookId, setBorrowBookId] = useState("");

  const openReadPopup = (id) => {
    const book = books.find(book => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const openRecordBookPopup = (bookId) => {
    setBorrowBookId(bookId);
    dispatch(toggleRecordBookPopup());
  };

  // ✅ Fetch books on component mount to resolve "No content" issue
  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  // Handle messages & errors
  useEffect(() => {
    if (message || borrowSliceMessage) {
      toast.success(message || borrowSliceMessage);
      dispatch(fetchAllBooks());
      if (user && user.role === "Admin") {
        dispatch(fetchAllBorrowedBooks());
      }
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
    if (error || borrowSliceError) {
      toast.error(error || borrowSliceError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, message, error, borrowSliceError, borrowSliceMessage]);

  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  // Filter books based on search and availability toggle
  const filteredBooks = books?.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchedKeyword) || book.author.toLowerCase().includes(searchedKeyword);
    const matchesAvailability = showAvailableOnly ? book.availability === true : true;
    return matchesSearch && matchesAvailability;
  }) || [];

  // Calculate quick stats
  const totalBooks = books?.length || 0;
  const availableBooks = books?.filter(b => b.availability)?.length || 0;

  return <>
    <main className="relative flex-1 p-8 pt-28 bg-slate-50 min-h-screen font-sans">
      <Header />

      {/* Header Section */}
      <header className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            {user && user.role === "Admin" ? "Book Management" : "Library Catalog"}
          </h2>
          <p className="text-slate-500 mt-2">Browse and manage the library's collection.</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {isAuthenticated && user?.role === "Admin" && (
            <button
              className="flex items-center justify-center gap-2 py-2.5 px-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all active:scale-95"
              onClick={() => dispatch(toggleAddBookPopup())}
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Book</span>
            </button>
          )}
        </div>
      </header>

      {/* Quick Stats & Controls Section */}
      {books && books.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Collection</p>
              <h4 className="text-2xl font-bold text-slate-800">{totalBooks} Books</h4>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
              <Library className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Available to Borrow</p>
              <h4 className="text-2xl font-bold text-slate-800">{availableBooks} Books</h4>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center gap-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={searchedKeyword}
                onChange={handleSearch}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer group w-fit">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={showAvailableOnly}
                  onChange={() => setShowAvailableOnly(!showAvailableOnly)}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${showAvailableOnly ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showAvailableOnly ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Available only</span>
            </label>
          </div>
        </div>
      )}

      {/* Content Section */}
      {books && books.length > 0 ? (
        filteredBooks.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-sm font-semibold tracking-wide uppercase">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4 text-center">Availability</th>
                    {isAuthenticated && user?.role === "Admin" && (
                      <th className="px-6 py-4 text-center">Stock</th>
                    )}
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBooks.map((book, index) => (
                    <tr key={book._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 text-slate-500 font-medium">#{String(index + 1).padStart(3, '0')}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{book.title}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{book.author}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${book.availability ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {book.availability ? "Available" : "Checked Out"}
                        </span>
                      </td>
                      {isAuthenticated && user?.role === "Admin" && (
                        <td className="px-6 py-4 text-center text-slate-600 font-medium">{book.quantity}</td>
                      )}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => openReadPopup(book._id)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>

                          {isAuthenticated && user?.role === "Admin" && (
                            <>
                              <button
                                onClick={() => openRecordBookPopup(book._id)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Record Book"
                              >
                                <NotebookPen className="w-5 h-5" />
                              </button>

                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this book?")) {
                                    dispatch(deleteBook(book._id));
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Delete Book"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}

                          {isAuthenticated && user?.role === "User" && book.availability && (
                            <button
                              onClick={() => dispatch(userBorrowBook({ email: user.email, bookId: book._id }))}
                              disabled={borrowSliceLoading}
                              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Borrow Book"
                            >
                              <BookOpen className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No matching books</h3>
            <p className="text-slate-500 max-w-sm">We couldn't find any books matching your filters. Try adjusting your search.</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <BookX className="w-12 h-12 text-blue-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Library is empty</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-8">It looks like there are no books in the library yet. Please check back later or contact the administrator.</p>
          {isAuthenticated && user?.role === "Admin" && (
            <button
              className="flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all active:scale-95"
              onClick={() => dispatch(toggleAddBookPopup())}
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add First Book</span>
            </button>
          )}
        </div>
      )}
    </main>

    {addBookPopup && <AddBookPopup />}
    {readBookPopup && <ReadBookPopup book={readBook} />}
    {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
  </>;
};

export default BookManagement;

