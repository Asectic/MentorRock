// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a Schema
var user = new Schema({
    // TODO: COMPLETE
    username: String,
    email: String,
    password: String,
    birthday: String,
    interests: Array,
    avatar: ObjectId
    
});

// NOTE: After defining a new Schema, can create custom methods
// my_schema.methods.method_name = function() { ... };


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', user);

// make this available to our users in our Node applications
module.exports = User;