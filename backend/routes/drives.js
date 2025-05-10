const express = require('express');
const router = express.Router();
const Drive = require('../models/drive');

// GET all drives
router.get('/', (req, res) => {
  Drive.getAll((err, drives) => {
    if (err) res.status(500).json(err);
    else res.json(drives);
  });
});

// POST create a new drive with 15-day rule validation
router.post('/', (req, res) => {
  const { drive_date } = req.body;

  // Convert to date objects
  const today = new Date();
  const targetDate = new Date(drive_date);

  // Normalize time to start of day
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

  if (diffDays < 15) {
    return res.status(400).json({ error: "Drive must be scheduled at least 15 days in advance." });
  }

  Drive.add(req.body, (err) => {
    if (err) res.status(500).json(err);
    else res.json({ success: true });
  });
});

// PUT update an existing drive
router.put('/:id', (req, res) => {
  Drive.update(req.params.id, req.body, (err) => {
    if (err) res.status(500).json(err);
    else res.json({ success: true });
  });
});

module.exports = router;

