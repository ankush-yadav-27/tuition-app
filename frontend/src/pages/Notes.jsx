import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar from '../components/sidebar';

export default function Notes({ teacherView }) {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [file,setFile] = useState(null);
  const [notes,setNotes] = useState([]);

  useEffect(()=>{ fetchNotes() },[]);

  async function fetchNotes(){
    try{
      const res = await api.get('/notes');
      setNotes(res.data);
    }catch(err){ console.error(err) }
  }

  async function upload(e){
    e.preventDefault();
    if(!title || !file){ alert('Provide title and file'); return; }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    fd.append('description', description);
    try{
      await api.post('/notes', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      alert('Uploaded');
      setTitle(''); setDescription(''); setFile(null);
      fetchNotes();
    }catch(err){ alert(err?.response?.data?.error || err.message) }
  }

  const role = localStorage.getItem('role');

  return (
    <div className="app-shell">
      <Sidebar role={role} />
      <div style={{flex:1}}>
        <div className="header">
          <div style={{fontWeight:700}}>Notes</div>
          <div className="topbar-right small">Notes / Documents</div>
        </div>
        <div className="main">
          {teacherView && (
            <div className="card" style={{marginBottom:12}}>
              <h3>Upload Note</h3>
              <form onSubmit={upload}>
                <label className="label">Title</label>
                <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
                <label className="label">Description</label>
                <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} />
                <label className="label">Choose file (pdf/docx)</label>
                <input className="input" type="file" onChange={e=>setFile(e.target.files[0])} />
                <button className="btn" type="submit">Upload</button>
              </form>
            </div>
          )}

          <div className="card">
            <h3>All Notes</h3>
            {notes.length === 0 && <p className="small">No notes found</p>}
            <ul>
              {notes.map(n => (
                <li key={n._id} style={{marginBottom:8}}>
                  <strong>{n.title}</strong> <span className="small">by {n.uploadedBy?.name || 'Unknown'}</span>
                  <div>{n.description}</div>
                  {n.filename && <a className="small" href={`http://localhost:4000${n.filename}`} target="_blank" rel="noreferrer">Download</a>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
