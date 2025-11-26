import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Icon({ name }){
  const style = {width:18,height:18};
  switch(name){
    case 'notes': return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 7h10M7 12h6M7 17h10" strokeWidth="1.6" strokeLinecap="round"/></svg>;
    case 'video': return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M23 7L16 12 23 17V7z"/><rect x="1" y="5" width="14" height="14" rx="2"/></svg>;
    case 'timetable': return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.6"/></svg>;
    case 'exams': return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l9 4.5v9L12 22 3 15.5v-9L12 2z"/><path d="M12 7v5" strokeWidth="1.6"/></svg>;
    case 'queries': return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" strokeWidth="1.4"/></svg>;
    default: return <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/></svg>;
  }
}

export default function Sidebar({ role }) {
  const nav = useNavigate();
  const loc = useLocation();
  const name = localStorage.getItem('name') || 'User';

  const links = role === 'teacher' ? [
    {to:'/teacher', label:'Dashboard', icon:'notes'},
    {to:'/teacher/notes', label:'Notes', icon:'notes'},
    {to:'/teacher/videos', label:'Videos', icon:'video'},
    {to:'/teacher/timetable', label:'Timetable', icon:'timetable'},
    {to:'/teacher/exams', label:'Exams', icon:'exams'},
    {to:'/teacher/queries', label:'Queries', icon:'queries'},
  ] : [
    {to:'/student', label:'Dashboard', icon:'notes'},
    {to:'/student/notes', label:'Notes', icon:'notes'},
    {to:'/student/videos', label:'Videos', icon:'video'},
    {to:'/student/timetable', label:'Timetable', icon:'timetable'},
    {to:'/student/exams', label:'Exams', icon:'exams'},
    {to:'/student/queries', label:'Queries', icon:'queries'},
  ];

  const logout = () => { localStorage.clear(); nav('/login'); };

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="brand">
        <div className="logo">T</div>
        <div>
          <h2>Tuition Pro</h2>
          <div className="small">Manage classes simply</div>
        </div>
      </div>

      <nav className="nav" role="navigation">
        {links.map(l => (
          <Link key={l.to} to={l.to} className={loc.pathname === l.to ? 'active' : ''} aria-current={loc.pathname === l.to ? 'page' : undefined}>
            <span className="ico"><Icon name={l.icon} /></span>
            <span style={{flex:1}}>{l.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{marginTop:'auto', paddingTop:12}}>
        <div className="small" style={{marginBottom:8}}>Signed in as</div>
        <div style={{display:'flex',alignItems:'center',gap:10,justifyContent:'space-between'}}>
          <div>
            <div style={{fontWeight:700}}>{name}</div>
            <div className="small">{role}</div>
          </div>
          <button onClick={logout} className="btn secondary" style={{fontSize:13}}>Logout</button>
        </div>
      </div>
    </aside>
  );
}
