var User = require('../model-schema/users');


/**
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.findAll = function(req, res) {
    User.find({}, function(err, allUsers) {
        if (err) throw err;
        res.send(allUsers);
    });
};

///------------------------- add new user -------------------------
exports.addOne = function(req, res) {
	console.log("addOne");
    console.log(req.body);
    var newUser = new Users(req.body);

    newUser.save(function(err, newUser) {
        if (err) throw err;
        res.send('Success');
    })
};


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
exports.updatePwd= function(req, res) {
  //TODO :  encode the pwd before send to server
	User.update({id: res.params.id}, {$set: {hashed: res.params.hashed, salt : res.params.salt}}, function(err, updated) {
  		if( err || !updated ) console.log("User not updated");
  		else console.log("User updated");
	});
}

exports.updateFname= function(req, res) {
	User.update({id: res.params.id}, {$set: {familyname: res.params.fname}}, function(err, updated) {
  		if( err || !updated ) console.log("User not updated");
  		else console.log("User updated");
	});
}

exports.updateGname= function(req, res) {
	User.update({id: res.params.id}, {$set: {givenname: res.params.gname}}, function(err, updated) {
  		if( err || !updated ) console.log("User not updated");
  		else console.log("User updated");
	});
}


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
}

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
}

///------------------------- delete user -------------------------
exports.deleteOne = function(req, res) {
	console.log("deleteOne");
    Users.remove( { id : req.params.id } );
   
};
