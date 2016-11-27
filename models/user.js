// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        email: {
            type: String,
            unique: true,
            sparse: true
        },
        password: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
            sparse: true
        },
        stunum: {
            type: String,
            unique: true,
            sparse: true
        },
        birthday: {
            type: String
        }
    },
    
    facebook: {
        id: {
            type: String,
            unique: true,
            sparse: true
        },
        token: {
            type: String
        },
        email: {
            type: String
        }
    },
    
    third_party: { type: Boolean, default: false },

    gender: { type: String },
    givenname: { type: String },
    familyname: { type: String },
    
    mentorapp: {
        options: { type: String},
        experience_field: { type: String },
        experience_work: { type: String },
        cv: { type: String },
        voluntary: { type: String },
        additionals: { type: String}
    },
    
    //type: path to the profile picture, default: default profile picture
    profilePicture: { type: String, default: "assets/img/default-profile-pic.png" },
    about: { type: String, default: "Welcome to my profile!" },
    role: { type: String, default: "Mentee" },
    specialty: [String],

    contacts: [
        {
            username: {
                type: String,
                required: true
            },
            user_id: {
                type: String
            },
            relation: {
                type: String
            }
        }
    ]
},
{
  collection: 'users'
}
);


// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
