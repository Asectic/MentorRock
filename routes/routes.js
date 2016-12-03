// =============================================================================
// Chatroom database functions =================================================
// =============================================================================
// ===========chatroom handling functions =====================
var Chatroom = require('../models/chatroom');

function removeItem(arr, prop, val) {
    var i;
    var found = 0;
    for (i in arr) {
        if (arr[i][prop] == val) {
            found = 1;
            arr.splice(i, 1);
            break;
        }
    }
    return found;
}

function findContacts(req, res) {
    var query = require('url').parse(req.url, true).query;
    var my_id = query.myid;
    console.log('find contacts of user ' + my_id);
    User.find({
        _id: my_id
    }, function (err, data) {
        if (err) throw err;
        res.send(data.contacts);
    });
};

function postChatLog(req, res) {
    var query = require('url').parse(req.url, true).query;
    var rid = query.room;
    Chatroom.findOne({
        room_id: rid
    }, function (err, room) {
        if (err) throw err;
        room.chatlog.push(req.body);
        room.save(function (err) {
            if (err) throw err;
            console.log("add chat log");
        });
    });
    res.sendStatus(200);
}

function findChatLog(req, res) {
    var query = require('url').parse(req.url, true).query;
    var rid = query.room;
    Chatroom.findOne({
        room_id: rid
    }, function (err, room) {
        if (err) throw err;
        res.send(room.chatlog);
        //        var retdata = room.chatlog;
        //        res.send(JSON.stringify(redata));
    });
};

//var RouteUser = require('./user-routes');
var User = require('../models/user');
var Admin = require('../models/admin');
var formidable = require('formidable');
var fs = require('fs');
var RouteUser = require('./user-routes');


//================================================

