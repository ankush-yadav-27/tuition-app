import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar from '../components/sidebar';

export default function Queries({ teacherView }) {
  const [teacherId, setTeacherId] = useState('');
  const [question, setQuestion] = useState('');
  const [list, setList] = useState([]);
  const [answer, setAnswer] = useState('');

  useEffect(()=>{ fetchList() },[]);

  async function fetchList(){
    try{
      const res = await api.get('/queries');
      setList(res.data);
    }catch(err){console.error(err)}
  }

  async function create(e){
    e.preventDefault();
    if(!teacherId || !question){ alert('teacherId and question'); return; }
    try{
      await api.post('/queries', { teacherId, question });
      setQuestion('');
      fetchList();
    }catch(err){alert(err?.response?.data?.error || err.message)}
  }

  async function answerQuery(id){
    try{
      await api.post(`/queries/${id}/answer`, { answer });
      setAnswer('');
      fetchList();
    }catch(err){alert(err?.response?.data?.error || err.message)}
  }

  const role = localStorage.getItem('role');

  return (
    <div className="app-shell">
      <Sidebar role={role} />
      <div style={{flex:1}}>
        <div className="header">
          <div style={{fontWeight:700}}>Queries</div>
          <div className="topbar-right small">Questions & Answers</div>
        </div>
        <div className="main">
          {!teacherView && (
            <div className="card" style={{marginBottom:12}}>
              <h3>Ask a Question</h3>
              <form onSubmit={create}>
                <label className="label">Teacher ID</label>
                <input className="input" value={teacherId} onChange={e=>setTeacherId(e.target.value)} placeholder="paste teacherId here" />
                <label className="label">Question</label>
                <textarea className="input" value={question} onChange={e=>setQuestion(e.target.value)} />
                <button className="btn" type="submit">Send Question</button>
              </form>
            </div>
          )}

          <div className="card">
            <h3>List</h3>
            {list.map(q => (
              <div key={q._id} style={{marginBottom:12}}>
                <div><strong>Q:</strong> {q.question}</div>
                <div className="small">From: {q.studentId?.name || q.studentId}</div>
                <div><strong>A:</strong> {q.answer || <em>Not answered</em>}</div>
                {teacherView && q.status !== 'answered' && (
                  <div style={{marginTop:8}}>
                    <textarea className="input" value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Write answer..." />
                    <button className="btn" onClick={()=>answerQuery(q._id)}>Answer</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
