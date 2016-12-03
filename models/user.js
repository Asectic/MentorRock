// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = new mongoose.Schema({
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
        // id returns a number, not a name
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

    //type: path to the profile picture, default: default profile picture
    profilePicture: { type: String, default: "assets/img/default-profile-pic.png" },
    about: { type: String, default: "Welcome to my profile!" },
    role: { type: String, default: "Mentee" },
    specialty: [String],

    contacts: [
        {
            name: {
                type: String,
                required: true
            },
            pic: {
                type: String
            },
            id: {
                type: String,
                required: true
            },
            relation: {
                type: String,
            },
            room_id: {
                type: String,
                required: true
            }
        }
    ]
}, {
    collection: 'users'
});


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


var User = mongoose.model('User', userSchema);


fewusers = [
          {
              "local": {
                  "email": "mburns0@mit.edu",
                  "password": "$2a$08$6trpe7TET3mMj89oPs9U9uCc1zhf76MPxcs7yrcJtRhovwk.mYxpq",
                  "username": "mburns0",
                  "stunum": "8050087502",
                  "birthday": "1994-4-26"
              },
              "gender": "Male",
              "givenname": "Michael",
              "familyname": "Burns",
              "thirdparty": "false",
              "profilePicture": "assets/img/users/image1.jpg",
              "about": "disintermediate one-to-one e-markets",
              "role": "mentor",
              "specialty": "Mathematics",
              "contacts": [
                  {
                      "name": "Shirley Kelley",
                      "user_id": null,
                      "relation": "mentee"
                  },
                  {
                      "name": "Carolyn Scott",
                      "user_id": null,
                      "relation": "mentee"
                  }
              ]
          },
          {
              "local": {
                  "email": "skelley1@icio.us",
                  "password": "38ac62f5b80095dc8ff3de61d4e5fe7c0f62b6a5",
                  "username": "skelley1",
                  "stunum": "3442471968",
                  "birthday": "1992-3-06"
              },
              "gender": "Female",
              "givenname": "Shirley",
              "familyname": "Kelley",
              "thirdparty": "false",
              "profilePicture": "assets/img/users/image2.jpg",
              "about": "productize magnetic convergence",
              "role": "mentee",
              "specialty": "Programming",
              "contacts": [
                  {
                      "name": "Michael Burns",
                      "user_id": null,
                      "relation": "mentor"
                  }
              ]
          },
          {
              "local": {
                  "email": "cscott2@xinhuanet.com",
                  "password": "fa31cb20abded901c9c892dca82e41881bd69da2",
                  "username": "cscott2",
                  "stunum": "7768154953",
                  "birthday": "1992-11-27"
              },
              "gender": "Female",
              "givenname": "Carolyn",
              "familyname": "Scott",
              "thirdparty": "false",
              "profilePicture": "assets/img/users/image3.jpg",
              "about": "matrix rich ROI",
              "role": "mentor",
              "specialty": "Reading",
              "contacts": [
                  {
                      "name": "Michael Burns",
                      "user_id": null,
                      "relation": "mentor"
                  }
              ]
          }
      ];

      User.collection.insert(fewusers,onInsert);

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info('%d potatoes were successfully stored.', docs.length);
    }
}
