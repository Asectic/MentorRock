var express = require('express');
var router = express.Router();

/* Web-app pages directory */

// Home, About, Login and Register
router.get('/', function(req, res) {
    res.render('home/home', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/home', function(req, res) {
    res.render('home/home', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/about', function(req, res) {
    res.render('home/about', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/login', function(req, res) {
    res.render('user-setup/login', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/register', function(req, res) {
    res.render('user-setup/register', {  // Note that .html is assumed.
        errors: ''
    });
});

// Pages for Mentee, Mentor
router.get('/ui-home', function(req, res) {
    res.render('main/mentee-home', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/myprofile', function(req, res) {
    res.render('main/my-profile', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/accsettings', function(req, res) {
    res.render('main/acc-settings', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/chatslist', function(req, res) {
    res.render('main/chatbox', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/searchmentor', function(req, res) {
    res.render('main/search-mentor', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/mentorapp', function(req, res) {
    res.render('main/mentor-app', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/one2one', function(req, res) {
    res.render('main/one2one', {  // Note that .html is assumed.
        errors: ''
    });
});

router.get('/contacts', function(req, res) {
    res.render('main/contacts', {  // Note that .html is assumed.
        errors: ''
    });
});

// Pages for Admin
router.get('/admin', function(req, res) {
    res.render('admin/base', {  // Note that .html is assumed.
        errors: ''
    });
});

/* ============================================ */

module.exports = router;
