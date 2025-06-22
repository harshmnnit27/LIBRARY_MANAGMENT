// import React, { useState, useEffect } from "react";
// import logo_with_title from "../assets/logo-with-title-black.png";
// import returnIcon from "../assets/redo.png";
// import browseIcon from "../assets/pointing.png";
// import bookIcon from "../assets/book-square.png";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement,
// } from "chart.js";
// import logo from "../assets/black-logo.png";
// import { useSelector } from "react-redux";
// import Header from "../layout/Header";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement
// );

// const UserDashboard = () => {
//   const { settingPopup } = useSelector((state) => state.popup);
//   const { userBorrowedBooks } = useSelector((state) => state.borrow) || {
//     userBorrowedBooks: [],
//   };

//   const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
//   const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

//   useEffect(() => {
//     const borrowed = Array.isArray(userBorrowedBooks) ? userBorrowedBooks : [];
//     let numberOfTotalBorrowedBooks = borrowed.filter(
//       (book) => book.returned === false
//     );
//     let numberOfTotalReturnedBooks = borrowed.filter(
//       (book) => book.returned === true
//     );
//     setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
//     setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
//   }, [userBorrowedBooks]);

//   const data = {
//     labels: ["Total Borrowed Books", "Total Returned Books"],
//     datasets: [
//       {
//         data: [totalBorrowedBooks, totalReturnedBooks],
//         backgroundColor: ["#3DE3E3E", "#151619"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <>
//       <main className="relative flex-1 p-6 pt-28">
//         <Header />
//         <div className="flex flex-col-reverse xl:flex-row">
//           {/* LEFT SIDE */}
//           <div className="flex flex-[4] flex-col gap-7 lg:gap-16 xl:gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]">
//             <div className="flex flex-col gap-7 flex-[4]">
//               <div className="flex flex-col lg:flex-row gap-7 overflow-y-hidden">
//                 <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 ">
//                   <span className="w-[2px] bg-black h-20 lg:h-full"></span>
//                   <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center">
//                     <img
//                       src={bookIcon}
//                       alt="book-icon"
//                       className="w-8 h-8"
//                     />
//                   </span>
//                   <p className="text-lg xl:text-xl font-semibold">
//                     Your Borrowed Book List
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 ">
//                   <span className="w-[2px] bg-black h-20 lg:h-full"></span>
//                   <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center">
//                     <img
//                       src={returnIcon}
//                       alt="return-icon"
//                       className="w-8 h-8"
//                     />
//                   </span>
//                   <p className="text-lg xl:text-xl font-semibold">
//                     Your Returned Book List
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-col lg:flex-row gap-7">
//                 <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 ">
//                   <span className="w-[2px] bg-black h-20 lg:h-full"></span>
//                   <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center">
//                     <img
//                       src={browseIcon}
//                       alt="book-icon"
//                       className="w-8 h-8"
//                     />
//                   </span>
//                   <p className="text-lg xl:text-xl font-semibold">
//                     Let's Browse books inventory
//                   </p>
//                 </div>
//                 <img
//                   src={logo_with_title}
//                   alt="logo"
//                   className="hidden lg:block w-auto justify-end"
//                 />
//               </div>
//             </div>

//             <div className="bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex-[3] flex justify-center items-center rounded-2xl">
//               <h4 className="overflow-y-hidden">
//                 "Embarking on the journey of reading fosters personal growth,
//                 nurturing a path towards excellence and the refinedment of
//                 character."
//               </h4>
//               <p className="text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[78px] bottom-[10px]">
//                 ~Granthamitra Team
//               </p>
//             </div>
//           </div>
//           {/* RIGHT SIDE */}
//           <div className="flex-[2]  flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
//             <div className="xl:flex-[4] flex items-end w-full content-center">
//               <Pie
//                 data={data}
//                 options={{ cutout: 0 }}
//                 className="mx-auto lg:mx-0 w-full h-auto"
//               />
//             </div>
//             <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
//               <img src={logo} alt="logo" className="w-auto h-12 2xl:h-20" />
//               <span className="w-[2px] bg-black h-full"></span>
//               <div className="flex flex-col gap-5">
//                 <p className="flex items-center gap-3">
//                   <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
//                   <span>Total Borrowed Books</span>
//                 </p>
//                 <p className="flex items-center gap-3">
//                   <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
//                   <span>Total Returned Books</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default UserDashboard;

// Updated UserDashboard.jsx with improved visuals and comments

import React, { useState, useEffect } from "react";
import logo_with_title from "../assets/gm-with-title.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
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
import logo from "../assets/gm-with-title.png";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

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
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow) || {
    userBorrowedBooks: [],
  };

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const borrowed = Array.isArray(userBorrowedBooks) ? userBorrowedBooks : [];
    const borrowedBooks = borrowed.filter((book) => book.returned === false);
    const returnedBooks = borrowed.filter((book) => book.returned === true);
    setTotalBorrowedBooks(borrowedBooks.length);
    setTotalReturnedBooks(returnedBooks.length);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Borrowed", "Returned"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#003366", "#001F3F"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 bg-[#f5f7fa] min-h-screen">
        <Header />
        <div className="flex flex-col-reverse xl:flex-row gap-8">
          {/* LEFT SECTION */}
          <div className="flex-[4] flex flex-col gap-7 text-[#003366]">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col lg:flex-row gap-7">
                <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] rounded-xl shadow hover:shadow-lg transition">
                  <span className="w-[2px] bg-[#003366] h-20 lg:h-full"></span>
                  <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center">
                    <img src={bookIcon} alt="book-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">
                    Your Borrowed Book List
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] rounded-xl shadow hover:shadow-lg transition">
                  <span className="w-[2px] bg-[#001F3F] h-20 lg:h-full"></span>
                  <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center">
                    <img src={returnIcon} alt="return-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">
                    Your Returned Book List
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-7">
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] rounded-xl shadow hover:shadow-lg transition">
                  <span className="w-[2px] bg-[#2D3748] h-20 lg:h-full"></span>
                  <span className="bg-gray-200 h-20 lg:h-full min-w-20 flex justify-center items-center">
                    <img src={browseIcon} alt="browse-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">
                    Let's Browse Books Inventory
                  </p>
                </div>

                <img src={logo_with_title} alt="logo" className="hidden lg:block w-auto max-h-28 object-contain" />
              </div>
            </div>

            <div className="bg-white p-7 text-lg sm:text-xl xl:text-2xl font-semibold relative rounded-2xl shadow">
              <h4>
                ✨📚 As the Upanishads say — ‘Tamaso mā jyotir gamaya’ — from ignorance, lead me to light. 📖 Granthamitra is your guide. 🧭🌟


              </h4>
              <p className="text-gray-600 text-sm sm:text-base absolute right-6 bottom-4">
                ~ Granthamitra Team
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex-[2] flex flex-col items-center gap-10 xl:gap-16">
            <div className="w-full max-w-[350px]">
              <Pie data={data} options={{ cutout: "30%" }} />
            </div>

            <div className="bg-white flex items-center p-6 gap-6 shadow rounded-xl w-full max-w-[400px]">
              <img src={logo} alt="logo" className="w-20 h-20" />
              <span className="w-[2px] bg-[#001F3F] h-full"></span>
              <div className="flex flex-col gap-4 text-[#003366]">
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#003366]"></span>
                  <span>Total Borrowed Books</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#001F3F]"></span>
                  <span>Total Returned Books</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
