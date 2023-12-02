const Story = require('../models/storyModel');

// Get all stories
exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new story
exports.createStory = async (req, res) => {
    const story = new Story({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
    });

    try {
        const newStory = await story.save();
        res.status(201).json(newStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a single story
exports.getStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a story
exports.updateStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                user: req.body.user,
            },
            { new: true }
        );
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a story
exports.deleteStory = async (req, res) => {
    try {
        const story = await Story.findByIdAndDelete(req.params.id);
        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
