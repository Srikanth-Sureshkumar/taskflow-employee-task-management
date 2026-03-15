// // import React, { useEffect, useState } from 'react'
// // import axios from "axios";
// // import TaskItem from '../../components/taskItem';

// // const taskList = () => {
// //     const [listData, setListData] = useState ([]);
// //     const [selectedTask, setSelectedTask] = useState(null);

// //     useEffect(() => {
// //       axios.get("/task.json")
// //         .then(res => setListData(res.data.tasks))
// //         .catch(err => console.error(err));
// //     }, []);
    
// //   return (
// //     <>
// //     <div className="card shadow-sm mb-4">
// //         {/* Header */}
// //         <div className="card-header text-white d-flex justify-content-between align-items-center" style={{background: "linear-gradient(90deg, #4e54c8, #8f94fb)"}}>
// //             <h4 className="mb-0">Employee Task List</h4>            
// //         </div>

// //         <div className="card-body">

// //             {/* Search & Filter */}
// //             <div className="row mb-3">
// //                 <div className="col-md-6 mb-2">
// //                     <input type="text" className="form-control" placeholder="Search tasks..."/>
// //                 </div>
// //                 <div className="col-md-3 mb-2">
// //                     <select className="form-select">
// //                         <option>All Status</option>
// //                         <option>Completed</option>
// //                         <option>In Progress</option>
// //                         <option>Pending</option>
// //                     </select>
// //                 </div>
// //                 <div class="col-md-3 mb-2 d-flex justify-content-end">
// //                     <button className='btn btn-danger'>Delete All</button>
// //                 </div>
// //             </div>

// //             {/* Task Table */}
// //             <div className="table-responsive">
// //                 <table className="table table-hover align-middle">
// //                     <thead className="table-light">
// //                         <tr>
// //                             <th>Emp..ID</th>
// //                             <th>Emp..Name</th>
// //                             <th>Task Title</th>
// //                             <th>Status</th>
// //                             <th>Due Date</th>
// //                             <th className="text-end">Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {listData.map((tasks) => (
// //                             <tr key={tasks.id}>
// //                             <td>{tasks.id}</td>
// //                             <td>{tasks.emp_name}</td>
// //                             <td>{tasks.title}</td>
// //                             <td><span className={`badge ${tasks.status === "Pending" ? "bg-warning": 
// //                                 tasks.status === "Completed"? "bg-success" : 
// //                                 tasks.status === "In Process" ? "bg-info" : "bg-dark"}`}> {tasks.status} </span>
// //                             </td>
// //                             <td>{tasks.dueDate}</td>
// //                             <td className="text-end">
// //                                 <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onClick={() => setSelectedTask(tasks)}>
// //                                     <i class="bi bi-eye-fill"></i>
// //                                 </button>
// //                                 <button className="btn">
// //                                     <i class="bi bi-pencil-square"></i>
// //                                 </button>
// //                                 <button className="btn">
// //                                     <i class="bi bi-trash3-fill"></i>
// //                                 </button>
// //                             </td>
// //                         </tr>
// //                         ))}

// //                     </tbody>
// //                 </table>
// //             </div>

// //         </div>
// //     </div>

// //      {/* Task Modal */}
// //     <TaskItem selectedTask={selectedTask} />
// //     </>
// //   )
// // }

// // export default taskList



// import React from 'react'
// import TaskList from '../../components/taskList'

// function taskList() {
//   return (
//     <div>
//       <TaskList/>
//     </div>
//   )
// }

// export default taskList



import React from 'react';
import TaskList from '../../components/taskList';
import "../../assets/style/taskForm.css";
import "../../assets/style/taskList.css";

function taskList() {
  return (
    <div>
      <TaskList />
    </div>
  );
}

export default taskList;