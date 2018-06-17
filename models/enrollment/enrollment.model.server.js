var mongoose = require('mongoose');

var enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel =  mongoose.model('EnrollmentModel', enrollmentSchema);

function enrollStudentInSection(studentId, sectionId) {
    return enrollmentModel.create({student: studentId, section: sectionId});
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}



module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent
}