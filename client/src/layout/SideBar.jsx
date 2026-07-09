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
import { LayoutDashboard, Book, BookOpen, Users, UserPlus, Settings, LogOut, X } from "lucide-react";
import logo_gm from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, selectedComponent, setSelectedComponent }) => {
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

  // Determine active component. If empty string, default is "Dashboard"
  const activeTab = selectedComponent || "Dashboard";

  const navItemClass = (tabName) => `w-full py-3 px-4 font-medium rounded-xl flex items-center space-x-3 transition-all duration-300 ${
    activeTab === tabName 
      ? "bg-white/10 text-white shadow-lg backdrop-blur-md border border-white/10" 
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

  return (
    <>
      <aside
        className={`${isSideBarOpen ? "left-0" : "-left-full"} z-50 transition-all duration-500 md:relative md:left-0 flex w-[280px] bg-gradient-to-b from-[#3E1A0F] to-[#250F08] text-stone-100 flex-col h-full shadow-2xl border-r border-[#4A2515]`}
        style={{ position: "fixed" }}
      >
        <div className="px-8 py-8 flex items-center justify-between border-b border-[#4A2515]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <BookOpen className="w-6 h-6 text-[#3E1A0F]" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md">Granthamitra</span>
          </div>
          <button onClick={() => setIsSideBarOpen(false)} className="md:hidden text-stone-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <button onClick={() => setSelectedComponent("Dashboard")} className={navItemClass("Dashboard")}>
            <LayoutDashboard className={`w-5 h-5 ${activeTab === "Dashboard" ? "text-amber-500" : ""}`} />
            <span>Dashboard</span>
          </button>

          <button onClick={() => setSelectedComponent("Books")} className={navItemClass("Books")}>
            <Book className={`w-5 h-5 ${activeTab === "Books" ? "text-orange-400" : ""}`} />
            <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button onClick={() => setSelectedComponent("Catalog")} className={navItemClass("Catalog")}>
                <BookOpen className={`w-5 h-5 ${activeTab === "Catalog" ? "text-amber-400" : ""}`} />
                <span>Catalog</span>
              </button>

              <button onClick={() => setSelectedComponent("Users")} className={navItemClass("Users")}>
                <Users className={`w-5 h-5 ${activeTab === "Users" ? "text-orange-500" : ""}`} />
                <span>Users</span>
              </button>

              <button onClick={() => dispatch(toggleAddNewAdminPopup())} className="w-full py-3 px-4 font-medium rounded-xl flex items-center space-x-3 transition-all duration-300 text-stone-300 hover:bg-white/5 hover:text-white mt-4">
                <UserPlus className="w-5 h-5" />
                <span>Add New Admin</span>
              </button>
            </>
          )}

          {isAuthenticated && user?.role === "User" && (
            <button onClick={() => setSelectedComponent("My Borrowed Books")} className={navItemClass("My Borrowed Books")}>
              <BookOpen className={`w-5 h-5 ${activeTab === "My Borrowed Books" ? "text-amber-400" : ""}`} />
              <span>My Borrowed Books</span>
            </button>
          )}

          <div className="pt-6 mt-6 border-t border-[#4A2515]/50">
            <button onClick={() => dispatch(toggleSettingPopup())} className="w-full py-3 px-4 font-medium rounded-xl flex items-center space-x-3 transition-all duration-300 text-stone-300 hover:bg-white/5 hover:text-white">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav> 

        <div className="px-6 py-6 border-t border-[#4A2515]/50 bg-[#250F08]/50">
          <button 
            className="w-full py-3 font-semibold rounded-xl bg-orange-500/10 text-orange-400 hover:bg-[#D95319] hover:text-white border border-orange-500/20 hover:border-[#D95319] hover:shadow-[0_0_15px_rgba(217,83,25,0.3)] flex items-center justify-center space-x-2 transition-all duration-300" 
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;




