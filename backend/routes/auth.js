const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple hardcoded auth check
  if (username === 'coordinator' && password === 'password123') {
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;

