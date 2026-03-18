import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader.jsx";

const StatsCard = () => {
  const [listData, setListData] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    axios.get("https://taskflow-employee-task-management.onrender.com/api/tasks")
      .then(res => setListData(res.data.tasks))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const completeCount = listData.filter(t => t.status === "Completed").length;
  const pendingCount  = listData.filter(t => t.status === "Pending").length;
  const processCount  = listData.filter(t => t.status === "In Process").length;

  const cards = [
    { label: "Total Tasks", value: listData.length, icon: "📋", color: "blue",  trend: "All assigned tasks" },
    { label: "Completed",   value: completeCount,   icon: "✅", color: "green", trend: "Tasks finished"    },
    { label: "Pending",     value: pendingCount,    icon: "⏳", color: "amber", trend: "Awaiting action"   },
    { label: "In Process",  value: processCount,    icon: "🔄", color: "cyan",  trend: "Currently active"  },
  ];

  if (loading) {
    return (
      <div className="stats-grid">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: 120, borderRadius: 20, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="stats-grid">
      {cards.map(({ label, value, icon, color, trend }) => (
        <div key={label} className={`stat-card ${color}`}>
          <div className="stat-icon">{icon}</div>
          <div className="stat-label">{label}</div>
          <div className="stat-value">{value}</div>
          <div className="stat-trend">{trend}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;