// // import React from "react";
// // import { Link } from "react-router-dom";

// // function SideBar() {
// //   return (
// //     <>
// //       <nav className="col-md-3 col-lg-2 d-md-block sidebar mt-5" style={{backgroundColor: "#282f50", color: "#151a37"}}>
// //         <ul className="nav flex-column">

// //           <li className="nav-item">
// //             <Link className="nav-link active" to="/">
// //               <i className="bi bi-speedometer2"></i> Dashboard
// //             </Link>
// //           </li>

// //           <li className="nav-item">
// //             <Link className="nav-link" to="/tasks">
// //               <i className="bi bi-card-list"></i> My Tasks
// //             </Link>
// //           </li>

// //           <li className="nav-item">
// //             <Link className="nav-link" to="/create">
// //               <i className="bi bi-plus-square"></i> Task Create
// //             </Link>
// //           </li>

// //           <li className="nav-item">
// //             <Link className="nav-link" to="/list">
// //               <i className="bi bi-list"></i> Task List
// //             </Link>
// //           </li>

// //           <hr />

// //           <li className="nav-item">
// //             <Link className="nav-link" to="/settings">
// //               <i className="bi bi-gear"></i> Settings
// //             </Link>
// //           </li>

// //           <li className="nav-item">
// //             <Link className="nav-link text-danger" to="/logout">
// //               <i className="bi bi-box-arrow-right"></i> Logout
// //             </Link>
// //           </li>

// //         </ul>
// //       </nav>
// //     </>
// //   );
// // }

// // export default SideBar;



// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./sidebar.css";

// function SideBar() {

//   const [open, setOpen] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isActive = (path) =>
//     location.pathname === path ? "nav-link active" : "nav-link";

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className={open ? "sidebar open" : "sidebar"}>

//       <div className="sidebar-header">
//         <h5 className={open ? "logo" : "logo hide"}>Task Manager</h5>

//         <button
//           className="toggle-btn"
//           onClick={() => setOpen(!open)}
//         >
//           <i className="bi bi-list"></i>
//         </button>
//       </div>

//       <ul className="nav flex-column">

//         <li>
//           <Link className={isActive("/dashboard")} to="/dashboard">
//             <i className="bi bi-speedometer2"></i>
//             {open && <span>Dashboard</span>}
//           </Link>
//         </li>

//         <li>
//           <Link className={isActive("/tasks")} to="/tasks">
//             <i className="bi bi-check2-square"></i>
//             {open && <span>My Tasks</span>}
//           </Link>
//         </li>

//         <li>
//           <Link className={isActive("/create")} to="/create">
//             <i className="bi bi-plus-square"></i>
//             {open && <span>Create Task</span>}
//           </Link>
//         </li>

//         <li>
//           <Link className={isActive("/list")} to="/list">
//             <i className="bi bi-list-task"></i>
//             {open && <span>Task List</span>}
//           </Link>
//         </li>

//         <li>
//           <Link className={isActive("/settings")} to="/settings">
//             <i className="bi bi-gear"></i>
//             {open && <span>Settings</span>}
//           </Link>
//         </li>
        
//         <hr />

//         <li>
//           <button className="nav-link logout" onClick={handleLogout}>
//             <i className="bi bi-box-arrow-right"></i> {open && <span>Logout</span>}
//           </button>
//         </li>

//       </ul>

//     </div>
//   );
// }

// export default SideBar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/style/sidebar.css";

const NAV_ITEMS = [
  { path: "/dashboard", icon: "⊞", label: "Dashboard" },
  { path: "/tasks",     icon: "✓", label: "My Tasks" },
  { path: "/create",    icon: "+", label: "Create Task" },
  { path: "/list",      icon: "≡", label: "Task List" },
];

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">⚡</div>
        <span className="brand-name">TaskFlow</span>
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Nav */}
      <ul className="sidebar-nav">
        {NAV_ITEMS.map(({ path, icon, label }) => (
          <li key={path}>
            <Link
              className={`nav-item ${location.pathname === path ? "active" : ""}`}
              to={path}
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
            </Link>
          </li>
        ))}

        <div className="sidebar-divider" />

        <li>
          <Link className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`} to="/settings">
            <span className="nav-icon">⚙</span>
            <span className="nav-label">Settings</span>
          </Link>
        </li>

        <li>
          <button className="nav-item logout" onClick={handleLogout}>
            <span className="nav-icon">↩</span>
            <span className="nav-label">Logout</span>
          </button>
        </li>
      </ul>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">{initials || "?"}</div>
          <div className="user-info">
            <div className="user-name">{user?.firstName} {user?.lastName}</div>
            <div className="user-role">{user?.role || "employee"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;