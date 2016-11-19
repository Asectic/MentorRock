var app = require('express');
var router = app.Router();

/* Web-app pages directory */

// Home, About, Login and Register
router.get('/', function(req, res) {
    res.render('pages/home');
});

router.get('/login', function(req, res) {
    res.render('pages/user-setup/login');
});

router.get('/register', function(req, res) {
    res.render('pages/user-setup/register');
});

/* Mentee and Mentor Pages */
router.get('/ui-home', function(req, res) {
    res.render('pages/main/mentee-home');
});

router.get('/myprofile', function(req, res) {
    res.render('pages/main/my-profile');
});

router.get('/accsettings', function(req, res) {
    res.render('pages/main/acc-settings');
});

router.get('/chatslist', function(req, res) {
    res.render('pages/main/chatbox');
});

router.get('/searchmentor', function(req, res) {
    res.render('pages/main/search-mentor');
});

router.get('/mentorapp', function(req, res) {
    res.render('pages/main/mentor-app');
});

router.get('/contacts', function(req, res) {
    res.render('pages/main/contacts');
});

// Pages for admin
router.get('/admin', function(req, res) {
    res.render('pages/admin/base');
});

/*
app.get('/users', api.findAllUsers);//find all users and a user with a given user name
app.post('/user', api.updateUser);
app.delete('/user', api.deleteUser);

*/

/* ============================================ */

module.exports = router;
