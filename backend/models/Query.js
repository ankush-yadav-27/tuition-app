const mongoose = require('mongoose');
const QuerySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  question: String,
  answer: String,
  status: { type: String, enum: ['open','answered'], default: 'open' }
}, { timestamps: true });
module.exports = mongoose.model('Query', QuerySchema);
