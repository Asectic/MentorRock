module.exports = function(app, passport, io) {

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

    app.get('/accsettings', function(req, res) {
        res.render('pages/main/acc-settings', {
            user : req.user
        });
    });

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

    // =============================================================================
    // socket io implement =============================================================
    // =============================================================================
    // Initialize a new socket.io application, named 'chat'
    var chat = io.on('connection', function (socket) {

      // When the client emits the 'load' event, reply with the
      // number of people in this chat room

      socket.on('load',function(data){

        var room = findClientsSocket(io,data);
        if(room.length === 0 ) {

          socket.emit('peopleinchat', {number: 0});
        }
        else if(room.length === 1) {

          socket.emit('peopleinchat', {
            number: 1,
            user: room[0].username,
            avatar: room[0].avatar,
            id: data
          });
        }
        else if(room.length >= 2) {

          chat.emit('tooMany', {boolean: true});
        }
      });

      // When the client emits 'login', save his name and avatar,
      // and add them to the room
      socket.on('login', function(data) {

        var room = findClientsSocket(io, data.id);
        // Only two people per room are allowed
        if (room.length < 2) {

          // Use the socket object to store data. Each client gets
          // their own unique socket object

          socket.username = data.user;
          socket.room = data.id;
          socket.avatar = gravatar.url(data.avatar, {s: '140', r: 'x', d: 'mm'});

          // Tell the person what he should use for an avatar
          socket.emit('img', socket.avatar);


          // Add the client to the room
          socket.join(data.id);

          if (room.length == 1) {

            var usernames = [],
              avatars = [];

            usernames.push(room[0].username);
            usernames.push(socket.username);

            avatars.push(room[0].avatar);
            avatars.push(socket.avatar);

            // Send the startChat event to all the people in the
            // room, along with a list of people that are in it.

            chat.in(data.id).emit('startChat', {
              boolean: true,
              id: data.id,
              users: usernames,
              avatars: avatars
            });
          }
        }
        else {
          socket.emit('tooMany', {boolean: true});
        }
      });

      // Somebody left the chat
      socket.on('disconnect', function() {

        // Notify the other person in the chat room
        // that his partner has left

        socket.broadcast.to(this.room).emit('leave', {
          boolean: true,
          room: this.room,
          user: this.username,
          avatar: this.avatar
        });

        // leave the room
        socket.leave(socket.room);
      });


      // Handle the sending of messages
      socket.on('msg', function(data){

        // When the server receives a message, it sends it to the other person in the room.
        socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user, img: data.img});
      });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}



function findClientsSocket(io,roomId, namespace) {
	var res = [],
		ns = io.of(namespace ||"/");    // the default namespace is "/"

	if (ns) {
		for (var id in ns.connected) {
			if(roomId) {
				var index = ns.connected[id].rooms.indexOf(roomId) ;
				if(index !== -1) {
					res.push(ns.connected[id]);
				}
			}
			else {
				res.push(ns.connected[id]);
			}
		}
	}
	return res;
}
