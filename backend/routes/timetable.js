const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const Notification = require('../models/Notification');

router.post('/', auth, requireRole('teacher'), async (req, res) => {
  try {
    const slot = await Timetable.create({ ...req.body, teacherId: req.user.id });
    res.json(slot);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', auth, async (req, res) => {
  const slots = await Timetable.find().populate('teacherId', 'name');
  res.json(slots);
});

router.put('/:id', auth, requireRole('teacher'), async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // create a notification for students (role=student)
    await Notification.create({
      role: 'student',
      title: 'Timetable changed',
      body: `Slot ${updated.subject} changed on ${updated.dayOfWeek} ${updated.startTime}-${updated.endTime}`,
      link: '/timetable'
    });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, requireRole('teacher'), async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
