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

function findStudentsForSection(sectionId) {
    return enrollmentModel
        .find({section: sectionId})
        .populate('student')
        .populate('section')
        .exec();
}

function unenrollStudentInSection(studentId, sectionId) {
    return enrollmentModel.remove({student: studentId, section: sectionId});
}

function deleteEnrollment(sectionId) {
    return enrollmentModel.remove({section: sectionId});
}



module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    unenrollStudentInSection: unenrollStudentInSection,
    deleteEnrollment: deleteEnrollment,
    findStudentsForSection: findStudentsForSection
}