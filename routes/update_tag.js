var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res) {

    pg.connect(connection, function(err, client, done) {
        client.query('INSERT INTO lesson_tag (fk_lesson_id, fk_tag_id) VALUES ($1, $2)',
            [req.body.lesson_id, req.body.tag_id],
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

router.put('/', function(req, res) {
    console.log(req.body);

    pg.connect(connection, function(err, client, done) {
        client.query("UPDATE lesson_tag SET deleted = 'TRUE' WHERE fk_lesson_id = ($1) AND fk_tag_id = ($2)",
            [req.body.lesson_id, req.body.tag_id],
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