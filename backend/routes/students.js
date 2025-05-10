const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/', (req, res) => {
  Student.getAll((err, students) => {
    if (err) res.status(500).json(err);
    else res.json(students);
  });
});

router.post('/', (req, res) => {
  Student.add(req.body, (err) => {
    if (err) res.status(500).json(err);
    else res.json({ success: true });
  });
});

router.put('/:id', (req, res) => {
  Student.updateVaccination(req.params.id, req.body, (err) => {
    if (err) res.status(500).json(err);
    else res.json({ success: true });
  });
});

router.delete('/:id', (req, res) => {
  Student.delete(req.params.id, (err) => {
    if (err) res.status(500).json(err);
    else res.json({ success: true });
  });
});

module.exports = router;

