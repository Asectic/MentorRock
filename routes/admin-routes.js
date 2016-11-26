
//separate admin router
var RouteUser = require('./user-routes');

module.exports =  function(app, passport){

    //Get the admin page
    app.get('/admin', function(req, res) {
        res.render('pages/admin/base.ejs');
    });

    //The page to modify a given user's data
    app.get('/addNewUser', function(req, res) {
        res.render('pages/admin/addUser.ejs');
    });

    //find all users to display
    app.get('/users', RouteUser.findAll);


    //Update a user information
    app.post('/user', RouteUser.updateUser);

    //Add a new user
    app.post('/addUser', RouteUser.addOne);

    //Delete a user with a given id
    app.delete('/user', RouteUser.deleteOne);


};
