// import React from "react";
// import { useState } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import {useSelector} from "react-redux";
// import {Navigate} from "react-router-dom";
// import Sidebar from "../layout/SideBar"
// import UserDashboard from "../components/UserDashboard"
// import AdminDashboard from "../components/AdminDashboard"
// import BookManagement from "../components/BookManagement"
// import Catalog from "../components/Catalog";
// import MyBorrowedBooks from "../components/MyBorrowedBooks"
// import Users from "../components/Users"



// const Home = () => {
//   const [isSideBarOpen, setIsSideBarOpen]=useState(false);
//   const [selectedComponent, setSelectedComponent] = useState("");


//   const {user, isAuthenticated}=useSelector((state) => state.auth);

//   if(!isAuthenticated){
//     return <Navigate to={"/login"}/>;
//   }
//   return( <>
//   <div className="relative md:p1-64 flex min-h-screen bg-gray-100">
//      <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
//       <GiHamburgerMenu className="text-2x1" onClick={()=>setIsSideBarOpen(!isSideBarOpen)}/>
//     </div>
//     <Sidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} setSelectedComponent={setSelectedComponent}/>
     
//      {
//       (
//         ()=>{
//           switch (selectedComponent){
//             case "Dashboard":
//               return user?.role === "User" ?(
//                 <UserDashboard/>
//               ) : (
//                 <AdminDashboard/>
//               )
//               break;
//               case "Books":
//                 return <BookManagement/>
//                 break;
//               case "Catalog":
//                 if(user.role === "Admin"){
//                   return <Catalog/>
//                 }
//                 break;
//                 case "Users":
//                   if(user.role === "Admin"){
//                     return <Users/>
//                   }
//                 break;
//                 case "My Borrowed Books":
//                   return <MyBorrowedBooks />;
//                   break;
//                 default:
//                   return user?.role === "User" ?(
//                     <UserDashboard/>
//                   ) : (
//                     <AdminDashboard/>
//                   )
//                   break;
//           }
//         }
//       )()
//      }

//   </div>
//   </>)
// };

// export default Home;

import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Sidebar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import Users from "../components/Users";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const sidebarRef = useRef();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Auto-close sidebar on mobile when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setIsSideBarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="relative flex min-h-screen bg-gray-100">
        {/* Hamburger Button */}
        <div className="md:hidden z-20 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        </div>

        {/* Sidebar with ref */}
        <div ref={sidebarRef}>
          <Sidebar
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            setSelectedComponent={setSelectedComponent}
          />
        </div>

        {/* Optional Overlay on Mobile */}
        {isSideBarOpen && (
          <div className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"></div>
        )}

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-4 overflow-y-auto z-0">
          {
            (() => {
              switch (selectedComponent) {
                case "Dashboard":
                  return user?.role === "User" ? (
                    <UserDashboard />
                  ) : (
                    <AdminDashboard />
                  );
                case "Books":
                  return <BookManagement />;
                case "Catalog":
                  return user.role === "Admin" ? <Catalog /> : null;
                case "Users":
                  return user.role === "Admin" ? <Users /> : null;
                case "My Borrowed Books":
                  return <MyBorrowedBooks />;
                default:
                  return user?.role === "User" ? (
                    <UserDashboard />
                  ) : (
                    <AdminDashboard />
                  );
              }
            })()
          }
        </div>
      </div>
    </>
  );
};

export default Home;

