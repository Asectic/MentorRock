var mongoose = require('mongoose');

//This schema will be used to store the id of the users who requested to become a mentor
var requestSchema = mongoose.Schema({
        userID: {
            type: String
        }
    },
    {
        collection: 'request'
    }
);

// exporting the model
module.exports = mongoose.model('Request', requestSchema);
