var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
    name: String,
    maxSeats: Number,
    availableSeats: Number,
        course: {type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel'},},
    {collection: 'section'});
module.exports = sectionSchema;