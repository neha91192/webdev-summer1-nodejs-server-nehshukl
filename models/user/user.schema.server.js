var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    role: String
},  {collection: 'user'})

module.exports = userSchema;