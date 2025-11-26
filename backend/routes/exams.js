const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');

router.post('/', auth, requireRole('teacher'), async (req, res) => {
  try {
    const exam = await Exam.create({ ...req.body, uploadedBy: req.user.id });
    res.json(exam);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', auth, async (req, res) => {
  const exams = await Exam.find().sort({ date: 1 });
  res.json(exams);
});

module.exports = router;
