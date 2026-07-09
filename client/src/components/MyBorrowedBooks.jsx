
import React, { useEffect, useState } from "react";
import { Eye, BookCheck, BookX, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import { fetchUserBorrowedBooks, returnBook, resetBorrowSlice } from "../store/slices/borrowSlice";
import { toast } from "react-toastify";
import ReadBookPopup from "../popups/ReadBookPopup";
import PaymentModal from "../popups/PaymentModal";
import Header from "../layout/Header";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks, message, error } = useSelector((state) => state.borrow);
  const { readBookPopup } = useSelector((state) => state.popup);
  const { user } = useSelector((state) => state.auth);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  useEffect(() => {
    dispatch(fetchUserBorrowedBooks());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchUserBorrowedBooks());
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, message, error]);

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const [filter, setFilter] = useState("nonReturned");
  const [searchedKeyword, setSearchedKeyword] = useState("");

  const handleSearch = (e) => setSearchedKeyword(e.target.value.toLowerCase());

  const returnedBooks = userBorrowedBooks?.filter((book) => book.returned === true) || [];
  const nonReturnedBooks = userBorrowedBooks?.filter((book) => book.returned === false) || [];
  const baseBooks = filter === "returned" ? returnedBooks : nonReturnedBooks;

  const booksToDisplay = baseBooks.filter(book =>
    book.bookTitle?.toLowerCase().includes(searchedKeyword)
  );

  const [paymentBook, setPaymentBook] = useState(null);

  const getTimelineBadge = (dueDate) => {
    const due = new Date(dueDate).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 3) return { text: `${diffDays} Days Left`, color: 'bg-blue-100 text-blue-700' };
    if (diffDays > 0) return { text: `${diffDays} Days Left`, color: 'bg-amber-100 text-amber-700' };
    if (diffDays === 0) return { text: `Due Today`, color: 'bg-orange-100 text-orange-700' };
    return { text: `Overdue by ${Math.abs(diffDays)} Days`, color: 'bg-red-100 text-red-700 font-bold' };
  };

  return (
    <>
      <main className="relative flex-1 p-8 pt-28 bg-slate-50 min-h-screen font-sans">
        <Header />

        {/* Header Section */}
        <header className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">My Borrowed Books</h2>
            <p className="text-slate-500 mt-2">Track the books you are currently reading or have read.</p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search your books..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                value={searchedKeyword}
                onChange={handleSearch}
              />
            </div>
          </div>
        </header>

        {/* Toggle Controls */}
        <div className="flex p-1 bg-slate-200/60 rounded-xl w-full sm:w-80 mb-6">
          <button
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${filter === "nonReturned"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
              }`}
            onClick={() => setFilter("nonReturned")}
          >
            Currently Borrowed
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${filter === "returned"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
              }`}
            onClick={() => setFilter("returned")}
          >
            Returned History
          </button>
        </div>

        {/* Table Content */}
        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-sm font-semibold tracking-wide uppercase">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Book Title</th>
                    <th className="px-6 py-4">Borrowed On</th>
                    <th className="px-6 py-4">{filter === "returned" ? "Fines & Payments" : "Return Timeline"}</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {booksToDisplay.map((book, index) => {
                    const badge = getTimelineBadge(book.dueDate);

                    return (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4 text-slate-500 font-medium">#{String(index + 1).padStart(3, '0')}</td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">{book.bookTitle}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{formatDate(book.borrowedDate)}</td>

                        <td className="px-6 py-4">
                          {filter === "returned" ? (
                            book.fineAmount > 0 ? (
                              book.finePaid ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                  ₹{book.fineAmount} Paid ({book.paymentMethod})
                                </span>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                    ₹{book.fineAmount} Unpaid
                                  </span>
                                  <button
                                    onClick={() => setPaymentBook(book)}
                                    className="text-xs bg-slate-800 text-white px-3 py-1 rounded-lg hover:bg-slate-700 transition"
                                  >
                                    Pay Now
                                  </button>
                                </div>
                              )
                            ) : (
                              <span className="text-slate-500 text-sm">No Fine</span>
                            )
                          ) : (
                            <div className="flex flex-col">
                              <span className="text-slate-600 text-sm mb-1">{formatDate(book.dueDate).split(' ')[0]}</span>
                              <span className={`inline-flex w-max items-center px-2.5 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                                {badge.text}
                              </span>
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${book.returned ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {book.returned ? "Returned" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => openReadPopup(book.bookId)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Book Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>

                            {!book.returned && (
                              <button
                                onClick={() => dispatch(returnBook({ email: user.email, bookId: book.bookId }))}
                                className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Return Book"
                              >
                                <BookCheck className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${filter === 'returned' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
              {filter === 'returned' ? (
                <BookCheck className="w-10 h-10 text-emerald-400" />
              ) : (
                <BookX className="w-10 h-10 text-amber-400" />
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {filter === "returned" ? "No returned books" : "No currently borrowed books"}
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              {searchedKeyword
                ? `We couldn't find any ${filter === "returned" ? 'returned' : 'borrowed'} books matching "${searchedKeyword}".`
                : filter === "returned"
                  ? "You haven't returned any books yet. Once you return a book, it will appear in this history."
                  : "You are not currently borrowing any books. Visit the Library Catalog to find a book to read!"
              }
            </p>
          </div>
        )}
      </main>

      {readBookPopup && <ReadBookPopup book={readBook} />}
      {paymentBook && <PaymentModal book={paymentBook} onClose={() => setPaymentBook(null)} />}
    </>
  );
};

export default MyBorrowedBooks;
