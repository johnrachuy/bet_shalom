var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/views/user.html',
        failureRedirect: '/views/failure.html'
    })
);

module.exports = router;