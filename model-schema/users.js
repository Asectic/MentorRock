var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new Schema(
{
	Username: {
		type: String, required: true 
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
	emailAddress: {
		type: String, required: true, unique: true
	},
	hashedPassword: {
		hashed:String, salt:String
	},
	profilePicture:{//path to the profile picture
		type: String, default:"defaultPicture" //some default profile picture 
	},
	birthday: {
		type: Date, required: true
	},
	role: String, required:true, //the role can be "mentee" or "mentor"
	specialty:{
		academic:[], interests:[]
	},
    signup_date:Date.now, //signed up date
	
	gender: {
		String, required:true
	},
	about:{
		type: String, default: "Default text" //Default text about the user
	}
			
}
{
	collection: 'users'
}
);


module.exports = mongoose.model('Users', userSchema);