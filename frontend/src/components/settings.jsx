import React, { useState } from "react";
import axios from "axios";
import "../assets/style/settings.css";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const API = "http://localhost:5000/api/user";

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName]   = useState(user?.lastName || "");
  const [email]                   = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]         = useState("");

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put(`${API}/profile`, { firstName, lastName }, { headers: { Authorization: token } });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) { alert("Please fill all fields"); return; }
    try {
      await axios.put(`${API}/password`, { currentPassword, newPassword }, { headers: { Authorization: token } });
      setCurrentPassword(""); setNewPassword("");
      alert("Password changed successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Password change failed");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await axios.delete(`${API}/delete`, { headers: { Authorization: token } });
      localStorage.clear();
      window.location.href = "/login";
    } catch {
      alert("Account deletion failed");
    }
  };

  const Card = ({ icon, title, danger, children, footer }) => (
    <div className={`settings-card ${danger ? "danger" : ""}`}>
      <div className="settings-card-header">
        <div className="settings-card-icon">{icon}</div>
        <span className="settings-card-title">{title}</span>
      </div>
      <div className="settings-card-body">{children}</div>
      {footer && <div className="settings-card-footer">{footer}</div>}
    </div>
  );

  return (
    <div className="settings-page">
      <h1 className="settings-page-title">Settings</h1>
      <p className="settings-page-sub">Manage your account preferences and security.</p>

      <div className="settings-grid">
        {/* Profile */}
        <Card icon="👤" title="Profile Information"
          footer={<button className="btn-settings primary" onClick={handleProfileUpdate}>Update Profile</button>}
        >
          <div className="sf-group">
            <label className="sf-label">First Name</label>
            <input className="sf-input" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className="sf-group">
            <label className="sf-label">Last Name</label>
            <input className="sf-input" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <div className="sf-group">
            <label className="sf-label">Email Address</label>
            <input className="sf-input" type="email" value={email} disabled />
          </div>
        </Card>

        {/* Password */}
        <Card icon="🔒" title="Change Password"
          footer={<button className="btn-settings primary" onClick={handlePasswordChange}>Change Password</button>}
        >
          <div className="sf-group">
            <label className="sf-label">Current Password</label>
            <input className="sf-input" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password" />
          </div>
          <div className="sf-group">
            <label className="sf-label">New Password</label>
            <input className="sf-input" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" />
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <Card icon="🔔" title="Notification Preferences" footer={
        <button className="btn-settings primary">Save Preferences</button>
      }>
        <div className="check-list">
          <label className="check-item">
            <input type="checkbox" defaultChecked />
            Email Notifications — Receive updates via email
          </label>
          <label className="check-item">
            <input type="checkbox" defaultChecked />
            Task Deadline Alerts — Get reminded before tasks are due
          </label>
          <label className="check-item">
            <input type="checkbox" />
            Weekly Summary — Get a weekly digest of your progress
          </label>
        </div>
      </Card>

      {/* Danger Zone */}
      <div style={{ marginTop: 20 }}>
        <Card icon="⚠️" title="Danger Zone" danger>
          <p className="danger-desc">
            Once you delete your account, there is no going back. Please be certain before proceeding.
          </p>
          <button className="btn-settings delete" onClick={handleDeleteAccount}>
            <i class="bi bi-trash3-fill"></i> Delete Account Permanently
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;