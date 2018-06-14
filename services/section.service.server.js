module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection)
    app.get('/api/course/:courseId/section', findAllSectionsForCourse)
    app.delete('/api/section/:sectionId', deleteSection)
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection)

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function createSection(req, res) {
        var section = req.body;
        sectionModel.createSection(section)
            .then(function (section) {
            res.json(section);
        })
    }

    function findAllSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];

        sectionModel.findAllSectionsForCourse(courseId)
            .then(sections =>
             res.json(sections)
        );

    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session.currentUser;
        var studentId = currentUser.id;

        enrollmentModel.enrollStudentInSection(studentId, sectionId).then(function (enrollment) {
            sectionModel.decrementSectionSeats(sectionId).then(res.json(enrollment));

        });
    }

    function deleteSection(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(()=> res.send());
    }


}