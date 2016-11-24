var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */
var chatroom = new Schema(
    speaker1_id: {
        type: String,
        required: true
    },
    speaker2_id: {
        type: String,
        requried: true
    },
    room_id: {
        type: String,
        requried: true
    },
    chatlog: [
        {
            sender_id: {
                type: String,
                required: true
            },
            text: {
                type: String
            },
            file: {
                type: ObjectId
            },
            time: {
                time: String,
                required: true
            }
        }
    ], {
        collection: 'chatrooms'
    });

var admin = new Schema({
    user_name”: {
        type: String,
        required: true
    },
    “Password”: {“
        hashed”: {
            type: String,
            required: true
        },
        “salt”: {
            type: String,
            required: true
        }
    }

}, {
    collection: 'admins'
});

var mentee = new Schema({
    user_id: {
        type: String,
        required: true
    }
}, {
    collection: 'mentees'
});

var mentor = new Schema({
    user_id: {
        type: String,
        required: true
    },
    mentee_list[
        mentee_id: {
            type: String,
            required: true
        }
        ],
} {
    collection: 'mentors'
});

var Chat = mongoose.model('Chatrooms', chatroom);
var Admin = mongoose.model('Admin', admin);
var Mentor = mongoose.model('Mentor', mentor);
var Mentee = mongoose.model('Mentee', mentee);
// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = Chatrooms;
module.exports = Admin;
module.exports = Mentor;
module.exports = Mentee;
