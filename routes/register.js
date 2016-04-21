var express = require('express');
var router = express.Router();
var passport = require('passport');

// module with bcrypt functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {

    var saveUser = {
        username: req.body.username,
        password: encryptLib.encryptPassword(req.body.password),
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        grade: req.body.grade,
        deleted: 'false'
    };
    console.log('new user:', saveUser);

    pg.connect(connection, function(err, client, done) {
        client.query("INSERT INTO users (username, password, role, first_name, last_name, phone, grade, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING username, users_id",
            [saveUser.username, saveUser.password, saveUser.role, saveUser.first_name, saveUser.last_name, saveUser.phone, saveUser.grade, saveUser.deleted],
            function (err, result) {
                done();

                if(err) {
                    console.log("Error inserting data: ", err);
                    next(err);
                } else {
                    res.send(result.rows);
                }
            });
    });
});

router.put('/', function(req, res){

    var newPass = {
        password: encryptLib.encryptPassword(req.body.password),
        username: req.body.username
    };

    pg.connect(connection, function(err, client) {
        client.query(
            'UPDATE users SET (password) = ($1) WHERE username = ($2)',
            [newPass.password, newPass.username],

            function(err, result) {
                if (err) {
                    console.log('Error inserting data', err);
                    res.send(false);
                } else {
                    res.send(true);
                }
            });
    });
});

module.exports = router;
