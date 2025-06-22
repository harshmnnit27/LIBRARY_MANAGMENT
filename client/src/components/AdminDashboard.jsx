// import React, { useEffect, useState } from "react";
// import adminIcon from "../assets/pointing.png";
// import usersIcon from "../assets/people-black.png";
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
// import Header from "../layout/Header"

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

// const AdminDashboard = () => {
//   const {user} = useSelector(state => state.auth);
//   const {users} = useSelector(state => state.user);
//   const {books} = useSelector(state => state.book);
//   const {allBorrowedBooks} = useSelector(state => state.borrow);
//   const {settingPopup} = useSelector(state => state.auth);

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalAdmins, setTotalAdmins] = useState(0);
//   const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
//   const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
//   const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

//   useEffect(()=>{
//     let numberOfUsers = users.filter(user => user.role === "User");
//     let numberOfAdmins = users.filter(user => user.role === "Admin");
//     setTotalUsers(numberOfUsers.length);
//     setTotalAdmins(numberOfAdmins.length);

//     let numberOfTotalBorrowedBooks = allBorrowedBooks.filter(
//       (book) => book.returnDate === null
//     );
//     let numberOfTotalReturnedBooks = allBorrowedBooks.filter(
//       (book) => book.returnDate !== null
//     );
//     setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length)
//     setTotalReturnedBooks(numberOfTotalReturnedBooks.length)


//   }, [users, allBorrowedBooks])

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

//   return <>
//     <main className="relative flex-1 p-6 pt-28">
//       <Header/>
//       <div className="flex flex-col-reverse xl:flex-row">
//         {/* LEFT SIDE */}
//         <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
//           <div className="xl:flex-[4] flex items-end w-full content-center">
//             <Pie data={data} options={{cutout: 0}} className="mx-auto lg:mx-0 w-full h-auto"/>
//           </div>
//           <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
//             <img src={logo} alt="logo" className="w-auto xl:flex-1 rounded-lg"/>
//             <span className="w-[2px] bg-black h-full"></span>
//             <div className="flex flex-col gap-3">
//               <p className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
//               <span>Total Borrowed Books</span>
//             </p>
//             <p className="flex items-center gap-3">
//               <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
//               <span>Total Returned Books</span>
//             </p>
//             </div>
//           </div>
//         </div>
//         {/* RIGHT SIDE */}
//         <div className="flex flex-[4] flex-col gap-7 lg:gap-16 lg:px-7 lg:py-5 justify-between xl:min-h-[85.5vh]">
//           <div className="flex flex-col-reverse lg:flex-row gap-7 flex-[4]">
//             <div className="flex flex-col gap-7 flex-1">
//               <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
//                 <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
//                   <img src={usersIcon} alt="users-icon" className="w-8 h-8"/>
//                 </span>
//                 <span className="w-[2px] bg-black h-20 lg:h-full"></span>
//                 <div className="flex flex-col items-center gap-2">
//                   <h4 className="font-black text-3xl">{totalUsers}</h4>
//                   <p className="font-light text-gray-700 text-sm"> Total User Base</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
//                 <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
//                   <img src={bookIcon} alt="book-icon" className="w-8 h-8"/>
//                 </span>
//                 <span className="w-[2px] bg-black h-20 lg:h-full"></span>
//                 <div className="flex flex-col items-center gap-2">
//                   <h4 className="font-black text-3xl">{totalBooks}</h4>
//                   <p className="font-light text-gray-700 text-sm"> Total Book Count</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
//                 <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
//                   <img src={adminIcon} alt="users-icon" className="w-8 h-8"/>
//                 </span>
//                 <span className="w-[2px] bg-black h-20 lg:h-full"></span>
//                 <div className="flex flex-col items-center gap-2">
//                   <h4 className="font-black text-3xl">{totalAdmins}</h4>
//                   <p className="font-light text-gray-700 text-sm"> Total Admin Count</p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col lg:flex-row flex-1">
//             <div className="flex flex-col lg:flex-row flex-1 items-center justify-center">
//               <div className="bg-white p-5 rounded-lg h-full flex flex-col justify-center items-center gap-4">
//                 <img src={user && user.avatar?.url} alt="avatar" className="rounded-full w-32 h-32 object-cover" />
//                 <h2 className="text-xl 2xl:text-2xl font-semibold text-center ">{user && user.name}</h2>
//                 <p className="text-gray-600 text-sm 2xl:text-base text-center">
//                   Welcome to your admin dashboard. Here you can manage all the settings and monitor the statistics.
//                 </p>
//               </div>
//             </div>
//           </div>

