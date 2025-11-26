const express = require('express');
const router = express.Router();
const QueryModel = require('../models/Query');
const auth = require('../middlewares/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { teacherId, question } = req.body;
    const q = await QueryModel.create({ studentId: req.user.id, teacherId, question });
    res.json(q);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// teacher views queries
router.get('/', auth, async (req, res) => {
  // if teacher, show their queries, if student show theirs
  if (req.user.role === 'teacher') {
    const list = await QueryModel.find({ teacherId: req.user.id }).populate('studentId', 'name email');
    return res.json(list);
  } else {
    const list = await QueryModel.find({ studentId: req.user.id }).populate('teacherId', 'name email');
    return res.json(list);
  }
});

router.post('/:id/answer', auth, async (req, res) => {
  try {
    if (req.user.role !== 'teacher') return res.status(403).json({ error: 'Forbidden' });
    const { answer } = req.body;
    const q = await QueryModel.findByIdAndUpdate(req.params.id, { answer, status: 'answered' }, { new: true });
    res.json(q);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
