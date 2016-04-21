var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection = require('../modules/connection');
var pg = require('pg');

//from createUserController via passportFactory
router.post('/', function(req, res, next) {

    var updateUser = {
        username: req.body.username,
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        grade: req.body.grade,
        deleted: 'false',
        users_id: req.body.users_id
    };
    console.log('update user:', updateUser);

    pg.connect(connection, function(err, client, done) {
        client.query("UPDATE users SET (username, role, first_name, last_name, phone, grade, deleted) = ($1, $2, $3, $4, $5, $6, $7) WHERE users_id = ($8)",
            [updateUser.username, updateUser.role, updateUser.first_name, updateUser.last_name, updateUser.phone, updateUser.grade, updateUser.deleted, updateUser.users_id],
            function (err, result) {
                client.end();

                if(err) {
                    console.log("Error inserting data: ", err);
                    next(err);
                } else {
                    res.redirect('/');
                }
            });
    });
});

router.get('/:username', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {

        var query = client.query('SELECT users_id FROM users WHERE username = ($1)',
            [req.params.username]);

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