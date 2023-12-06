const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourcesSchema = new Schema({
    title: String,
    description: String,
    link: String,
});

const Resources = mongoose.model('Resources', resourcesSchema);

module.exports = Resources;

