var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatroomSchema = new Schema({
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
                type: String
            },
            time: {
                type: String
            }
        }
    ]
}, {
    collection: 'chatrooms'
});

mongoose.connect('mongodb://localhost/MentorRock');
module.exports = mongoose.model('Chatroom', chatroomSchema);
