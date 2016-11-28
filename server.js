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
var formidable = require('formidable');
var fs = require('fs');
var User = require('./models/user');

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
mongoose.Promise = global.Promise;
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
    
// MENTOR APPLICATION FORM SUBMISSION
app.post('/mentorapp', function(req, res) {
        
        
        
        
    // ===================================================================    
        
        // Get the user inputted fields
        var academic = req.body.mentor_academic;
        var interests = req.body.mentor_interests;
        var exp_field = req.body.mentor_field;
        var experience = req.body.mentor_experience;
        var voluntary = req.body.mentor_voluntary;
        var additionals = req.body.mentor_additionals;
        
        // Saving db fields to variables
        var either = req.user.mentorapp.options;
        var field = req.user.mentorapp.experience_field;
        var work = req.user.mentorapp.experience_work;
        var volun = req.user.mentorapp.voluntary;
        var adds = req.user.mentorapp.additionals;
        
        // I: if academics only; II: interests only
        if((academic == null) && (interests != null)) {
            User.update(either, {$set: {'mentorapp.options': interests}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("Academics not updated");
                }
  		        else {
                    console.log("Academic interests updated");
                }
            });       
        } else if((academic != null) && (interests == null)) {
            User.update(either, {$set: {'mentorapp.options': academic}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("Interests not updated");
                }
  		        else {
                    console.log("Interests updated");
                }
            });      
        }
        
        // Now for the rest of the fieldss
        User.update(field, {$set: {'mentorapp.experience_field': exp_field}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("Experience field not updated");
                }
  		        else {
                    console.log("Experience in field updated");
                }
        });
        
       /* User.update(cover, {$set: {'mentorapp.cv': cv}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("User not updated");
                }
  		        else {
                    console.log("User icon updated");
                }
        });*/
        
        User.update(work, {$set: {'mentorapp.experience_work': experience}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("Work experience not updated");
                }
  		        else {
                    console.log("Work experience updated");
                }
        });
        
        User.update(volun, {$set: {'mentorapp.voluntary': voluntary}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("Voluntary not updated");
                }
  		        else {
                    console.log("Voluntary info updated");
                }
        });        
        
        User.update(adds, {$set: {'mentorapp.additionals': additionals}}, function(err, updated) {
  		        if( err || !updated ) {
                    console.log("Additional not updated");
                }
  		        else {
                    console.log("Additional info updated");
                }
        });
        
        // FILE UPLOADING USING FORMIDABLE
        
        var cover_letter = req.user.mentorapp.cv;
        
          // create an incoming form object
          var form = new formidable.IncomingForm();

          // specify that we want to allow the user to upload multiple files in a single request
          form.multiples = true;

          // store all uploads in the /uploads directory
          form.uploadDir = path.join(__dirname, '/uploads');

          // every time a file has been uploaded successfully,
          // rename it to it's orignal name
          form.on('file', function(field, file) {
                fs.rename(file.path, path.join(form.uploadDir, file.name));  
          });
        
          // log any errors that occur
          form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
          });

          // once all the files have been uploaded, send a response to the client
          form.on('end', function(fields, files) {
              
                /* Temporary location of our uploaded file */
                var temp_path = this.openedFiles[0].path;
              
                /* The file name of the uploaded file */
                var file_name = this.openedFiles[0].name;
              
               // mentorapp.cv paramter is update properly in DB
                User.update(cover_letter, {$set: {'mentorapp.cv': file_name}}, function(err, updated) {
                    if( err || !updated ) {
                        console.log("User not updated");
                    }
                    else {
                        console.log("User cover letter updated");
                    }
                });
                res.send(
                    '<a href="uploads/' + file_name + '"> FILE </a>'
                );
                res.end('success');       
          });

          // parse the incoming request containing the form data
          form.parse(req);
        
        // ===================================================================
    
        // After completing fields update, redirect to user's home page
        res.redirect('/profile');
        
    }); 


// routes ======================================================================

// load our routes and pass in our app and fully configured passport
// Require the configuration and the routes files, and pass
// the app and io as arguments to the returned functions.
require('./routes/routes.js')(app, passport);
require('./routes/chat-routes.js')(app, io);

require('./routes/admin-routes.js')(app, passport);
// launch ======================================================================
//app.listen(port);
console.log('MentorRock is running on port ' + port);
