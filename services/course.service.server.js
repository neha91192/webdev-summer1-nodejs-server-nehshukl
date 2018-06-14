module.exports = function (app) {
    app.get('/api/course', findAllCourses);

    var courseModel = require('../models/course/course.model.server');

    function findAllCourses(req, res) {
        courseModel.findAllCourses()
            .then((courses) =>
                 res.json(courses));
    }

}