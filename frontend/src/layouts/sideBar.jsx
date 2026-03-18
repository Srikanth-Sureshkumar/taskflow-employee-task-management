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