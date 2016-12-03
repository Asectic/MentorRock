var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */

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
    mentee_list:{
        mentee_id: {
            type: String,
            required: true
        }
    }
},
{
    collection: 'mentors'
});


var Mentor = mongoose.model('Mentor', mentor);
var Mentee = mongoose.model('Mentee', mentee);
// Doc for Mongoose Models: http://mongoosejs.com/docs/models

module.exports = Mentor;
module.exports = Mentee;
