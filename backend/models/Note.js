const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', NoteSchema);
