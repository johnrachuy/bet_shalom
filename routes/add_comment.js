var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.put('/', function(req, res){
    var newComment = {
        lesson_plan: req.body.lesson_plan,
        lesson_id: req.body.lesson_id
    };

    pg.connect(connection, function(err, client) {
        client.query(
            'UPDATE lesson SET (lesson_plan) = ($1) WHERE lesson_id = $2',
            [newComment.lesson_plan, newComment.lesson_id],

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