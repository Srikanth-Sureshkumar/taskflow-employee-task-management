import React from "react";
import "../assets/style/loader.css";

const Loader = ({ fullscreen = false, text = "Loading..." }) => {
  return (
    <div className={`loader-wrap ${fullscreen ? "loader-fullscreen" : ""}`}>
      <div className="loader-box">
        {/* Spinning ring */}
        <div className="loader-ring">
          <div className="loader-ring-inner" />
        </div>

        {/* Brand icon */}
        <div className="loader-icon">⚡</div>

        {/* Text */}
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;