import React from "react";
import "../assets/style/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-inner">

        {/* Left — brand */}
        <div className="footer-brand">
          <span className="footer-brand-icon">⚡</span>
          <span className="footer-brand-name">TaskFlow</span>
        </div>

        {/* Center — copyright */}
        <p className="footer-copy">
          © {year} TaskFlow. All rights reserved.
        </p>

        {/* Right — links */}
        <div className="footer-links">
          <span className="footer-link">Privacy Policy</span>
          <span className="footer-sep">·</span>
          <span className="footer-link">Terms of Use</span>
          <span className="footer-sep">·</span>
          <span className="footer-link">Support</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;