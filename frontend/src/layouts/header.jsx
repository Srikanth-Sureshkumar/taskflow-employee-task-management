// import React from 'react';
// import "./Header.css";

// export default function Header() {
//   return (
//     <>
//     {/* Header */}
//       <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top ms-0">
//         <div class="container-fluid">
//           <a class="navbar-brand" href="#">
//             <strong><i>TaskManager</i></strong>
//           </a>
//           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
//             <span class="navbar-toggler-icon"></span>
//           </button>

//           <div class="collapse navbar-collapse" id="navbarContent">
//             <ul class="navbar-nav ms-auto">
//               <li class="nav-item ">
//                 <a class="nav-link" href="/notifications"><i className="bi bi-bell text-white"></i></a>
//               </li>
//               <li class="nav-item">
//                 <a class="nav-link text-white" href="/view-profile"><i className="bi bi-person-circle"></i> Profile</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }


import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/style/header.css";

const PAGE_NAMES = {
  "/dashboard": "Dashboard",
  "/tasks":     "My Tasks",
  "/create":    "Create Task",
  "/list":      "Task List",
  "/settings":  "Settings",
};

export default function Header() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;
  const pageName = PAGE_NAMES[location.pathname] || "TaskFlow";
  const today = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <span className="topbar-breadcrumb">
          TaskFlow / <span>{pageName}</span>
        </span>
      </div>
      <div className="topbar-right">
        <span className="topbar-date">{today}</span>
        <button className="notif-btn">
          🔔
          <span className="notif-dot" />
        </button>
        <div className="topbar-avatar">{initials}</div>
      </div>
    </nav>
  );
}