module.exports = function (app, passport) {

    // normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('pages/home.ejs');
    });

    app.get('/home', isLoggedIn, function (req, res) {
        res.render('pages/home-login.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('pages/main/mentee-home.ejs', {
            user: req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', isLoggedIn, function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /* MENTORROCK PAGES */
    /* Mentee and Mentor Pages */

    app.get('/myprofile', isLoggedIn, function (req, res) {
        res.render('pages/main/my-profile', {
            user: req.user
        });
    });

    // ===============================================================

    // ACCOUNT SETTINGS PAGES
    app.get('/accsettings', isLoggedIn, function (req, res) {
        res.render('pages/main/acc-settings', {
            user: req.user
        });
    });

    app.get('/general-change', isLoggedIn, function (req, res) {
        res.render('pages/main/settings-general', {
            user: req.user
        });
    });

    app.get('/interests-change', isLoggedIn, function (req, res) {
        res.render('pages/main/settings-interests', {
            user: req.user
        });
    });

    app.get('/about-change', isLoggedIn, function (req, res) {
        res.render('pages/main/settings-about', {
            user: req.user
        });
    });

    // =====================================================

    // SUBMIT USER PARAMETER CHANGES TO ACC-SETTINGS
    app.post('/interests-change', function (req, res) {

        var new_interests = req.body;

        console.log("Id" + req.query.id);

        for (var i = 0; i < new_interests.length; i++) {
            console.log("changed interest" + new_interests[i]);
        }
        console.log("changed interest" + new_interests[1]);

        User.update({
            _id: req.query.id
        }, {
            $set: {
                specialty: new_interests.specialty
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User interests updated");
            }
        });

        // After completing interests update, redirect page to acc-settings.ejs
        res.send('success');
    });

    app.post('/about-change', function (req, res) {
        var preset_about = req.user.about;
        var new_about = req.body.about_new;

        User.update(preset_about, {
            $set: {
                about: new_about
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User about updated");
            }
        });

        // After completing about update, redirect page to acc-settings.ejs
        res.redirect('/accsettings');

    });

    app.post('/general-change', function (req, res) {

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

        // UPDATING ALL GENERAL USER FIELDS
        User.update(preset_user, {
            $set: {
                'local.username': new_user
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("Username updated");
            }
        });

        User.update(preset_password, {
            $set: {
                'local.password': new_password
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User password updated");
            }
        });

        User.update(preset_email, {
            $set: {
                'local.email': new_email
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User email updated");
            }
        });

        User.update(preset_stunum, {
            $set: {
                'local.stunum': new_stunum
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User student number updated");
            }
        });

        User.update(preset_familyname, {
            $set: {
                familyname: new_familyname
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User family name updated");
            }
        });

        User.update(preset_givenname, {
            $set: {
                givenname: new_givenname
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User first name updated");
            }
        });

        User.update(preset_gender, {
            $set: {
                gender: new_gender
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User gender updated");
            }
        });

        User.update(preset_birthday, {
            $set: {
                'local.birthday': new_birthday
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User birthday updated");
            }
        });

        // After completing fields update, redirect page to acc-settings.ejs
        res.redirect('/accsettings');

    });

    // In other words, "avatar changes"
    app.post('/accsettings', function (req, res) {

        var preset_icon = req.user.profilePicture;
        var new_icon = req.body.profilePic_new;

        User.update(preset_icon, {
            $set: {
                profilePicture: new_icon
            }
        }, function (err, updated) {
            if (err || !updated) {
                console.log("User not updated");
            } else {
                console.log("User icon updated");
            }
        });

        // After completing fields update, redirect page to acc-settings.ejs
        res.redirect('/accsettings');

    });

    // ====================================================================================

    // MORE MENTEE AND MENTOR ROUTES
    app.get('/chatslist', isLoggedIn, function (req, res) {
        var pics = [];
        var names = [];
        var contacts = req.user.contacts;
        for (var idx in contacts) {
            if (contacts.hasOwnProperty(idx)) {
                if (typeof contacts[idx].name === "undefined") {
                    break;
                }
                names.push(contacts[idx].name);
                pics.push(contacts[idx].pic);
            }
        }
        var data = {
            "my_id": req.user._id,
            "friend_id": req.user.contacts[0].id,
            "my_pic": req.user.profilePicture,
            "friend_pic": req.user.contacts[0].pic,
            "friend_name": req.user.contacts[0].name,
            "friend_names": names,
            "friend_pics": pics,
            "chatlog": []
        };

        res.render('pages/main/chatbox', data);
    });

    app.get('/chatuser', isLoggedIn, function (req, res) {
        res.send(req.user);
    });

    app.get('/chatlog', isLoggedIn, findChatLog);

    app.post('/chat', postChatLog);

    app.get('/getcontacts', isLoggedIn, findContacts);

    app.get('/searchmentor', isLoggedIn, function (req, res) {
        res.render('pages/main/search-mentor', {
            user: req.user
        });
    });

    app.get('/mentorapp', isLoggedIn, function (req, res) {
        res.render('pages/main/mentor-app', {
            user: req.user
        });

        console.log(req.body.acd);
        console.log(req.body.inter);
    });

    app.get('/contacts', isLoggedIn, function (req, res) {
        var pics = [];
        var names = [];
        var relations = [];
        var ids = [];
        var contacts = req.user.contacts;
        var my_id = req.user._id;
        for (var idx in contacts) {
            if (contacts.hasOwnProperty(idx)) {
                if (typeof contacts[idx].name === "undefined") {
                    break;
                }
                names.push(contacts[idx].name);
                pics.push(contacts[idx].pic);
                relations.push(contacts[idx].relation);
                ids.push(contacts[idx].id);
            }
        }
        var data = {
            "friend_names": names,
            "friend_pics": pics,
            "relationships": relations,
            "friend_ids": ids,
            "myid": my_id
        };
        res.render('pages/main/contacts', data);
    });

    app.post('/deletecontact', function (req, res) {
        var my_id = req.param('myid');
        var f_id = req.param('fid');
        // rm friend from my contacts
        User.findOne({
            _id: my_id
        }, function (err, user) {
            if (err) throw err;
            if (removeItem(user.contacts, "id", f_id) == 1) {
                user.save(function (err) {
                    if (err) throw err;
                });
            } else {
                console.log("Failure");
            }
        });
        // rm me from friend's contacts
        User.findOne({
            _id: f_id
        }, function (err, friend) {
            if (err) throw err;
            if (removeItem(friend.contacts, "id", my_id) == 1) {
                friend.save(function (err) {
                    if (err) throw err;
                });
            } else {
                console.log("Failure");
            }
        });
        res.send("Unfriend!");
    });

    // ERROR PAGE FOR AUTHENTICATION
    app.get('/error', function (req, res) {
        res.render('partials/error.ejs');
    });

    // ============================================
    // ADMIN LOGIN AND SIGNUP PAGES
    // ============================================

    app.get('/admin-user', function (req, res) {
        res.render('pages/user-setup/admin-user', {
            admin: req.admin
        });
    });

    // SECRET ADMIN REIGSTRATION
    app.get('/admin-secret', function (req, res) {
        res.render('pages/user-setup/admin-secret', {
            admin: req.admin
        });
    });

    // process the login form
    app.post('/admin-login', passport.authenticate('admin-login', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/admin-user', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the signup form
    app.post('/admin-signup', passport.authenticate('admin-signup', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/admin-user', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // local -----------------------------------
    app.get('/unlink/local-admin', isLoggedIn, function (req, res) {
        var admin = req.admin;
        admin.username = undefined;
        admin.password = undefined;
        admin.save(function (err) {
            res.redirect('/');
        });
    });



    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function (req, res) {
        res.render('pages/user-setup/login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function (req, res) {
        res.render('pages/user-setup/register.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function (req, res) {
        res.render('pages/main/mentee-home.ejs', {
            message: req.flash('loginMessage')
        });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', {
        scope: 'email'
    }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future


    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function (req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function (err) {
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
