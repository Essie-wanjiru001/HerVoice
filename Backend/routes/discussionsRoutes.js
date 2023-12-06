const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

router.get('/discussions', discussionController.getAllDiscussions);
router.post('/discussions', discussionController.createDiscussion);
router.get('/discussions/:id', discussionController.getDiscussion);
router.put('/discussions/:id', discussionController.updateDiscussion);
router.delete('/discussions/:id', discussionController.deleteDiscussion);

module.exports = router;

