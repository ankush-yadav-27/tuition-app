import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar from '../components/sidebar';

export default function Exams({ teacherView }) {
  const [exams,setExams] = useState([]);
  const [title,setTitle] = useState('');
  const [date,setDate] = useState('');
  const [subject,setSubject] = useState('');
  const [details,setDetails] = useState('');

  useEffect(()=>{ fetchExams() },[]);

  async function fetchExams(){
    try{ const res = await api.get('/exams'); setExams(res.data); }catch(err){console.error(err)}
  }

  async function create(e){
    e.preventDefault();
    try{
      await api.post('/exams', { title, date, subject, details });
      setTitle(''); setDate(''); setSubject(''); setDetails('');
      fetchExams();
    }catch(err){alert(err?.response?.data?.error || err.message)}
  }

  const role = localStorage.getItem('role');

  return (
    <div className="app-shell">
      <Sidebar role={role} />
      <div style={{flex:1}}>
        <div className="header">
          <div style={{fontWeight:700}}>Exam Schedule</div>
          <div className="topbar-right small">Exams</div>
        </div>
        <div className="main">
          {teacherView && (
            <div className="card" style={{marginBottom:12}}>
              <h3>Upload Exam</h3>
              <form onSubmit={create}>
                <label className="label">Title</label>
                <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
                <label className="label">Date</label>
                <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
                <label className="label">Subject</label>
                <input className="input" value={subject} onChange={e=>setSubject(e.target.value)} />
                <label className="label">Details</label>
                <textarea className="input" value={details} onChange={e=>setDetails(e.target.value)} />
                <button className="btn" type="submit">Create Exam</button>
              </form>
            </div>
          )}

          <div className="card">
            <h3>Upcoming Exams</h3>
            <ul>
              {exams.map(x => (
                <li key={x._id} style={{marginBottom:8}}>
                  <strong>{x.title}</strong> <span className="small">{x.date} — {x.subject}</span>
                  <div>{x.details}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
