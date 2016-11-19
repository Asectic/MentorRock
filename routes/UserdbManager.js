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


exports.addOne = function(req, res) {
	console.log("addOne");
    console.log(req.body);
    var newUser = new Users(req.body);

    newUser.save(function(err, newUser) {
        if (err) throw err;
        res.send('Success');
    })
};


exports.fineById = function(req, res) {
    console.log('like: ' + req.params.id);
	 // TODO
	 User.findOne({id: req.params.id}, function(err, thatUser) {		
	    res.send(thatUser);
	 });	 
};

exports.fineBySpecialty = function(req, res) {
    console.log('like: ' + req.params.specialty);
	 // TODO
	 User.findOne({specialty: req.params.specialty}, function(err, thatUser) {		
	    res.send(thatUser);
	 });	 
};

exports.updatePwd= function(req, res) {
	User.update({id: res.params.id}, {$set: {password: res.params.pwd}}, function(err, updated) {
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


exports.deleteOne = function(req, res) {
	console.log("addOne");
    console.log(req.body);
    var newUser = new Users(req.body);

    newUser.save(function(err, newUser) {
        if (err) throw err;
        res.send('Success');
    })
};