//           </div>

//           <div className="hidden xl:flex bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex-[3] justify-center items-center rounded-2xl">
//             <h4 className="overflow-y-hidden">"Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinedment of character."</h4>
//             <p className="text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[78px] bottom-[10px]">Granthamitra Team</p>
//           </div>
          
//         </div>
//       </div>
//     </main>
  
//   </>;
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
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

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.user);
  const { books } = useSelector(state => state.book);
  const { allBorrowedBooks } = useSelector(state => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const numberOfUsers = users.filter(user => user.role === "User");
    const numberOfAdmins = users.filter(user => user.role === "Admin");
    setTotalUsers(numberOfUsers.length);
    setTotalAdmins(numberOfAdmins.length);

    const numberOfTotalBorrowedBooks = allBorrowedBooks.filter(
      book => book.returnDate === null
    );
    const numberOfTotalReturnedBooks = allBorrowedBooks.filter(
      book => book.returnDate !== null
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [users, allBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#003366", "#001F3F"], // ✅ Pie colors updated
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <div className="flex flex-col-reverse xl:flex-row">
          {/* LEFT SIDE */}
          <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
            <div className="xl:flex-[4] flex items-end w-full content-center">
              <Pie data={data} options={{ cutout: "30%" }} className="mx-auto lg:mx-0 w-full h-auto" />
            </div>
            <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
              <img src={logo} alt="logo" className="h-[200px] w-[200px] xl:flex-1 rounded-lg" />
              <span className="w-[2px] bg-[#001F3F] h-full"></span>
              <div className="flex flex-col gap-3 text-[#003366]"> {/* ✅ Text color updated */}
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#003366]"></span> {/* ✅ Legend color */}
                  <span>Total Borrowed Books</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#001F3F]"></span> {/* ✅ Legend color */}
                  <span>Total Returned Books</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-[4] flex-col gap-7 lg:gap-16 lg:px-7 lg:py-5 justify-between xl:min-h-[85.5vh] text-[#003366]"> {/* ✅ Global text color */}
            <div className="flex flex-col-reverse lg:flex-row gap-7 flex-[4]">
              <div className="flex flex-col gap-7 flex-1">
                {/* Total Users Card */}
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                  <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <img src={usersIcon} alt="users-icon" className="w-8 h-8" />
                  </span>
                  <span className="w-[2px] bg-[#001F3F] h-20 lg:h-full"></span>
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="font-black text-3xl">{totalUsers}</h4>
                    <p className="font-light text-sm">Total User Base</p>
                  </div>
                </div>

                {/* Total Books Card */}
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                  <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <img src={bookIcon} alt="book-icon" className="w-8 h-8" />
                  </span>
                  <span className="w-[2px] bg-[#001F3F] h-20 lg:h-full"></span>
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="font-black text-3xl">{totalBooks}</h4>
                    <p className="font-light text-sm">Total Book Count</p>
                  </div>
                </div>

                {/* Total Admins Card */}
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                  <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <img src={adminIcon} alt="users-icon" className="w-8 h-8" />
                  </span>
                  <span className="w-[2px] bg-[#001F3F] h-20 lg:h-full"></span>
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="font-black text-3xl">{totalAdmins}</h4>
                    <p className="font-light text-sm">Total Admin Count</p>
                  </div>
                </div>
              </div>

              {/* User Profile Section */}
              <div className="flex flex-col lg:flex-row flex-1 items-center justify-center">
                <div className="bg-white p-5 rounded-lg h-full flex flex-col justify-center items-center gap-4">
                  <img src={user?.avatar?.url} alt="avatar" className="rounded-full w-32 h-32 object-cover" />
                  <h2 className="text-xl 2xl:text-2xl font-semibold text-center">{user?.name}</h2>
                  <p className="text-gray-600 text-sm 2xl:text-base text-center">
                    🙏 Namaste Admin! Manage your digital library efficiently and oversee all operations and insights with ease.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="hidden xl:flex bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex-[3] justify-center items-center rounded-2xl text-[#003366]"> {/* ✅ Text updated */}
              <h3 className="overflow-y-hidden">
                ✨📚 As the Upanishads say — ‘Tamaso mā jyotir gamaya’ — from ignorance, lead me to light.📖 Granthamitra is your guide. 🧭🌟


              </h3>
              <p className="text-sm sm:text-lg absolute right-[35px] sm:right-[78px] bottom-[10px]">~Granthamitra Team</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;

