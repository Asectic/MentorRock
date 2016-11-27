
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
        var preset_gender = req.user.gender;
        var preset_birthday = req.user.local.birthday;
        
        // LIST OF ALL "changed" input fields
        var new_user = req.body.username_new;
        var new_password = req.body.password_new;
        var new_email = req.body.email_new;
        var new_stunum = req.body.stunum_new;
        var new_familyname = req.body.familyname_new;
        var new_givenname = req.body.givenname_new;
        var new_gender = req.body.gender_new;
        var new_birthday = req.body.birthday_new;
        
        User.update(preset_user, {$set: {'local.username': new_user}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("Username updated");
                }
        });
        
        User.update(preset_password, {$set: {'local.password': new_password}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User password updated");
                }
        });
        
        User.update(preset_email, {$set: {'local.email': new_email}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User email updated");
                }
        });
        
        User.update(preset_stunum, {$set: {'local.stunum': new_stunum}}, function(err, updated) {
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
        
        User.update(preset_givenname, {$set: {givenname: new_givenname}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User first name updated");
                }
        });       
        
        User.update(preset_gender, {$set: {gender: new_gender}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User gender updated");
                }
        });
        
        User.update(preset_birthday, {$set: {'local.birthday': new_birthday}}, function(err, updated) {
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
    
    // MENTOR APPLICATION FORM SUBMISSION
    app.post('/mentorapp', function(req, res) {
        
        // Get the user inputted fields
        var academic = req.body.mentor_academic;
        var interests = req.body.mentor_interests;
        var exp_field = req.body.mentor_field;
        var cv = req.body.mentor_cv;
        var experience = req.body.mentor_experience;
        var voluntary = req.body.mentor_voluntary;
        var additionals = req.body.mentor_additionals;
        
        // Saving db fields to variables
        var either = req.user.mentorapp.options;
        var field = req.user.mentorapp.experience_field;
        var work = req.user.mentorapp.experience_work;
        var cover = req.user.mentorapp.cv;
        var volun = req.user.mentorapp.voluntary;
        var adds = req.user.mentorapp.additionals;
        
        // I: if academics only; II: interests only
        if((academic == null) && (interests != null)) {
            User.update(either, {$set: {'mentorapp.options': interests}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
            });       
        } else if((academic != null) && (interests == null)) {
            User.update(either, {$set: {'mentorapp.options': academic}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
            });      
        }
        
        // Now for the rest of the fieldss
        User.update(field, {$set: {'mentorapp.experience_field': exp_field}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
        });
        
        User.update(cover, {$set: {'mentorapp.cv': cv}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
        });
        
        User.update(work, {$set: {'mentorapp.experience_work': experience}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
        });
        
        User.update(volun, {$set: {'mentorapp.voluntary': voluntary}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
        });        
        
        User.update(adds, {$set: {'mentorapp.additionals': additionals}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
        });
        
        // After completing fields update, redirect to user's home page
        res.redirect('/profile');
        
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
