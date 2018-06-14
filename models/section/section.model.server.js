var mongoose = require('mongoose');

var sectionSchema = require('./section.schema.server');

var sectionModel =  mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findAllSectionsForCourse(courseId){
    return sectionModel.find({course: courseId})
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: 1}
    })
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    })
}

function deleteSection(sectionId) {
    return sectionModel.deleteOne({_id: sectionId});
}

module.exports = {
    createSection: createSection,
    findAllSectionsForCourse: findAllSectionsForCourse,
    incrementSectionSeats: incrementSectionSeats,
    decrementSectionSeats: decrementSectionSeats,
    deleteSection: deleteSection

}