var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    name: String,
    maxSeats: Number,
    availableSeats: Number,
    courseId: Number},
    {collection: 'section'});
module.exports = sectionSchema;