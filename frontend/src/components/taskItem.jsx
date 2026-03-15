import React, { useState, useEffect } from "react";
import axios from "axios";

function getBadge(status) {
  if (status === "Completed")  return "badge badge-completed";
  if (status === "Pending")    return "badge badge-pending";
  if (status === "In Process") return "badge badge-process";
  return "badge badge-default";
}

function TaskItem({ selectedTask, editTask, setEditTask, listData, setListData, onClose }) {
  const [tempEdit, setTempEdit] = useState(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    setTempEdit(editTask ? { ...editTask } : null);
  }, [editTask]);

  const handleCloseEdit = () => {
    setEditTask(null);
    setTempEdit(null);
  };

  const handleUpdateTask = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${tempEdit._id}`,
        tempEdit
      );
      setListData(listData.map(t => t._id === tempEdit._id ? res.data : t));
      handleCloseEdit();
      alert("Task Updated Successfully ✅");
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      alert("Failed to update task ❌");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, full, children }) => (
    <div className={`tf-group${full ? " full" : ""}`}>
      <label className="tf-label">{label}</label>
      {children}
    </div>
  );

  return (
    <>
      {/* ===== VIEW MODAL ===== */}
      {selectedTask && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">📋 Task Overview</span>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>

            <div className="modal-body">
              <div className="profile-panel">
                {/* Left */}
                <div className="profile-left">
                  <div className="profile-avatar-lg">
                    {selectedTask.empName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="profile-name">{selectedTask.empName}</div>
                  <div className="profile-role">{selectedTask.designation}</div>
                  <div className="profile-id">ID: {selectedTask.empId}</div>
                </div>

                {/* Right */}
                <div>
                  <div className="detail-label">Task Title</div>
                  <div className="detail-value">{selectedTask.title}</div>

                  <div style={{ marginTop: 12 }}>
                    <span className={getBadge(selectedTask.status)}>
                      {selectedTask.status}
                    </span>
                  </div>

                  <div className="date-row">
                    <div>
                      <div className="detail-label">Start Date</div>
                      <div className="detail-value">{selectedTask.startDate || "—"}</div>
                    </div>
                    <div>
                      <div className="detail-label">Due Date</div>
                      <div className="detail-value">{selectedTask.dueDate || "—"}</div>
                    </div>
                  </div>

                  <div className="detail-label" style={{ marginTop: 20 }}>Description</div>
                  <div className="detail-description">
                    {selectedTask.description || "No description provided."}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {tempEdit && (
        <div className="modal-overlay" onClick={handleCloseEdit}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">✏️ Edit Task</span>
              <button className="modal-close" onClick={handleCloseEdit}>✕</button>
            </div>

            <div className="modal-body">
              <div className="edit-grid">
                <Field label="Employee ID">
                  <input
                    className="tf-input"
                    value={tempEdit.empId}
                    onChange={e => setTempEdit({ ...tempEdit, empId: e.target.value })}
                  />
                </Field>

                <Field label="Employee Name">
                  <input
                    className="tf-input"
                    value={tempEdit.empName}
                    onChange={e => setTempEdit({ ...tempEdit, empName: e.target.value })}
                  />
                </Field>

                <Field label="Task Title" full>
                  <input
                    className="tf-input"
                    value={tempEdit.title}
                    onChange={e => setTempEdit({ ...tempEdit, title: e.target.value })}
                  />
                </Field>

                <Field label="Designation">
                  <input
                    className="tf-input"
                    value={tempEdit.designation}
                    onChange={e => setTempEdit({ ...tempEdit, designation: e.target.value })}
                  />
                </Field>

                <Field label="Status">
                  <select
                    className="tf-select"
                    value={tempEdit.status}
                    onChange={e => setTempEdit({ ...tempEdit, status: e.target.value })}
                  >
                    <option>Pending</option>
                    <option>In Process</option>
                    <option>Completed</option>
                  </select>
                </Field>

                <Field label="Start Date">
                  <input
                    className="tf-input"
                    type="date"
                    value={tempEdit.startDate}
                    onChange={e => setTempEdit({ ...tempEdit, startDate: e.target.value })}
                  />
                </Field>

                <Field label="Due Date">
                  <input
                    className="tf-input"
                    type="date"
                    value={tempEdit.dueDate}
                    onChange={e => setTempEdit({ ...tempEdit, dueDate: e.target.value })}
                  />
                </Field>

                <Field label="Description" full>
                  <textarea
                    className="tf-textarea"
                    value={tempEdit.description}
                    onChange={e => setTempEdit({ ...tempEdit, description: e.target.value })}
                  />
                </Field>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={handleCloseEdit}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handleUpdateTask}
                disabled={loading}
              >
                {loading
                  ? <><span className="spinner" /> Saving...</>
                  : <>✓ Save Changes</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskItem;