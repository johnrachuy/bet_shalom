var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

//from createUserController
router.get('/:selectedTag', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {

        var query = client.query("SELECT lesson.lesson_id, lesson.title, lesson.author, lesson.published, lesson.materials, lesson.resource, lesson.status FROM lesson JOIN lesson_tag ON lesson.lesson_id = lesson_tag.fk_lesson_id JOIN tag ON lesson_tag.fk_tag_id = tag.tag_id WHERE tag.tag_id = ($1) AND lesson.status = 'published'",
            [req.params.selectedTag]);

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