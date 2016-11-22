// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : { type: String, unique: true},
        password     : { type: String, },
        username     : { type: String, unique: true},
        stunum       : { type: String, unique: true},
        gender       : { type: String, },
        givenname    : { type: String, },
        familyname   : { type: String, },
        birthday     : { type: String, },

        // Other parameters for user
        role: { type: String, default:"mentee"},
        specialty: [String],

        //type: path to the profile picture, default: default profile picture
        profilePicture: { type: String, default:"defaultPicture" },
        about: { type: String, default: "Default text" },
        collection: [String]
    },
    facebook         : {
        id           : { type: String, },
        token        : { type: String, },
        email        : { type: String, }
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
