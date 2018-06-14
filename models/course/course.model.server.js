var mongoose = require('mongoose');

var courseSchema = require('./course.schema.server');

var courseModel =  mongoose.model('CourseModel', courseSchema);
var sectionModel = require('../section/section.model.server');

function findAllCourses() {
    return courseModel.find();


}

module.exports = {
    findAllCourses: findAllCourses
}