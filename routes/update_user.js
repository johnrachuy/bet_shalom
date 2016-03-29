var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
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

module.exports = router;