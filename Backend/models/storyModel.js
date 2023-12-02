const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
