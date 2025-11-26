import React from 'react';
import Sidebar from '../components/sidebar';

export default function TeacherDashboard(){
  const name = localStorage.getItem('name') || 'Teacher';
  return (
    <div className="app-shell">
      <Sidebar role="teacher" />
      <div style={{flex:1}}>
        <div className="header">
          <div style={{fontWeight:700}}>Welcome, {name}</div>
          <div className="topbar-right small">Teacher Panel</div>
        </div>
        <div className="main">
          <div className="grid cols-2">
            <div className="card">
              <h3>Attendance</h3>
              <p className="small">Mark attendance for your slots</p>
              <a className="btn" href="/teacher/timetable">Go to Timetable</a>
            </div>
            <div className="card">
              <h3>Uploads</h3>
              <p className="small">Upload notes & videos for students</p>
              <a className="btn" href="/teacher/notes">Upload Notes</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
