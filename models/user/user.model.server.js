var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUser(username) {
    console.log(username)
    return userModel.findOne({username: username});
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}

function editProfile(userId, user) {
    return userModel.update({_id: userId}, user);
}

function deleteProfile(userId) {
    return userModel.deleteOne({_id: userId});
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUser: findUser,
    editProfile: editProfile,
    findUserByCredentials: findUserByCredentials,
    deleteProfile: deleteProfile
};

module.exports = api;