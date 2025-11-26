const mongoose = require('mongoose');
const TimetableSchema = new mongoose.Schema({
  dayOfWeek: String, // e.g. Monday
  startTime: String, // e.g. "15:00"
  endTime: String,   // e.g. "16:00"
  subject: String,
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Timetable', TimetableSchema);
