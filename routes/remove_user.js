var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.put('/', function(req, res) {

    pg.connect(connection, function(err, client, done) {
        client.query("UPDATE users SET deleted = 'TRUE' WHERE users_id = ($1)",
            [req.body.users_id],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

module.exports = router;