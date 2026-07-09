// import React, { useEffect, useState } from "react";
// import settingIcon from "../assets/setting.png";
// import userIcon from "../assets/user.png";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleSettingPopup } from "../store/slices/popUpSlice";

// const Header = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   const [currentTime, setCurrentTime] = useState("")
//   const [curentDate, setCurrentDate] = useState("")

//   useEffect(() => {
//     const updateDateTime = ()=>{
//       const now = new Date();

//       const hours =now.getHours() % 12 || 12; 
//       const minutes = now.getMinutes().toString().padStart(2, "0");
//       const ampm = now.getHours() >= 12 ? "PM" : "AM";
//       setCurrentTime(`${hours}:${minutes}:${ampm}`);

//       const options = {month: "short", dat: "numeric", year: "numeric"};
//       setCurrentDate(now.toLocaleDateString("en-US", options));
//     };

//     updateDateTime();

//     const intervalId = setInterval(updateDateTime, 1000);

//     return ()=> clearInterval(intervalId);
//   }, []);

//   return <></>;

//   <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">
//     {/* LEFT SIDE */}
//     <div className="flex items-center gap-2">
//       <img src={userIcon} alt="userIcon" className="w-3 h-8"/>
//       <div className="flex flex-col">
//         <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">{user && user.name}</span>
//         <span className="text-sm font-medium sm:text-lg sm:font-medium">{user && user.role}</span>
//         {/* <span>Pandala Govind</span>
//         <span>Admin</span> */}
//       </div>
//     </div>
//     {/* RIGHT SIDE */}
//     <div className="hidden md:flex items-center gap-2">
//       <div className="fle flex-col text-sm lg:text-base items-end font-semibold">
//         <span>{currentTime}</span>
//         <span>{currentDate}</span>
//       </div>
//       <span className="bg-black h-14 w-{2px}"/>
//       <img src={settingIcon} alt="settingIcon" className="w-8 h-8" onClick={()=> dispatch(toggleSettingPopup())}/>
//     </div>
//   </header>
// };

// export default Header;

// import React, { useEffect, useState } from "react";
// import settingIcon from "../assets/setting.png";
// import userIcon from "../assets/user.png";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleSettingPopup } from "../store/slices/popUpSlice";

// const Header = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   const [currentTime, setCurrentTime] = useState("");
//   const [currentDate, setCurrentDate] = useState("");

//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();

//       const hours = now.getHours() % 12 || 12;
//       const minutes = now.getMinutes().toString().padStart(2, "0");
//       const ampm = now.getHours() >= 12 ? "PM" : "AM";
//       setCurrentTime(`${hours}:${minutes} ${ampm}`);

//       const options = { month: "short", day: "numeric", year: "numeric" };
//       setCurrentDate(now.toLocaleDateString("en-US", options));
//     };

//     updateDateTime();
//     const intervalId = setInterval(updateDateTime, 1000);
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center z-50">
//       {/* LEFT SIDE */}
//       <div className="flex items-center gap-2">
//         <img src={userIcon} alt="userIcon" className="w-3 h-8" />
//         <div className="flex flex-col">
//           <span className="text-sm font-medium sm:text-lg lg:text-xl sm:font-semibold">
//             {user?.name || "Guest"}
//           </span>
//           <span className="text-sm font-medium sm:text-lg sm:font-medium">
//             {user?.role || "User"}
//           </span>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="hidden md:flex items-center gap-4">
//         <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
//           <span>{currentTime}</span>
//           <span>{currentDate}</span>
//         </div>
//         <div className="h-10 w-[2px] bg-black mx-2" />
//         <img
//           src={settingIcon}
//           alt="settingIcon"
//           className="w-8 h-8 cursor-pointer"
//           onClick={() => dispatch(toggleSettingPopup())}
//         />
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { Settings, Clock, CalendarDays } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  return (
    <header className="absolute top-0 bg-white/80 backdrop-blur-md w-full py-4 px-6 left-0 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-slate-100 flex justify-between items-center z-40 transition-all">
      
      {/* LEFT SIDE - User Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D95319] to-[#8C2C07] flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-[#D95319]/30 border-2 border-white">
          {getInitials(user?.name)}
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
            {user?.name || "Guest User"}
          </span>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md w-fit mt-1">
            {user?.role || "User"}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE - Time & Controls */}
      <div className="hidden md:flex items-center gap-6">
        
        {/* Date & Time */}
        <div className="flex flex-col items-end mr-2">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{currentTime}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-0.5">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-[1px] bg-slate-200" />

        {/* Settings Button */}
        <button
          onClick={() => dispatch(toggleSettingPopup())}
          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-95"
          title="Account Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;

