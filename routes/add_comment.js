var express = require('express');
var router = express.Router();
var path = require('path');
var connection = require('../modules/connection');
var pg = require('pg');

router.put('/', function(req, res){
    var lessonPlan = {
        author: req.body.author,
        title: req.body.title,
        published: new Date(),
        lesson_plan: req.body.lesson_plan,
        materials: req.body.materials,
        resource: req.body.resource,
        status: req.body.status,
        deleted: req.body.deleted,
        lesson_id: req.body.lesson_id
    };

    pg.connect(connection, function(err, client) {
        client.query(
            'UPDATE lesson SET (author, title, published, lesson_plan, materials, ' +
            'resource, status, deleted) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE lesson_id = $9',
            [lessonPlan.author, lessonPlan.title, lessonPlan.published, lessonPlan.lesson_plan, lessonPlan.materials,
                lessonPlan.resource, lessonPlan.status, lessonPlan.deleted, lessonPlan.lesson_id],

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