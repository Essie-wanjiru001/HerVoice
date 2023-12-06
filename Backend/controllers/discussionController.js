const Discussion = require('../models/discussionModel');

exports.getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDiscussion = async (req, res) => {
    const discussion = new Discussion({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        story: req.body.story,
    });

    try {
        const newDiscussion = await discussion.save();
        res.status(201).json(newDiscussion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                user: req.body.user,
                story: req.body.story,
            },
            { new: true }
        );
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.status(200).json(discussion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

