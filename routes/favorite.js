var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res) {
    var results = [];
    console.log(req.body);

    pg.connect(connection, function(err, client, done) {
        var query = client.query('INSERT INTO favorite (fk_users_id, fk_fav_lesson_id) VALUES ($1, $2)',
        [req.body.fk_users_id, req.body.fk_fav_lesson_id]);

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

router.get('/', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT fk_fav_lesson_id FROM favorite WHERE fk_users_id = ($1) AND fk_fav_lesson_id = ($2)',
            [req.query.id, req.query.lesson]);

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