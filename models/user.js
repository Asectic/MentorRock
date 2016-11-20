// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : { type: String, required: true, unique: true},
        password     : { type: String, required: true},
        username     : { type: String, required: true, unique: true},
        stunum       : { type: String, required: true, unique: true},
        gender       : { type: String, required: true},
        givenname    : { type: String, required: true},
        familyname   : { type: String, required: true},
        birthday     : { type: String, required: true},
        
        // Other parameters for user
        role: { type: String, required:true},
        specialty: [String],
        
        //type: path to the profile picture, default: default profile picture 
        profilePicture: { type: String, default:"defaultPicture" },
        about: { type: String, default: "Default text" },
        collection: [String]
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
