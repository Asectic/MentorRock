// =============================================================================
// Chatroom database functions =================================================
// =============================================================================
// ===========chatroom handling functions =====================
var Chatroom = require('../models/chatroom');

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
            redata = {
                "status": success
            }
            console.log("add chat log");
            res.send(JSON.stringify(redata));
        });
    });
};

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

//================================================

module.exports = function (app, passport) {

    // normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('pages/home.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('pages/main/mentee-home.ejs', {
            user: req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /* MENTORROCK PAGES */
    /* Mentee and Mentor Pages */

    app.get('/myprofile', function (req, res) {
        res.render('pages/main/my-profile', {
            user: req.user
        });
    });

    app.get('/accsettings', function (req, res) {
        res.render('pages/main/acc-settings', {
            user: req.user
        });
    });

    app.get('/chatslist', function (req, res) {
        var pics = [];
        var names = [];
        var contacts = req.user.contacts;
        console.log(req);
        for (var idx in contacts) {
            if (contacts.hasOwnProperty(idx)) {
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

    app.get('/chatuser', function (req, res) {
        res.send(req.user);
    });

    app.get('/chatlog', findChatLog);


    app.get('/chat', function (req, res) {
        var data = req.body;
        console.log(data);
        res.render('pages/main/chatbox', data);
    });

    app.post('/chat', postChatLog);

    app.get('/getcontacts', findContacts);

    app.get('/searchmentor', function (req, res) {
        res.render('pages/main/search-mentor', {
            user: req.user
        });
    });

    app.get('/mentorapp', function (req, res) {
        res.render('pages/main/mentor-app', {
            user: req.user
        });
    });

    app.get('/contacts', function (req, res) {
        res.render('pages/main/contacts', {
            user: req.user
        });
    });

    // ERROR PAGE FOR AUTHENTICATION
    app.get('/error', function (req, res) {
        res.render('partials/error.ejs');
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


    /*app.post('/login', function(req, res, next) {

      var user = req.user;

      passport.authenticate('local-login', function(err, user, info) {
        if (err) {
          return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (! user) {
          return res.send({ success : false, message : 'authentication failed' });
        }
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.send({ success : true, message : 'authentication succeeded' });
        });
      })(req, res, next);
    });*/


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
