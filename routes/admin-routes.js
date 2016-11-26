
//separate admin router
var RouteUser = require('./user-routes');
var User = require('../models/user');

module.exports =  function(app, passport){

    //Get the admin page
    app.get('/admin', function(req, res) {
        res.render('pages/admin/users.ejs');
    });

    //The page to modify a given user's data
    app.get('/edit', function(req, res) {
        var userId=req.query.id;

        User.findOne({_id: userId}, function(err, userData) {

            res.render('pages/admin/edit.ejs', {user:userData});
        });

    });

    //Find the mentor requests
    app.get('/mrequests', RouteUser.findMentorRequest);

    //find all users to display
    app.get('/users', RouteUser.findAll);


    //Update a user information
    app.post('/user', RouteUser.updateUser);

    //Add a new user
    app.post('/addUser', RouteUser.addOne);

    //Delete a user with a given id
    app.delete('/user', RouteUser.deleteOne);

    //Accept a mentor request and remove form the request database
    app.delete('/acceptmentor', RouteUser.acceptMentorReq);

    //Reject a mentor request and remove form the request database
    app.delete('/rejectmentor', RouteUser.rejectMentorReq);

    //The page displaying the page to add a user
    app.get('/adduser', function (req, res) {

       res.render('pages/admin/adduser.ejs')
    });

    //The following sends the list of specialities
    app.get('/speciality', RouteUser.findSpeciality);
    //The page displaying the mentors
    app.get('/managementors', function (req, res) {

       res.render('pages/admin/managementors.ejs')
    });
    //The page displaying the
    app.get('/mentorrequest', function (req, res) {

       res.render('pages/admin/mentorrequest.ejs')
    });


};
