import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import TaskItem from "../components/taskItem.jsx";
import Loader from "../components/Loader.jsx";
import "../assets/style/taskList.css";
import "../assets/style/taskForm.css";
import "../assets/style/loader.css";

function getBadge(status) {
  if (status === "Completed")  return "badge badge-completed";
  if (status === "Pending")    return "badge badge-pending";
  if (status === "In Process") return "badge badge-process";
  return "badge badge-default";
}
 
const TaskList = () => {
  const navigate = useNavigate();
  const [listData,      setListData]      = useState([]);
  const [statusFilter,  setStatusFilter]  = useState("All");
  const [search,        setSearch]        = useState("");
  const [selectedTask,  setSelectedTask]  = useState(null);
  const [editTask,      setEditTask]      = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [deletingId,    setDeletingId]    = useState(null);
 
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setListData(res.data.tasks))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
 
  useEffect(() => {
    document.body.style.overflow = (selectedTask || editTask) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedTask, editTask]);
 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setListData(prev => prev.filter(t => t._id !== id));
    } catch {
      alert("Error deleting task");
    } finally {
      setDeletingId(null);
    }
  };
 
  const handleClose = () => { setSelectedTask(null); setEditTask(null); };
 
  const filteredTasks = listData.filter(task => {
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    const searchMatch = task.empName?.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });
 
  return (
    <>
      <div className="task-list-page">
        <div className="task-list-card">
 
          {/* Header */}
          <div className="task-list-header">
            <div className="task-list-title">
              Employee Tasks
              {!loading && <span className="task-count-badge">{filteredTasks.length}</span>}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn btn-danger"
                onClick={() => { if (window.confirm("Delete all tasks?")) setListData([]); }}
                disabled={loading}
              >
                🗑 Clear All
              </button>
              <button className="btn btn-primary" onClick={() => navigate("/create")}>
                ＋ Add Task
              </button>
            </div>
          </div>
 
          {/* Controls */}
          <div className="task-controls">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search by employee name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                disabled={loading}
              />
            </div>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              disabled={loading}
            >
              <option>All</option>
              <option>Completed</option>
              <option>In Process</option>
              <option>Pending</option>
            </select>
          </div>
 
          {/* Table or Loader */}
          {loading ? (
            <Loader text="Fetching tasks…" />
          ) : (
            <div className="table-wrap">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>Emp. ID</th>
                    <th>Name</th>
                    <th>Task Title</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                      <tr key={task._id} style={{ opacity: deletingId === task._id ? 0.4 : 1, transition: "opacity .2s" }}>
                        <td><span className="emp-id">{task.empId}</span></td>
                        <td><span className="emp-name">{task.empName}</span></td>
                        <td><span className="task-title-cell">{task.title}</span></td>
                        <td><span className={getBadge(task.status)}>{task.status}</span></td>
                        <td><span className="due-date">{task.dueDate}</span></td>
                        <td>
                          <div className="action-cell">
                            <button className="icon-btn" title="View"
                              onClick={() => { setEditTask(null); setSelectedTask(task); }}>👁</button>
                            <button className="icon-btn" title="Edit"
                              onClick={() => { setSelectedTask(null); setEditTask(task); }}>✏️</button>
                            <button
                              className="icon-btn danger"
                              title="Delete"
                              onClick={() => handleDelete(task._id)}
                              disabled={deletingId === task._id}
                            >
                              {deletingId === task._id
                                ? <span style={{ fontSize: 11 }}>…</span>
                                : "🗑"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <div className="empty-state">
                          <div className="empty-icon">📭</div>
                          <div className="empty-title">No tasks found</div>
                          <div className="empty-sub">Try adjusting your search or filter</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
 
        </div>
      </div>
 
      <TaskItem
        selectedTask={selectedTask}
        editTask={editTask}
        setEditTask={setEditTask}
        listData={listData}
        setListData={setListData}
        onClose={handleClose}
      />
    </>
  );
};
 
export default TaskList;