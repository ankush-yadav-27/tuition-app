import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Sidebar from '../components/sidebar';

export default function Videos({ teacherView }) {
  const [title,setTitle] = useState('');
  const [file,setFile] = useState(null);
  const [videos,setVideos] = useState([]);

  useEffect(()=>{ fetchVideos() },[]);

  async function fetchVideos(){
    try{ const res = await api.get('/videos'); setVideos(res.data); }catch(err){console.error(err)}
  }

  async function upload(e){
    e.preventDefault();
    if(!title || !file){ alert('Title & file required'); return; }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    try{
      await api.post('/videos', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      alert('Uploaded');
      setTitle(''); setFile(null);
      fetchVideos();
    }catch(err){ alert(err?.response?.data?.error || err.message) }
  }

  const role = localStorage.getItem('role');

  return (
    <div className="app-shell">
      <Sidebar role={role} />
      <div style={{flex:1}}>
        <div className="header">
          <div style={{fontWeight:700}}>Videos</div>
          <div className="topbar-right small">Lessons</div>
        </div>
        <div className="main">
          {teacherView && (
            <div className="card" style={{marginBottom:12}}>
              <h3>Upload Video</h3>
              <form onSubmit={upload}>
                <label className="label">Title</label>
                <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
                <label className="label">Choose video (mp4)</label>
                <input className="input" type="file" accept="video/*" onChange={e=>setFile(e.target.files[0])} />
                <button className="btn" type="submit">Upload</button>
              </form>
            </div>
          )}

          <div className="card">
            <h3>All Videos</h3>
            {videos.length === 0 && <p className="small">No videos found</p>}
            <ul>
              {videos.map(v => (
                <li key={v._id} style={{marginBottom:12}}>
                  <strong>{v.title}</strong> <div className="small">{v.description}</div>
                  {v.filename && (
                    <div style={{marginTop:8}}>
                      <video width="400" controls>
                        <source src={`http://localhost:4000${v.filename}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
