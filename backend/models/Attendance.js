const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  date: String, // YYYY-MM-DD
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  present: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  absent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
module.exports = mongoose.model('Attendance', AttendanceSchema);
