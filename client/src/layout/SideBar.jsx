// import React, { useEffect } from "react";
// import logo_with_title from "../assets/logo-with-title.png";
// import logoutIcon from "../assets/logout.png";
// import dashboardIcon from "../assets/element.png";
// import bookIcon from "../assets/book.png";
// import catalogIcon from "../assets/catalog.png";
// import closeIcon from "../assets/close-square.png";

// import settingIcon from "../assets/setting-white.png";
// import usersIcon from "../assets/people.png";
// import { RiAdminFill } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser, resetAuthSlice } from "../store/slices/authSlice";
// import { toast } from "react-toastify";
// import { toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slices/popUpSlice";
// import AddNewAdmin from "../popups/AddNewAdmin";
// import SettingPopup from "../popups/SettingPopup";
// import { useNavigate } from "react-router-dom";

// const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { addNewAdminPopup, settingPopup } =useSelector(state => state.popup)
//   const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(resetAuthSlice());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetAuthSlice());
//     }
//   }, [dispatch, isAuthenticated, error, loading, message]);

//   return (
//     <>
//     <aside
//       className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`}
//       style={{ position: "fixed" }}
//     >
//       <div className="px-6 py-4 my-8">
//         <img src={logo_with_title} alt="logo" />
//       </div>
//       <nav className="flex-1 px-6 space-y-2">
//         <button onClick={() => setSelectedComponent("Dashboard")} className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
//           <img src={dashboardIcon} alt="icon" />
//           <span>Dashboard</span>
//         </button>

//         <button onClick={() => setSelectedComponent("Books")} className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
//           <img src={bookIcon} alt="icon" />
//           <span>Books</span>
//         </button>

//         {isAuthenticated && user?.role === "Admin" && (
//           <>
//             <button onClick={() => setSelectedComponent("Catalog")} className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
//               <img src={catalogIcon} alt="icon" />
//               <span>Catalog</span>
//             </button>

//             <button onClick={() => setSelectedComponent("Users")} className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
//               <img src={usersIcon} alt="icon" />
//               <span>Users</span>
//             </button>

//             <button onClick={() => dispatch(toggleAddNewAdminPopup())} className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
              
//               <RiAdminFill className="w-6 h-6" />
//               <span>Add New Admin</span>
//             </button>
//           </>
//          )}

//         {isAuthenticated && user?.role === "User" && (
//           <button onClick={() => setSelectedComponent("My Borrowed Books")} className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
//             <img src={catalogIcon} alt="icon" />
//             <span>My Borrowed Books</span>
//           </button>
//         )}

//         <button onClick={() => dispatch(toggleSettingPopup())} className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
//           <img src={settingIcon} alt="icon" />
//           <span>Update Credentials</span>
//         </button>

//         <button onClick={handleLogout} className="mt-4 w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2">
//           <img src={logoutIcon} alt="logout" />
//           <span>Logout</span>
//         </button>
//       </nav>
//       <div className="px-6 py-4">
//       <button className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center space-x-5 mx-auto w-fit" onClick={handleLogout}>
//         <img src={logoutIcon} alt="icon" /><span>Log Out</span>
//       </button>
//       </div>
//       <img src={closeIcon} alt="icon" onClick={()=>
//         setIsSideBarOpen(!isSideBarOpen)
//       } className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden" 
//       />
//     </aside>
//     {addNewAdminPopup && <AddNewAdmin />}
//     {settingPopup && <SettingPopup />}
//     </>
//   );
// };

// export default SideBar;


import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logo_gm from "../assets/gm-with-title2.png";
import logoutIcon from "../assets/logout.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import closeIcon from "../assets/close-square.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNewAdminPopup, settingPopup } = useSelector(state => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  return (
    <>
      <aside
        className={`${isSideBarOpen ? "left-0" : "-left-full"} z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-[#001F3F] text-white flex-col h-full shadow-lg`} // [style-modified: navy background and white text]
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-6 border-b border-white/20"> {/* [style-modified: lighter border] */}
          <img src={logo_gm} alt="logo" />
        </div>

        <nav className="flex-1 px-6 space-y-3 mt-4">
          <button onClick={() => setSelectedComponent("Dashboard")} className="w-full py-2 font-semibold rounded-lg hover:bg-[#003366] flex items-center space-x-3 transition text-white"> {/* [style-modified] */}
            <img src={dashboardIcon} alt="icon" className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button onClick={() => setSelectedComponent("Books")} className="w-full py-2 font-semibold rounded-lg hover:bg-[#003366] flex items-center space-x-3 transition text-white"> {/* [style-modified] */}
            <img src={bookIcon} alt="icon" className="w-5 h-5" />
            <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button onClick={() => setSelectedComponent("Catalog")} className="w-full py-2 font-semibold rounded-lg hover:bg-[#003366] flex items-center space-x-3 transition text-white"> {/* [style-modified] */}
                <img src={catalogIcon} alt="icon" className="w-5 h-5" />
                <span>Catalog</span>
              </button>

              <button onClick={() => setSelectedComponent("Users")} className="w-full py-2 font-semibold rounded-lg hover:bg-[#003366] flex items-center space-x-3 transition text-white"> {/* [style-modified] */}
                <img src={usersIcon} alt="icon" className="w-5 h-5" />
                <span>Users</span>
              </button>

              <button onClick={() => dispatch(toggleAddNewAdminPopup())} className="w-full py-2 font-semibold rounded-lg hover:bg-[#003366] flex items-center space-x-3 transition text-white"> {/* [style-modified] */}
                <RiAdminFill className="w-5 h-5" />
                <span>Add New Admin</span>
              </button>
            </>
          )}

          {isAuthenticated && user?.role === "User" && (
            <button onClick={() => setSelectedComponent("My Borrowed Books")} className="w-full py-2 font-semibold rounded-lg hover:bg-[#003366] flex items-center space-x-3 transition text-white"> {/* [style-modified] */}
              <img src={catalogIcon} alt="icon" className="w-5 h-5" />
              <span>My Borrowed Books</span>
            </button>
          )}

          <button onClick={() => dispatch(toggleSettingPopup())} className="w-full py-2 font-semibold rounded-lg hover:bg-[#003366] flex items-center space-x-3 transition text-white"> {/* [style-modified] */}
            <img src={settingIcon} alt="icon" className="w-5 h-5" />
            <span>Update Credentials</span>
          </button>

          {/* <button onClick={handleLogout} className="mt-4 w-full py-2 font-semibold rounded-lg hover:bg-red-600 bg-red-500 text-white flex items-center space-x-3 transition"> {/* [style-modified] 
            <img src={logoutIcon} alt="logout" className="w-5 h-5" />
            <span>Logout</span>
          </button>*/}
        </nav> 

        <div className="px-6 py-4 border-t border-white/20"> {/* [style-modified] */}
          <button className="mt-4 w-full py-2 font-semibold rounded-lg hover:bg-red-600 bg-red-500 text-white flex items-center space-x-3 transition" onClick={handleLogout}> {/* [style-modified] */}
            <img src={logoutIcon} alt="icon" className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>

        <img src={closeIcon} alt="icon" onClick={() => setIsSideBarOpen(!isSideBarOpen)} className="absolute top-0 right-4 mt-4 block md:hidden cursor-pointer w-6 h-6" />
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;




