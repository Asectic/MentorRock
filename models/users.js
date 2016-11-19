var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new Schema(
{
	username: {
		type: String, required: true, unique: true
	},
	givenname: {
		type: String, required: true
	},
	familyname: {
		type: String, required: true
	},
	stunum:{
		type: Number, required: true, unique: true
	},
	email: {
		type: String, required: true, unique: true
	},
<<<<<<< HEAD:model-schema/users.js
	hashed: {
		type:String, required: true
	},
	salt:{
		type:String, required: true
=======
	gender: {
		type: String, required:true
	},
	hashedPassword: {
		hashed:String, salt:String
>>>>>>> origin/master:models/users.js
	},
	profilePicture:{//path to the profile picture
		type: String, default:"defaultPicture" //some default profile picture 
	},
	role: {
		type: String, required:true, //the role can be "mentee" or "mentor"
	},
<<<<<<< HEAD:model-schema/users.js
	specialty:[String],
	profilePicture:{//path to the profile picture
		type: String, default:"defaultPicture" //some default profile picture 
	},
	gender: {
		type: String, required:true
	},
=======
>>>>>>> origin/master:models/users.js
	birthday: {
		type: Date, required: true
	},

    signup_date:Date.now, //signed up date
	
	about:{
		type: String, default: "Default text" //Default text about the user
	}
			
}
{
	collection: 'users'
}
);

<<<<<<< HEAD:model-schema/users.js
mongoose.connect('mongodb://localhost/mentorDB');
=======
>>>>>>> origin/master:models/users.js

module.exports = mongoose.model('Users', userSchema);