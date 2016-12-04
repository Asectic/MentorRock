var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var admin= new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }

}, {
    collection: 'admins'
});

var admin_data = {
  "username": "csc309TAs",
  "email" : "web@web.com",
  "password" : "$2a$08$6trpe7TET3mMj89oPs9U9uCc1zhf76MPxcs7yrcJtRhovwk.mYxpq"
};

var Admin = mongoose.model('Admin', admin);

Admin.collection.insert(admin_data,onInsert);


// generating a hash
admin .methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
admin.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

function onInsert(err, result) {
    if (err) {
      console.log(err);
        // TODO: handle error
    } else {
      console.log(result.insertedCount + " Users inserted successfully!");  //console.log(result);
    }
}

// create the model for users and expose it to our app
module.exports = mongoose.model('Admin', admin );
