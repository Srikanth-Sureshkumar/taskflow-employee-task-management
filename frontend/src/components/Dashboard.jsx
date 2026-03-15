import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import StatsCard from "../components/statsCard.jsx";
import SkeletonDashboard from "../components/SkeletonDashboard.jsx";
import logout from "../utils/logout.js";
import "../assets/style/dashboard.css";
import "../assets/style/loader.css";

const ACTIVITY = [
  { color: "#22c55e", text: <><strong>Task updated</strong> — Deploy pipeline</>,    time: "2m ago"  },
  { color: "#6c63ff", text: <><strong>Message received</strong> — From team lead</>, time: "14m ago" },
  { color: "#38bdf8", text: <><strong>Project deployed</strong> — v2.4.1 live</>,    time: "1h ago"  },
  { color: "#f59e0b", text: <><strong>Task created</strong> — UI redesign sprint</>, time: "3h ago"  },
];

const Dashboard = () => {
  const navigate   = useNavigate();
  const [loading, setLoading] = useState(true);
  const user     = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  // Simulate initial page load (replace with real data fetch if needed)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">Overview</p>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">
            Welcome back, <strong>{user?.firstName} {user?.lastName}</strong> 👋
          </p>
        </div>
        <div className="header-avatar">
          {user?.avatar
            ? <img src={user.avatar} alt="avatar" style={{ width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover" }} />
            : initials || "?"
          }
        </div>
      </div>

      {/* Stats */}
      <StatsCard />

      {/* Bottom panels */}
      <div className="dash-grid">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Recent Activity</span>
            <Link to="/tasks" className="panel-action">View all →</Link>
          </div>
          <ul className="activity-list">
            {ACTIVITY.map((item, i) => (
              <li key={i} className="activity-item">
                <span className="activity-dot" style={{ background: item.color }} />
                <span className="activity-text">{item.text}</span>
                <span className="activity-time">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Quick Actions</span>
          </div>
          <div className="quick-actions">
            <Link to="/create" className="qa-btn">
              <span className="qa-icon purple">＋</span>
              <span className="qa-label">Create New Task</span>
              <span className="qa-arrow">→</span>
            </Link>
            <Link to="/list" className="qa-btn">
              <span className="qa-icon green">≡</span>
              <span className="qa-label">View All Tasks</span>
              <span className="qa-arrow">→</span>
            </Link>
            <Link to="/settings" className="qa-btn">
              <span className="qa-icon purple">⚙</span>
              <span className="qa-label">Account Settings</span>
              <span className="qa-arrow">→</span>
            </Link>
            <button className="qa-btn danger" onClick={() => logout(navigate)}>
              <span className="qa-icon red">↩</span>
              <span className="qa-label">Logout</span>
              <span className="qa-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;