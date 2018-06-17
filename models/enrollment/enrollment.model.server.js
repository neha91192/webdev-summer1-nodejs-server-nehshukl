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

function unenrollStudentInSection(studentId, sectionId) {
    return enrollmentModel.remove({student: studentId, section: sectionId});
}



module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    unenrollStudentInSection: unenrollStudentInSection
}