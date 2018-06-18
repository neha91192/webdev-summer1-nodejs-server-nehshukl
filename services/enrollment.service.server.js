module.exports = function (app) {

    app.post('/api/section/:sectionId/enrollment',
        enrollStudentInSection);
    app.delete('/api/section/:sectionId/enrollment',
        unenrollStudentFromSection);
    app.get('/api/enrollment', findSectionsForStudent);

    var enrollmentModel = require('../models/enrollment/enrollment.model.server');
    var sectionModel = require('../models/section/section.model.server');

    function enrollStudentInSection(req, res) {
        var currentUser = req.session['currentUser'];
        var sectionId = req.params['sectionId'];

        if (currentUser !== undefined) {
            sectionModel.findSection(sectionId).then(
                section => {
                    if (section.availableSeats > 0) {
                        enrollmentModel
                            .enrollStudentInSection(
                                currentUser._id,
                                sectionId)
                            .then((response) => {
                                sectionModel.decrementSectionSeats(sectionId)
                                    .then(function (enrollment) {
                                        res.json(enrollment);
                                    })
                            });
                    } else {
                        res.sendStatus(400);
                    }
                });
        }
    }

    function findSectionsForStudent(req, res) {
        var currentUser = req.session['currentUser'];
        if(currentUser !== undefined) {
            var studentId = currentUser._id;
            enrollmentModel
                .findSectionsForStudent(studentId)
                .then(function(enrollments) {
                    res.json(enrollments);
                });
        } else {
            res.sendStatus(401);
        }

    }
    
    function unenrollStudentFromSection(req, res) {
        var currentUser = req.session['currentUser'];
        var sectionId = req.params['sectionId'];

        if(currentUser !== undefined){
            sectionModel.findSection(sectionId).then(
                section => {
                    if (section.availableSeats < section.maxSeats) {
                        enrollmentModel
                            .unenrollStudentInSection(
                                currentUser._id,
                                sectionId)
                            .then((response) => {
                                sectionModel.incrementSectionSeats(sectionId)
                                    .then(function (enrollment) {
                                        res.json(enrollment);
                                    })
                            });
                    } else {
                        res.sendStatus(400);
                    }
                });
        }


    }

};