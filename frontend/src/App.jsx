import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Notes from './pages/Notes';
import Videos from './pages/Videos';
import Timetable from './pages/Timetable';
import Exams from './pages/Exams';
import Queries from './pages/Queries';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route path="/teacher" element={
        <ProtectedRoute role="teacher">
          <TeacherDashboard />
        </ProtectedRoute>
      } />
      <Route path="/teacher/notes" element={
        <ProtectedRoute role="teacher"><Notes teacherView /></ProtectedRoute>
      } />
      <Route path="/teacher/videos" element={
        <ProtectedRoute role="teacher"><Videos teacherView /></ProtectedRoute>
      } />
      <Route path="/teacher/timetable" element={
        <ProtectedRoute role="teacher"><Timetable teacherView /></ProtectedRoute>
      } />
      <Route path="/teacher/exams" element={
        <ProtectedRoute role="teacher"><Exams teacherView /></ProtectedRoute>
      } />
      <Route path="/teacher/queries" element={
        <ProtectedRoute role="teacher"><Queries teacherView /></ProtectedRoute>
      } />

      <Route path="/student" element={
        <ProtectedRoute role="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/student/notes" element={
        <ProtectedRoute role="student"><Notes /></ProtectedRoute>
      } />
      <Route path="/student/videos" element={
        <ProtectedRoute role="student"><Videos /></ProtectedRoute>
      } />
      <Route path="/student/timetable" element={
        <ProtectedRoute role="student"><Timetable /></ProtectedRoute>
      } />
      <Route path="/student/exams" element={
        <ProtectedRoute role="student"><Exams /></ProtectedRoute>
      } />
      <Route path="/student/queries" element={
        <ProtectedRoute role="student"><Queries /></ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
