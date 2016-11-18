// load the things we need
var express = require('express');
var app = express();
var path = require('path');

// Data Parsing Modules
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');

// set the view engine to ejs
app.set('view engine', 'ejs');

// Set views path, template engine and default layout
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for all of our ejs files
app.set('views', path.join(__dirname, 'views'));

// Routes is where all navigation pages are found in terms of server link
var routes = require('./routes/routes');
app.use('/', routes);

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

/* ========================================================== */

// Set another path to model-schema
var data_path = require('./model-schema');

// Database Connection Code
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    
  // Create your schemas and models here.
  console.log('Have an open mentorDB running!');    
    
});

mongoose.connect('mongodb://localhost/mentorDB');

/* ========================================================== */

app.listen(3001);
console.log('Running MentorRock on port 3001');
