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
	gender: {
		type: String, required:true
	},
	hashedPassword: {
		hashed:String, salt:String
	},
	profilePicture:{//path to the profile picture
		type: String, default:"defaultPicture" //some default profile picture 
	},
	role: {
		type: String, required:true, //the role can be "mentee" or "mentor"
	}
	specialty:{
		academic:[], interests:[]
	},
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


module.exports = mongoose.model('Users', userSchema);