const express = require('express');
const router = express.Router();

//  Import the authentication middleware
const authenticateToken = require('../middleware/authMiddleware');

//  Protected Dashboard Route
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the protected dashboard!" });
});

module.exports = router;

