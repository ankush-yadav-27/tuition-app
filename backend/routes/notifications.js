const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
  // fetch notifications for this user and role
  const userId = req.user.id;
  const role = req.user.role;
  const notes = await Notification.find({
    $or: [
      { userId: userId },
      { role: role },
      { role: 'all' }
    ]
  }).sort({ createdAt: -1 });
  res.json(notes);
});

module.exports = router;
