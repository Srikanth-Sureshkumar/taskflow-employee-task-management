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