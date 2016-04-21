var express = require('express');
var router = express.Router();
var passport = require('passport');
var connection = require('../modules/connection');
var pg = require('pg');

//from createUserController
router.get('/:selectedName', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM users WHERE users_id = ($1)',
            [req.params.selectedName]);

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