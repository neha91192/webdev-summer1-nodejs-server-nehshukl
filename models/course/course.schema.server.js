var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
      title: String},
    {collection: 'course'});
module.exports = courseSchema;