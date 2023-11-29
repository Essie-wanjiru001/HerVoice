// routes.js
const express = require('express');
const router = express.Router();

// Placeholder for in-memory data store
let users = [];
let stories = [];
let mentors = [];
let discussions = [];

// User Registration
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // Perform validation and store user data
  // For simplicity, we're just pushing to an array
  users.push({ username, email, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// Story Creation
router.post('/create-story', (req, res) => {
  const { userId, title, content } = req.body;
  // Store the story data
  stories.push({ userId, title, content });
  res.status(201).json({ message: 'Story created successfully' });
});

// Mentorship
router.post('/request-mentorship', (req, res) => {
  const { menteeId, mentorId } = req.body;
  // Store mentorship request
  mentors.push({ menteeId, mentorId });
  res.status(201).json({ message: 'Mentorship requested successfully' });
});

// Discussion
router.post('/create-discussion', (req, res) => {
  const { userId, topic, content } = req.body;
  // Store discussion data
  discussions.push({ userId, topic, content });
  res.status(201).json({ message: 'Discussion created successfully' });
});

module.exports = router;
