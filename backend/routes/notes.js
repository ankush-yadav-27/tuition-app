const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const Note = require('../models/Note');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/notes')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', auth, requireRole('teacher'), upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const filename = req.file ? `/uploads/notes/${req.file.filename}` : null;
    const note = await Note.create({ title, description, filename, uploadedBy: req.user.id });
    res.json({ ok: true, note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 }).populate('uploadedBy', 'name email');
  res.json(notes);
});

module.exports = router;
