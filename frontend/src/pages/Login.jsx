import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import '../index.css';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password, role);
        // show a friendly message then switch to login
        alert('Registration successful — please login.');
        setIsRegister(false);
        setName('');
        setPassword('');
        return;
      }
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      if (data.role === 'teacher') nav('/teacher');
      else nav('/student');
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Network error';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root">
      <div className="login-container card">
        <div className="login-grid">
          <div className="login-left">
            <div className="brand-large">
              <div className="logo-circle">T</div>
              <div>
                <div className="brand-title">Tuition Pro</div>
                <div className="brand-sub">Private tuition management</div>
              </div>
            </div>

            <div className="login-hero">
              <h2>Welcome</h2>
              <p className="small muted">Sign in to manage classes, upload notes & share videos.</p>
            </div>

            <div className="login-footer small muted">
              <div>Secure • Private • Easy to use</div>
            </div>
          </div>

          <div className="login-right">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <h3 style={{margin:0}}>{isRegister ? 'Create account' : 'Login'}</h3>
              <div className="small muted">Need help? <a href="#" onClick={e=>{ e.preventDefault(); alert('Contact the app administrator'); }}>Contact</a></div>
            </div>

            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              {isRegister && (
                <>
                  <label className="label">Full name</label>
                  <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" required />
                </>
              )}

              <label className="label">Email</label>
              <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" required />

              <label className="label">Password</label>
              <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="At least 8 characters" required minLength={8} />

              {isRegister && (
                <>
                  <label className="label">Role</label>
                  <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </>
              )}

              <div style={{display:'flex', gap:8, alignItems:'center', marginTop:6}}>
                <button className="btn" type="submit" disabled={loading}>{loading ? (isRegister ? 'Creating...' : 'Signing in...') : (isRegister ? 'Create account' : 'Login')}</button>
                <button type="button" className="btn secondary" onClick={()=>{ setIsRegister(!isRegister); setError(''); }} >
                  {isRegister ? 'Back to login' : 'Register'}
                </button>
              </div>
            </form>

            <div style={{marginTop:12, fontSize:13}} className="muted">
              By continuing you agree to our <a href="#" onClick={e=>{e.preventDefault(); alert('Terms placeholder');}}>Terms</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
