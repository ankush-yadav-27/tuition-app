import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar from '../components/sidebar';

export default function Timetable({ teacherView }) {
  const [slots,setSlots] = useState([]);
  const [dayOfWeek,setDay] = useState('Monday');
  const [start,setStart] = useState('');
  const [end,setEnd] = useState('');
  const [subject,setSubject] = useState('');

  useEffect(()=>{ fetchSlots() },[]);

  async function fetchSlots(){
    try{ const res = await api.get('/timetable'); setSlots(res.data); }catch(err){console.error(err)}
  }

  async function addSlot(e){
    e.preventDefault();
    try{
      await api.post('/timetable', { dayOfWeek: dayOfWeek, startTime: start, endTime: end, subject });
      setSubject(''); setStart(''); setEnd('');
      fetchSlots();
    }catch(err){alert(err?.response?.data?.error || err.message)}
  }

  const role = localStorage.getItem('role');

  return (
    <div className="app-shell">
      <Sidebar role={role} />
      <div style={{flex:1}}>
        <div className="header">
          <div style={{fontWeight:700}}>Timetable</div>
          <div className="topbar-right small">Schedule</div>
        </div>
        <div className="main">
          {teacherView && (
            <div className="card" style={{marginBottom:12}}>
              <h3>Create Slot</h3>
              <form onSubmit={addSlot}>
                <label className="label">Day</label>
                <select className="input" value={dayOfWeek} onChange={e=>setDay(e.target.value)}>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map(d=> <option key={d} value={d}>{d}</option>)}
                </select>
                <label className="label">Start time (HH:MM)</label>
                <input className="input" value={start} onChange={e=>setStart(e.target.value)} placeholder="15:00" />
                <label className="label">End time</label>
                <input className="input" value={end} onChange={e=>setEnd(e.target.value)} placeholder="16:00" />
                <label className="label">Subject</label>
                <input className="input" value={subject} onChange={e=>setSubject(e.target.value)} />
                <button className="btn" type="submit">Add Slot</button>
              </form>
            </div>
          )}

          <div className="card">
            <h3>All Slots</h3>
            <ul>
              {slots.map(s => (
                <li key={s._id} style={{marginBottom:8}}>
                  <strong>{s.subject}</strong> <span className="small">{s.dayOfWeek} {s.startTime} - {s.endTime}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
