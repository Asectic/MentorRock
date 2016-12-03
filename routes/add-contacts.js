var User = require('../models/user');
var data;

module.exports =  function(app, passport){

    // Access third-party User
    app.get('/userprofile', isLoggedIn, function(req, res) {
  
        var quer = req.query.id;
        
        //get user information based on the id url parameter
        User.findById(quer, function(err, userDat) {
                res.render('pages/main/user-profile', {
                    user: userDat
                });     
        });
        
    });    
    
    /*app.get('/submit-contat', isLoggedIn, function(req, res) {
        User.update(user._id, {'$push': {'contacts': req.data}, function (err, doc) {
            if( err || !updated ) {
                console.log("New contact is not added");
            }
            else {
                console.log("New contact is added");
            }
        }     
        });
    });*/
    
    app.post('/userprofile', isLoggedIn, function(req, res) {
        
        var data = req.body;
        
        console.log(data);
          
        // These are null though
        /*var name = req.body.c_name;
        var img = req.body.c_img;
        var user_id = req.body.c_id;
        
        console.log(name);
        console.log(img);
        console.log(user_id);*/
        
        var current_id = req.user._id;
        var user_id = req.body.id;
        console.log("ADDING USER WITH ID: " + user_id);
        
        // UPDATE CURRENT LOGGED IN USER'S CONTACTS
        User.update(
            {"_id": current_id},
            { "$push":
                {"contacts": 
                    data
                }
            }, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("Contact is not added");
                }
  		        else {
                    console.log("New contact is added");
                }
        }); 
        
        // UPDATE THE THIRD PARTY USER'S CONTACTS
        
        //res.redirect('/profile');
        
    });
    

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}