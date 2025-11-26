const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // null for global
  role: { type: String, enum: ['teacher','student','all'], default: 'all' },
  title: String,
  body: String,
  link: String,
  read: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Notification', NotificationSchema);
