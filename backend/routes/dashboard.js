const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  const dashboardData = {
    total_students: 0,
    vaccinated_students: 0,
    percentage_vaccinated: 0,
    upcoming_drives: []
  };

  db.get('SELECT COUNT(*) AS count FROM students', [], (err, row) => {
    if (err) return res.status(500).json({ error: "Error fetching student count" });

    dashboardData.total_students = row.count;

    db.get('SELECT COUNT(*) AS count FROM students WHERE vaccinated = 1', [], (err2, row2) => {
      if (err2) return res.status(500).json({ error: "Error fetching vaccinated count" });

      dashboardData.vaccinated_students = row2.count;
      dashboardData.percentage_vaccinated = row.count === 0 ? 0 : Math.round((row2.count / row.count) * 100);

      db.all('SELECT vaccine_name, drive_date FROM drives WHERE drive_date >= ?', [today], (err3, rows) => {
        if (err3) return res.status(500).json({ error: "Error fetching upcoming drives" });

        dashboardData.upcoming_drives = rows;
        res.json(dashboardData);
      });
    });
  });
});

module.exports = router;

