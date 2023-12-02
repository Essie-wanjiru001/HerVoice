const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    title: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
    },
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
