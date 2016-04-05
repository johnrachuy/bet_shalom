var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.get('/:id',  function(req, res) {
    console.log(req.params);
    var results =[];
    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT lesson.lesson_id, lesson.author, lesson.title, lesson.materials, lesson.resource, lesson.published FROM lesson JOIN favorite ON favorite.fk_fav_lesson_id = lesson.lesson_id WHERE favorite.fk_users_id = ($1)',
            [req.params.id]);

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
            console.log(results);
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