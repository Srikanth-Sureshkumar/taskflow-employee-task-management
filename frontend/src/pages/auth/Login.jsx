import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BsEye, BsEyeSlash,
  BsPerson, BsPersonBadge,
  BsEnvelope, BsLock
} from "react-icons/bs";
import "../../assets/style/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [mode, setMode]               = useState("signin");
  const [role, setRole]               = useState("employee");
  const [showPassword, setShowPassword] = useState(false);

  // Signin fields
  const [loginEmail,    setLoginEmail]    = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [regEmail,  setRegEmail]  = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://taskflow-employee-task-management.onrender.com/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
        role,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !regEmail || !regPassword) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await axios.post("https://taskflow-employee-task-management.onrender.com/api/auth/register", {
        firstName,
        lastName,
        email: regEmail,
        password: regPassword,
        role,
      });
      alert("Account Created Successfully ✅");
      setMode("signin");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  const switchToSignup = () => setMode("signup");
  const switchToSignin = () => setMode("signin");

  return (
    <div className="auth-page">
      <div className={`auth-card ${mode === "signup" ? "signup-mode" : ""}`}>

        {/* ── Forms Layer ── */}
        <div className="forms-layer">

          {/* ── SIGN IN ── */}
          <div className="form-box signin-form">
            <p className="f-eyebrow">Welcome back</p>
            <h1 className="f-title">Sign In</h1>
            <p className="f-sub">Access your task dashboard.</p>

            {/* Role */}
            <p className="f-lbl">Login As</p>
            <div className="role-row">
              <div
                className={`role-chip ${role === "employee" ? "active" : ""}`}
                onClick={() => setRole("employee")}
              >
                👤 Employee
              </div>
              <div
                className={`role-chip ${role === "manager" ? "active" : ""}`}
                onClick={() => setRole("manager")}
              >
                🏢 Manager
              </div>
            </div>

            {/* Email */}
            <label className="f-lbl">Email</label>
            <div className="f-wrap">
              <span className="f-ico"><BsEnvelope /></span>
              <input
                className="f-input"
                type="email"
                placeholder="you@company.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
            </div>

            {/* Password */}
            <label className="f-lbl">Password</label>
            <div className="f-wrap">
              <span className="f-ico"><BsLock /></span>
              <input
                className="f-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <button
                className="f-ico-r"
                type="button"
                onClick={() => setShowPassword(p => !p)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>

            <button className="btn-submit" onClick={handleLogin}>
              Sign In →
            </button>

            <p className="f-note">
              Don't have an account?{" "}
              <span className="f-link" onClick={switchToSignup}>
                Create one
              </span>
            </p>
          </div>

          {/* ── SIGN UP ── */}
          <div className="form-box signup-form">
            <p className="f-eyebrow">Get started</p>
            <h1 className="f-title">Create Account</h1>
            <p className="f-sub">Join TaskFlow and stay productive.</p>

            {/* Name row */}
            <div className="name-grid">
              <div>
                <label className="f-lbl">First Name</label>
                <div className="f-wrap">
                  <span className="f-ico"><BsPerson /></span>
                  <input
                    className="f-input"
                    type="text"
                    placeholder="Alex"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="f-lbl">Last Name</label>
                <div className="f-wrap">
                  <span className="f-ico"><BsPersonBadge /></span>
                  <input
                    className="f-input"
                    type="text"
                    placeholder="Morgan"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <label className="f-lbl">Email</label>
            <div className="f-wrap">
              <span className="f-ico"><BsEnvelope /></span>
              <input
                className="f-input"
                type="email"
                placeholder="alex@company.com"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <label className="f-lbl">Password</label>
            <div className="f-wrap">
              <span className="f-ico"><BsLock /></span>
              <input
                className="f-input"
                type="password"
                placeholder="Create a strong password"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleRegister()}
              />
            </div>

            <button className="btn-submit" onClick={handleRegister}>
              Create Account →
            </button>

            <p className="f-note">
              Already have an account?{" "}
              <span className="f-link" onClick={switchToSignin}>
                Sign in
              </span>
            </p>
          </div>

        </div>

        {/* ── Slider Panel ── */}
        <div className="slider">
          <div className="slider-inner">
            <span className="slider-icon">
              {mode === "signin" ? "🚀" : "👋"}
            </span>
            <h2 className="s-title">
              {mode === "signin" ? "New here?" : "Welcome back!"}
            </h2>
            <p className="s-desc">
              {mode === "signin"
                ? "Sign up and start managing your tasks with clarity and focus."
                : "Already have an account? Sign in to pick up where you left off."}
            </p>
            <button
              className="s-cta"
              onClick={mode === "signin" ? switchToSignup : switchToSignin}
            >
              {mode === "signin" ? "Create Account" : "Sign In"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;