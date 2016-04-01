var express = require('express');
var router = express.Router();
var path = require('path');
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res){
  var lessonPlan = {
    author: req.body.author,
    title: req.body.title,
    lesson_plan: req.body.lesson_plan,
    materials: req.body.materials,
    resource: req.body.resource,
    status: req.body.status,
    deleted: false
  };

  pg.connect(connection, function(err, client) {
    client.query('INSERT INTO lesson (author, title, lesson_plan, materials, ' +
      'resource, status, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [lessonPlan.author, lessonPlan.title, lessonPlan.lesson_plan, lessonPlan.materials,
      lessonPlan.resource, lessonPlan.status, lessonPlan.deleted],

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

router.put('/', function(req, res){
  var lessonPlan = {
    author: req.body.author,
    title: req.body.title,
    lesson_plan: req.body.lesson_plan,
    materials: req.body.materials,
    resource: req.body.resource,
    status: req.body.status,
    deleted: false,
    lesson_id: req.body.lesson_id
  };

  pg.connect(connection, function(err, client) {
    client.query(
      'UPDATE lesson SET (author, title, lesson_plan, materials, ' +
      'resource, status, deleted) = ($1, $2, $3, $4, $5, $6, $7) WHERE lesson_id = $8',
        [lessonPlan.author, lessonPlan.title, lessonPlan.lesson_plan, lessonPlan.materials,
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

router.get('/:id',  function(req, res) {
  var results =[];
  var lessonPlanId = req.params.id;
  console.log('req ', lessonPlanId);
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * FROM lesson WHERE lesson_id = $1',
      [lessonPlanId]);

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