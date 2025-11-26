const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/requireRole');
const Video = require('../models/Video');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/videos')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', auth, requireRole('teacher'), upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const filename = req.file ? `/uploads/videos/${req.file.filename}` : null;
    const video = await Video.create({ title, description, filename, uploadedBy: req.user.id });
    res.json({ ok: true, video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 }).populate('uploadedBy', 'name email');
  res.json(videos);
});

module.exports = router;
