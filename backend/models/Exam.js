const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
  title: String,
  date: String, // YYYY-MM-DD
  subject: String,
  details: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Exam', ExamSchema);
