var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');
var connection = require('../modules/connection');
var sendgrid  = require('sendgrid')('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');

router.post('/', function(req, res) {

    function email() {
        var email     = new sendgrid.Email({
            to:       req.body.username,
            from:     'teacherapp@betshalom.org',
            subject:  'Welcome to Bet Shalom',
            text:     'Click on the link to set a password and login http://betshalom.herokuapp.com/#/password/' + req.body.token
        });
        sendgrid.send(email, function(err, json) {

            if (err) {
                res.status(500).send();
                return console.error(err);
            }
            console.log(json);
            res.status(204).send();
        });
    }

    pg.connect(connection, function(err, client, done) {
        client.query('INSERT INTO token (fk_users_id, token) VALUES ($1, $2)',
            [req.body.fk_users_id, req.body.token],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    email();
                }
            });
    });
});

router.get('/:token', function(req, res) {
    var results = [];
    console.log(req.params);

    pg.connect(connection, function(err, client, done) {

        var query = client.query('SELECT users.username FROM users JOIN token ON users.users_id = token.fk_users_id WHERE token.token = ($1)',
            [req.params.token]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            done();

            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;