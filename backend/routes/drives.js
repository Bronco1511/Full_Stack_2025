const express = require('express');
const router = express.Router();
const Drive = require('../models/drive');

router.get('/', (req, res) => {
  Drive.getAll((err, drives) => {
    if (err) res.status(500).json(err);
    else res.json(drives);
  });
});

router.post('/', (req, res) => {
  Drive.add(req.body, (err) => {
    if (err) res.status(500).json(err);
    else res.json({ success: true });
  });
});

router.put('/:id', (req, res) => {
  Drive.update(req.params.id, req.body, (err) => {
    if (err) res.status(500).json(err);
    else res.json({ success: true });
  });
});

module.exports = router;

