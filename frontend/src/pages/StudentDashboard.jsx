import React from 'react';
import Sidebar from '../components/sidebar';

export default function StudentDashboard(){
  const name = localStorage.getItem('name') || 'Student';
  return (
    <div className="app-shell">
      <Sidebar role="student" />
      <div style={{flex:1}}>
        <div className="header">
          <div style={{fontWeight:700}}>Welcome, {name}</div>
          <div className="topbar-right small">Student Panel</div>
        </div>
        <div className="main">
          <div className="grid cols-2">
            <div className="card">
              <h3>Notes</h3>
              <p className="small">Access notes uploaded by teachers</p>
              <a className="btn" href="/student/notes">See Notes</a>
            </div>
            <div className="card">
              <h3>Timetable</h3>
              <p className="small">View your class timetable & notifications</p>
              <a className="btn" href="/student/timetable">View Timetable</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
