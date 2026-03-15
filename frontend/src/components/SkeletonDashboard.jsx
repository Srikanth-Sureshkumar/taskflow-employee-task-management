import React from "react";
import "../assets/style/loader.css";

/* Reusable skeleton block */
const Sk = ({ w = "100%", h = 16, r = 8, mb = 0 }) => (
  <div
    className="skeleton"
    style={{ width: w, height: h, borderRadius: r, marginBottom: mb }}
  />
);

const SkeletonDashboard = () => (
  <div className="skeleton-page">

    {/* Header */}
    <div className="skeleton-header">
      <div style={{ flex: 1 }}>
        <Sk w={80}  h={10} mb={10} />
        <Sk w={200} h={36} r={10} mb={10} />
        <Sk w={160} h={14} />
      </div>
      <Sk w={52} h={52} r="50%" />
    </div>

    {/* Stats */}
    <div className="skeleton-stats">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ height: 120, borderRadius: 20, animationDelay: `${i * 0.08}s` }}
        />
      ))}
    </div>

    {/* Bottom grid */}
    <div className="skeleton-grid">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 260, borderRadius: 20, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>

  </div>
);

export default SkeletonDashboard;