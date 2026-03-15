import React, { useState } from "react";
import axios from "axios";
import "../assets/style/taskForm.css";
import "../assets/style/loader.css";

const INIT = {
  empId: "", empName: "", title: "", description: "",
  designation: "", status: "", startDate: "", dueDate: ""
};

function TaskForm({ setListData }) {
  const [formData, setFormData] = useState(INIT);
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.empId)       e.empId       = "Employee ID is required";
    if (!formData.empName)     e.empName     = "Employee Name is required";
    if (!formData.title)       e.title       = "Task Title is required";
    if (!formData.designation) e.designation = "Designation is required";
    if (!formData.status)      e.status      = "Status is required";
    if (!formData.startDate)   e.startDate   = "Start Date is required";
    if (!formData.dueDate)     e.dueDate     = "Due Date is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/tasks", formData);
      if (setListData) setListData(p => [...p, res.data]);

      // Show success state briefly
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2200);

      setFormData(INIT);
      setErrors({});
    } catch {
      alert("Failed to create task ❌");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ name, label, children }) => (
    <div className="tf-group">
      <label className="tf-label">{label}</label>
      {children}
      {errors[name] && <span className="tf-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="task-form-page">
      <div className="task-form-card">

        <div className="task-form-header">
          <div className="task-form-header-icon">📋</div>
          <div>
            <h2>Assign Employee Task</h2>
            <p>Fill in the details to create a new task assignment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="task-form-body">

            <div className="form-row">
              <Field name="empId" label="Employee ID">
                <input className="tf-input" name="empId" value={formData.empId} onChange={handleChange} placeholder="EMP-001" />
              </Field>
              <Field name="empName" label="Employee Name">
                <input className="tf-input" name="empName" value={formData.empName} onChange={handleChange} placeholder="John Doe" />
              </Field>
            </div>

            <div className="form-row single">
              <Field name="title" label="Task Title">
                <input className="tf-input" name="title" value={formData.title} onChange={handleChange} placeholder="Redesign landing page" />
              </Field>
            </div>

            <div className="form-row single">
              <Field name="description" label="Description">
                <textarea className="tf-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Provide task details and expectations…" />
              </Field>
            </div>

            <div className="form-row">
              <Field name="designation" label="Designation">
                <select className="tf-select" name="designation" value={formData.designation} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>UI/UX Designer</option>
                  <option>PHP Developer</option>
                </select>
              </Field>
              <Field name="status" label="Status">
                <select className="tf-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="">Select Status</option>
                  <option>Completed</option>
                  <option>In Process</option>
                  <option>Pending</option>
                </select>
              </Field>
            </div>

            <div className="form-row">
              <Field name="startDate" label="Start Date">
                <input className="tf-input" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
              </Field>
              <Field name="dueDate" label="Due Date">
                <input className="tf-input" type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
              </Field>
            </div>

          </div>

          <div className="task-form-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => { setFormData(INIT); setErrors({}); }}
              disabled={loading}
            >
              Reset
            </button>

            <button type="submit" className="btn btn-primary" disabled={loading || success}>
              {loading ? (
                <>
                  <span className="spinner" />
                  Creating…
                </>
              ) : success ? (
                <>✅ Task Created!</>
              ) : (
                <>＋ Create Task</>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default TaskForm;