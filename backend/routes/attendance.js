const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');

router.post('/', auth, requireRole('teacher'), async (req, res) => {
  try {
    const { date, slotId, present = [], absent = [] } = req.body;
    const a = await Attendance.create({ date, slotId, teacherId: req.user.id, present, absent });
    res.json(a);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', auth, async (req, res) => {
  const { date } = req.query;
  const q = date ? { date } : {};
  const rows = await Attendance.find(q).populate('present absent', 'name email');
  res.json(rows);
});

module.exports = router;
