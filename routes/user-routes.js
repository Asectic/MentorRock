var User = require('../models/user');
var fs = require('fs');

/*
 //Inserting data from a file
 var userObj;
 fs.readFile('routes/fewUsers.json', 'utf-8', function(err, data) {
 if(err) throw err;
 userObj = JSON.parse(data);//parsing the data

 for(var i=0; i<userObj.users.length; i++){
 addNewUser(userObj.users[i]);//call the function belwo to add a new user into the database
 }
 });

*/





//Adding a new user to the database
function addNewUser(data){
    console.log("added a user");
    var newUser = new User(data);
    newUser.save(function(err, newUser) {
        if (err) throw err;
    });
};

/**
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.findAll = function(req, res) {
    if(!req.query.role&&!req.query.fullname){
        User.find({}, function(err, allUsers) {
            if (err) throw err;
            res.send(allUsers);
        });
    }else if(req.query.role != undefined) {//when searching for a "mentor" or "mentee".
        User.find({role:req.query.role}, function(err, selectedUsers) {
            if (err) throw err;
            res.send(selectedUsers);
        });

    }else if(req.query.fullname != undefined){//Find users using full name
        var fullname=req.query.fullname;
        var names = fullname.split(" ");
        console.log(fullname);
        User.find({givenname:names[0], familyname:names[1]}, function(err, selectedUsers) {
            if (err) throw err;
            res.send(selectedUsers);
        });
    }

};



///------------------------- add new user -------------------------
exports.addOne = function(req, res) {
	console.log("addOne");
    console.log(req.body);
    var userData=formatInput(req.body);
    //create the user
    var newUser = new User(userData);
    newUser.save(function(err, newUser) {
        if (err) throw err;
        res.send('Success');
    });
};

//-----------delete a users with a given id -----------------
exports.deleteOne = function(req, res) {
    console.log("deleteOne: "+req.query.id);
    User.remove( { _id : req.query.id }, function (err, user){
        if(err)throw err;
    });
};

//Apply the required format to the users input
function formatInput(data){

    var formattedData={};
    formattedData.local={};
    formattedData.local.email=data.email;
    formattedData.local.password=data.password;
    formattedData.local.username=data.username;
    formattedData.local.stunum=data.stunum;
    formattedData.local.birthday=data.birthday;
    formattedData.gender=data.gender;
    formattedData.givenname=data.givenname;
    formattedData.familyname=data.familyname;
    formattedData.thirdparty=false;
    formattedData.profilePicture="default Pic";
    formattedData.about=data.about;
    formattedData.role=data.role;
    formattedData.specialty=data.specialty;
   return formattedData;
}

exports.checkPwd = function(req, res) {
    console.log('like: ' + req.params.id);
   // TODO
   User.findOne({id: req.params.id}, function(err, thatUser) {    
      res.send(thatUser);
   });   
};

///------------------------- find user -------------------------
exports.fineById = function(req, res) {
	 // TODO
	 User.findOne({id: req.params.id}, function(err, thatUser) {		
	    res.send(thatUser);
	 });	 
};

exports.fineBySpecialty = function(req, res) {
	 // TODO
	 User.findOne({specialty: req.params.specialty}, function(err, thatUser) {		
	    res.send(thatUser);
	 });	 
};

///------------------------- update user -------------------------

exports.updateUser=function (req, res) {

    //Need to be done
    User.update({id: res.params.id}, {$set: {givenname: res.params.gname}}, function(err, updated) {
        if( err || !updated ) console.log("User not updated");
        else console.log("User updated");
    });
};
exports.updatePwd= function(req, res) {
  //TODO :  encode the pwd before send to server
	User.update({id: res.params.id}, {$set: {hashed: res.params.hashed, salt : res.params.salt}}, function(err, updated) {
  		if( err || !updated ) console.log("User not updated");
  		else console.log("User updated");
	});
};

exports.updateFname= function(req, res) {
	User.update({id: res.params.id}, {$set: {familyname: res.params.fname}}, function(err, updated) {
  		if( err || !updated ) console.log("User not updated");
  		else console.log("User updated");
	});
};

exports.updateGname= function(req, res) {
	User.update({id: res.params.id}, {$set: {givenname: res.params.gname}}, function(err, updated) {
  		if( err || !updated ) console.log("User not updated");
  		else console.log("User updated");
	});
};


exports.updateSpecialty= function(req, res) {

   User.findOne({id: req.params.id}, function(err, thatUser) {    
      if( err ) console.log("User not updated");
      else console.log("User updated");
      thatUser.specialty.push(res.params.specialty);
      thatUser.save(function(err, thatUser) {
      if (err) throw err; 
      });
      //TODO : whether to resend info
   });  
};

exports.updateMentor= function(req, res) {

   User.findOne({id: req.params.id}, function(err, thatUser) {    
      if( err ) console.log("User not updated");
      else console.log("User updated");
      thatUser.specialty.push(res.params.specialty);
      thatUser.save(function(err, thatUser) {
      if (err) throw err; 
      });
      //TODO : whether to resend info
   });  
};

