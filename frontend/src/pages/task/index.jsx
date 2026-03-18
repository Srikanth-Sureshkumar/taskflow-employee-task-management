import React from 'react';
import StatsCard from '../../components/statsCard';
import TaskList from '../../components/taskList';
import "../../assets/style/taskList.css";
import "../../assets/style/taskForm.css";

function index() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <StatsCard />
      <div style={{ marginTop: "8px" }}>
        <TaskList />
      </div>
    </div>
  );
}

export default index;
