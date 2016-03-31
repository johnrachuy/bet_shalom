var express = require('express');
var router = express.Router();
var passport = require('passport');
var sendgrid  = require('sendgrid')('api key');

router.post('/', function(req, res) {
    var email     = new sendgrid.Email({
        to:       'saviohieu.n.nguyen@gmail.com',
        from:     'john.rachuy@gmail.com',
        subject:  'Hey!',
        text:     'We have the email feature working!!!!'
    });
    sendgrid.send(email, function(err, json) {

        if (err) {
            res.status(500).send();
            return console.error(err);
        }
        console.log(json);
        res.status(204).send();
    });
});

module.exports = router;