var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res) {
    var results = [];
    console.log(req.body);

    pg.connect(connection, function(err, client, done) {
        var query = client.query('INSERT INTO favorite (fk_users_id, fk_fav_lesson_id, favorite_status) VALUES ($1, $2, $3)',
        [req.body.fk_users_id, req.body.fk_fav_lesson_id, req.body.favorite_status]);

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
        var query = client.query('SELECT * FROM favorite WHERE fk_users_id = ($1) AND fk_fav_lesson_id = ($2)',
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

router.put('/', function(req, res) {
    console.log(req.body);

    pg.connect(connection, function(err, client, done) {
        client.query("UPDATE favorite SET favorite_status = NOT favorite_status WHERE favorite_id = ($1)",
            [req.body.favorite_id],
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