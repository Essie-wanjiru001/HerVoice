const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  // Your logic for rendering the main home page (index.html)
  res.sendFile(path.join(__dirname, '..', 'templates', 'index.html'));
});

router.get('/home', (req, res) => {
  // Your logic for rendering the home page (Home.html)
  res.sendFile(path.join(__dirname, '..', 'templates', 'Home.html'));
});

// ... other home-related routes

module.exports = router;

