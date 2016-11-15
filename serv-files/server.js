
'use strict';

// Call the packages!
// Make sure to install these dependencies!
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');

// Needed to setup routes and this file
var app = express();
var path = require('path');

// Set views path, template engine and default layout
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


// Routes is where all navigation pages are found in terms of server link
var routes = require('./routes/routes');

app.use('/', routes);

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// start the server
app.listen(3001);
console.log('Listening on port 3001');
