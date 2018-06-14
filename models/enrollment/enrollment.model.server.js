var mongoose = require('mongoose');

var enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel =  mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentInSection(studentId, sectionId) {
    return enrollmentModel.create({student: studentId, section: sectionId});
}


module.exports = {
    enrollStudentInSection: enrollStudentInSection
}