// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Database name set to MentorRock
var configDB = require('./config/database.js');

// Initialize a new socket.io object. It is bound to
// the express app, which allows them to coexist.
var io = require('socket.io').listen(app.listen(port));


// views and public  ===============================================================

var path = require('path');

// Set views path, template engine and default layout
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for all of our ejs files
app.set('views', path.join(__dirname, 'views'));

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'MentorRock-sessions', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================

// load our routes and pass in our app and fully configured passport
// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('./routes/routes.js')(app, passport);
require('./routes/chat-routes.js')(app, io);
// launch ======================================================================
//app.listen(port);
console.log('MentorRock is running on port ' + port);
