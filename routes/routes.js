
//var RouteUser = require('./user-routes');
var User = require('../models/user');

module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('pages/home.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/main/mentee-home.ejs', {
            user : req.user
        });
    });    
    
    app.get('/profile-facebook', isLoggedIn, function(req, res) {
        res.render('pages/main/mentee-home-facebook.ejs', {
            user : req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /* MENTORROCK PAGES */
    /* Mentee and Mentor Pages */

    app.get('/myprofile', function(req, res) {
        res.render('pages/main/my-profile', {
            user : req.user
        });
    });

    // ACCOUNT SETTINGS PAGES
    app.get('/accsettings', function(req, res) {
        res.render('pages/main/acc-settings', {
            user : req.user
        });
    });    
    
    app.get('/general-change', function(req, res) {
        res.render('pages/main/settings-general', {
            user : req.user
        });
    });    
    
    app.get('/interests-change', function(req, res) {
        res.render('pages/main/settings-interests', {
            user : req.user
        });
    });    
    
    app.get('/about-change', function(req, res) {
        res.render('pages/main/settings-about', {
            user : req.user
        });
    });
    
    // SUBMIT USER PARAMETER CHANGES TO ACC-SETTINGS
    app.post('/interests-change', function(req, res) {
        
        var preset_interests = req.user.specialty;
        var new_interests = req.body.specialty_new;
        
        User.update(preset_interests, {$set: {specialty: new_interests}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User interests updated");
                }
        });
        
        // After completing interests update, redirect page to acc-settings.ejs
        res.redirect('/accsettings');
    }); 
    
    app.post('/about-change', function(req, res) {
        var preset_about = req.user.about;
        var new_about = req.body.about_new;
        
        User.update(preset_about, {$set: {about: new_about}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User about updated");
                }
        });
        
        // After completing about update, redirect page to acc-settings.ejs
        res.redirect('/accsettings');
        
    });
    
    app.post('/general-change', function(req, res) {
        
        // GET CURRENT user.local fields
        var preset_user = req.user.local.username;
        var preset_password = req.user.local.password;
        var preset_email = req.user.local.email;
        var preset_stunum = req.user.local.stunum;
        var preset_familyname = req.user.familyname;
        var preset_givenname = req.user.givenname;
        var preset_birthday = req.user.local.birthday;
        
        // LIST OF ALL "changed" input fields
        var new_user = req.body.username_new;
        var new_password = req.body.password_new;
        var new_email = req.body.email_new;
        var new_stunum = req.body.stunum_new;
        var new_familyname = req.body.familyname_new;
        var new_givenname = req.body.givenname_new;
        var new_birthday = req.body.birthday_new;
        
        User.update(preset_user, {$set: {username: new_user}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("Username updated");
                }
        });
        
        User.update(preset_password, {$set: {password: new_password}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User password updated");
                }
        });
        
        User.update(preset_email, {$set: {email: new_email}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User email updated");
                }
        });
        
        User.update(preset_stunum, {$set: {stunum: new_stunum}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User student number updated");
                }
        });
        
        User.update(preset_familyname, {$set: {familyname: new_familyname}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User family name updated");
                }
        });
        
        User.update(preset_givenname, {$set: {stunum: new_givenname}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User first name updated");
                }
        });
        
        User.update(preset_birthday, {$set: {stunum: new_birthday}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User birthday updated");
                }
        });
        
        // After completing fields update, redirect page to acc-settings.ejs
        res.redirect('/accsettings');
        
    });
    
    // In other words, "avatar changes"
    app.post('/accsettings', function(req, res) {
        
        var preset_icon = req.user.profilePicture;
        var new_icon = req.body.profilePic_new;
        
        User.update(preset_icon, {$set: {profilePicture: new_icon}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
        });
        
        // After completing fields update, redirect page to acc-settings.ejs
        res.redirect('/accsettings');
        
    }); 
    

    // =========================================
    
    app.get('/chatslist', function(req, res) {
        res.render('pages/main/chatbox', {
            user : req.user
        });
    });

    app.get('/searchmentor', function(req, res) {
        res.render('pages/main/search-mentor', {
            user : req.user
        });
    });

    app.get('/mentorapp', function(req, res) {
        res.render('pages/main/mentor-app', {
            user : req.user
        });
    });

    app.get('/contacts', function(req, res) {
        res.render('pages/main/contacts', {
            user : req.user
        });
    });

    // ERROR PAGE FOR AUTHENTICATION
    app.get('/error', function(req, res) {
        res.render('partials/error.ejs');
    });


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('pages/user-setup/login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('pages/user-setup/register.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('pages/main/mentee-home.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });



};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
