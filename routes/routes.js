var express = require('express');
var router = express.Router();

/* Web-app pages directory */

// Home, About, Login and Register
router.get('/', function(req, res) {
    res.render('home/home', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/about', function(req, res) {
    res.render('home/about', {  // Note that .html is assumed.
        errors: ''
    });
});

// Pages for Mentee, Mentor


// Pages for Admin


/* ============================================ */

module.exports = router;
