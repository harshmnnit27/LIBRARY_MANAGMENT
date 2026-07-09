import React, { useState, useEffect } from "react";
import logo_with_title from "../assets/gm-with-title.png";
import { Pie } from "react-chartjs-2";
import { BookOpen, BookDown, Library, Compass } from "lucide-react";
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
import Header from "../layout/Header";
import { Link } from "react-router-dom";

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

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow) || {
    userBorrowedBooks: [],
  };

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const borrowed = Array.isArray(userBorrowedBooks) ? userBorrowedBooks : [];
    const currentlyBorrowed = borrowed.filter((book) => book.returned === false);
    const returned = borrowed.filter((book) => book.returned === true);
    setTotalBorrowedBooks(currentlyBorrowed.length);
    setTotalReturnedBooks(returned.length);
  }, [userBorrowedBooks]);

  const isEmpty = totalBorrowedBooks === 0 && totalReturnedBooks === 0;

  const data = {
    labels: ["Currently Borrowed", "Returned"],
    datasets: [
      {
        data: isEmpty ? [1] : [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: isEmpty ? ["#e2e8f0"] : ["#3b82f6", "#10b981"],
        borderWidth: 0,
        hoverOffset: isEmpty ? 0 : 4,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: !isEmpty },
    },
  };

  return (
    <>
      <main className="relative flex-1 p-8 pt-28 bg-slate-50 min-h-screen font-sans">
        <Header />
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Here is what's happening with your books today.</p>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-8">
          {/* LEFT SECTION (Cards & Quote) */}
          <div className="flex-[3] flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">Your Borrowed Book List</p>
                    <p className="text-2xl font-bold text-slate-800">{totalBorrowedBooks} Books</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <BookDown className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">Your Returned Book List</p>
                    <p className="text-2xl font-bold text-slate-800">{totalReturnedBooks} Books</p>
                  </div>
                </div>
              </div>

              {/* Card 3 (Full width) */}
              <div className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden md:col-span-2 flex justify-between items-center cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                    <Library className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-indigo-600 text-sm font-bold uppercase tracking-wider mb-1">Discover More</p>
                    <p className="text-xl font-semibold text-slate-800">Let's Browse Books Inventory</p>
                  </div>
                </div>
                <Compass className="w-8 h-8 text-indigo-300 group-hover:text-indigo-500 transition-colors mr-4" />
              </div>
            </div>

            {/* Quote Section */}
            <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 md:p-10 rounded-3xl shadow-xl overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h4 className="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-200">
                    "As the Upanishads say — ‘Tamaso mā jyotir gamaya’ — from ignorance, lead me to light. Granthamitra is your guide."
                  </h4>
                  <p className="text-indigo-300 font-semibold mt-6 tracking-wide">
                    — Granthamitra Team
                  </p>
                </div>
                <img src={logo_with_title} alt="logo" className="w-32 h-32 object-contain opacity-90 drop-shadow-lg hidden md:block" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (Chart) */}
          <div className="flex-[1.5] flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center h-full justify-center">
              <h3 className="text-lg font-bold text-slate-800 mb-8 self-start w-full">Activity Overview</h3>
              
              <div className="w-48 h-48 relative mb-10">
                <Pie data={data} options={options} />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-slate-800">{totalBorrowedBooks + totalReturnedBooks}</span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Total</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/50 border border-blue-100/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    <span className="font-medium text-slate-700">Currently Borrowed</span>
                  </div>
                  <span className="font-bold text-blue-600">{totalBorrowedBooks}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <span className="font-medium text-slate-700">Total Returned</span>
                  </div>
                  <span className="font-bold text-emerald-600">{totalReturnedBooks}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
