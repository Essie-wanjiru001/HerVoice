const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');

// Routes for stories
router.get('/stories', storyController.getAllStories);
router.post('/stories', storyController.createStory);
router.get('/stories/:id', storyController.getStory);
router.put('/stories/:id', storyController.updateStory);
router.delete('/stories/:id', storyController.deleteStory);

module.exports = router;

