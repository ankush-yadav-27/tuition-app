require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const videosRoutes = require('./routes/videos');
const timetableRoutes = require('./routes/timetable');
const attendanceRoutes = require('./routes/attendance');
const examsRoutes = require('./routes/exams');
const queriesRoutes = require('./routes/queries');
const notificationsRoutes = require('./routes/notifications');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/queries', queriesRoutes);
app.use('/api/notifications', notificationsRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log('Backend running on', PORT)))
  .catch(err => console.error('MongoDB connection error', err));
