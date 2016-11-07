var express = require('express');
var router = express.Router();

/* Web-app pages directory */

// Home, About, Login and Register
router.get('/', function(req, res) {
    res.render('home/home', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/login', function(req, res) {
    res.render('user-setup/login', {  // Note that .html is assumed.
        errors: ''
    });
});router.get('/register', function(req, res) {
    res.render('user-setup/register', {  // Note that .html is assumed.
        errors: ''
    });
});

// Pages for Mentee, Mentor
router.get('/ui-home', function(req, res) {
    res.render('main/basic-ui', {  // Note that .html is assumed.
        errors: ''
    });
});



// Pages for Admin


/* ============================================ */

module.exports = router;
