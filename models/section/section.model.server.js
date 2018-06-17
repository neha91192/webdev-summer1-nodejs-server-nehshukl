var mongoose = require('mongoose');

var sectionSchema = require('./section.schema.server');

var sectionModel =  mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findAllSectionsForCourse(courseId){
    return sectionModel.find({courseId: courseId})
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {availableSeats: 1}
    })
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {availableSeats: -1}
    })
}

function deleteSection(sectionId) {
    return sectionModel.deleteOne({_id: sectionId});
}

function editSection(section) {
    return sectionModel.findOne({_id: section._id})
        .then((existingSection) => {
            console.log(section.maxSeats)
            console.log(existingSection.maxSeats)
            let difference = section.maxSeats - existingSection.maxSeats;
            console.log(difference);
            return sectionModel.updateMany({_id: section._id}, {$set: {name: section.name, maxSeats: section.maxSeats},
                $inc: {availableSeats: difference}}).then(newSection=> {return newSection});
            }
        );
}

module.exports = {
    createSection: createSection,
    findAllSectionsForCourse: findAllSectionsForCourse,
    incrementSectionSeats: incrementSectionSeats,
    decrementSectionSeats: decrementSectionSeats,
    deleteSection: deleteSection,
    editSection: editSection

}