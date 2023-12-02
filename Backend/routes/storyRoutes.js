const express = require('express');
const router = express.Router();

const storyController = require('../controllers/storyController');

router.get('/', storyController.getAllStories);
router.post('/', storyController.createStory);
router.get('/:id', storyController.getStory);
router.put('/:id', storyController.updateStory);
router.delete('/:id', storyController.deleteStory);

module.exports = router;
