
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import { Users, BookOpen, ShieldCheck, Library } from "lucide-react";
import Header from "../layout/Header";
import logo from "../assets/gm-with-title.png";
import placeHolder from "../assets/placeholder.jpg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.user);
  const { books } = useSelector(state => state.book);
  const { allBorrowedBooks } = useSelector(state => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const numberOfUsers = users.filter(user => user.role === "User");
    const numberOfAdmins = users.filter(user => user.role === "Admin");
    setTotalUsers(numberOfUsers.length);
    setTotalAdmins(numberOfAdmins.length);
    setTotalBooks(books?.length || 0);

    const numberOfTotalBorrowedBooks = allBorrowedBooks.filter(
      book => book.returnDate === null
    );
    const numberOfTotalReturnedBooks = allBorrowedBooks.filter(
      book => book.returnDate !== null
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [users, allBorrowedBooks, books]);

  const data = {
    labels: ["Borrowed", "Returned"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3b82f6", "#10b981"], // Blue & Emerald
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        cornerRadius: 8,
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <>
      <main className="relative flex-1 p-8 pt-28 bg-slate-50 min-h-screen font-sans">
        <Header />

        {/* Header Section */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Dashboard</h2>
          <p className="text-slate-500 mt-2">Overview of library statistics and activities.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content Area (Left side) */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition hover:shadow-md">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shrink-0">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-800">{totalUsers}</h4>
                  <p className="font-medium text-slate-500 text-sm">Total Users</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition hover:shadow-md">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                  <Library className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-800">{totalBooks}</h4>
                  <p className="font-medium text-slate-500 text-sm">Total Books</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition hover:shadow-md">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-slate-800">{totalAdmins}</h4>
                  <p className="font-medium text-slate-500 text-sm">Admins</p>
                </div>
              </div>
            </div>

            {/* Quote Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[220px]">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>

              <div className="relative z-10 text-center px-4 md:px-12">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-relaxed text-balance">
                  ✨📚 "Tamaso mā jyotir gamaya" — from ignorance, lead me to light. 📖
                </h3>
                <p className="text-blue-100 mt-6 font-medium text-sm tracking-wide uppercase">~ Granthamitra</p>
              </div>
            </div>

          </div>

          {/* Sidebar Area (Right side) */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* User Profile Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-md opacity-30 transform translate-y-1"></div>
                <img
                  src={user?.avatar?.url || placeHolder}
                  alt="Admin Avatar"
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-md z-10"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{user?.name || "Admin"}</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 mb-6 uppercase tracking-wider">
                Administrator
              </span>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                🙏 Namaste! Manage your digital library efficiently and oversee all operations and insights with ease.
              </p>
            </div>

            {/* Circulation Stats (Chart) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Circulation Activity</h3>

              <div className="relative h-48 w-full flex justify-center items-center mb-6">
                {totalBorrowedBooks === 0 && totalReturnedBooks === 0 ? (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <BookOpen className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-sm font-medium">No activity yet</p>
                  </div>
                ) : (
                  <>
                    <Pie data={data} options={chartOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-3xl font-black text-slate-800 leading-none">
                        {totalBorrowedBooks + totalReturnedBooks}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">Total</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-semibold text-slate-700">Active Borrows</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{totalBorrowedBooks}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-semibold text-slate-700">Returned</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800">{totalReturnedBooks}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;

