module.exports = function (app) {

    app.post('/api/section/:sectionId/enrollment',
        enrollStudentInSection);
    app.get('/api/enrollment', findSectionsForStudent);

    var enrollmentModel = require('../models/enrollment/enrollment.model.server');
    var sectionModel = require('../models/section/section.model.server');

    function enrollStudentInSection(req, res) {
        var currentUser = req.session['currentUser'];
        var sectionId = req.params['sectionId'];

        if(currentUser !== undefined){
            enrollmentModel
                .enrollStudentInSection(
                    currentUser._id,
                    sectionId)
                .then((response) => {
                        sectionModel.decrementSectionSeats(sectionId)
                            .then(function (enrollment) {
                                res.json(enrollment);
                            })
                    })
                .catch(error => {
                    if(error.code === 11000){
                        res.sendStatus(409);
                    }
                    }
                );
        } else {
            res.sendStatus(403);
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
            res.sendStatus(404);
        }

    }

};