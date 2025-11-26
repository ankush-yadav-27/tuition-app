import React from 'react';

export default function Header({ title }) {
  const name = localStorage.getItem('name') || '';

  return (
    <div className="header card" style={{alignItems:'center',display:'flex',justifyContent:'space-between'}}>
      <div className="left">
        <div style={{display:'flex',flexDirection:'column'}}>
          <div className="title">{title}</div>
          <div className="small">Manage classes, uploads & schedules</div>
        </div>
      </div>

      <div className="controls">
        <div style={{padding:'6px 10px',borderRadius:8,background:'var(--glass)',display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:13,color:'var(--muted)'}}>Signed in as</span>
          <strong style={{fontSize:14}}>{name}</strong>
        </div>
      </div>
    </div>
  );
}
