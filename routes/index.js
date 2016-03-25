var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
        //console.log('hi');
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log('strategy: no user');
            return res.json({
                err: info.message
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            return res.json(user);
        });
    })(req, res, next);
});

module.exports = router;