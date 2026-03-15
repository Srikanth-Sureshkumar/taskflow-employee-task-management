import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Header    from "./layouts/header.jsx";
import SideBar   from "./layouts/sideBar";
import Dashboard from "./components/Dashboard.jsx";
import Task      from "./pages/task/index.jsx";
import Create    from "./pages/task/taskCreate.jsx";
import List      from "./pages/task/taskList.jsx";
import Settings  from "./components/settings.jsx";
import Auth      from "./pages/auth/Auth.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Loader    from "./components/Loader.jsx";

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <SideBar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onCollapsedChange={setSidebarCollapsed}
      />
      <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onHamburger={() => setMobileOpen(true)}
        />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/create" element={<Create />} />
          <Route path="/list" element={<List />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const token = localStorage.getItem("token");

  /* Brief boot loader so fonts/CSS settle before paint */
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (booting) {
    return <Loader fullscreen text="Starting TaskFlow…" />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!token ? <Auth /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}