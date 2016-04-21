var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res) {
  var lessonPlan = {
    author: req.body.author,
    author_id: req.body.author_id,
    title: req.body.title,
    published: new Date(),
    lesson_plan: req.body.lesson_plan,
    materials: req.body.materials,
    resource: req.body.resource,
    status: req.body.status,
    deleted: false,
    tags: req.body.tags
  };

   pg.connect(connection, function(err, client, done) {
    client.query('INSERT INTO lesson (author, author_id, title, published, lesson_plan, materials, ' +
      'resource, status, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING lesson_id',
      [lessonPlan.author, lessonPlan.author_id, lessonPlan.title, lessonPlan.published, lessonPlan.lesson_plan, lessonPlan.materials,
        lessonPlan.resource, lessonPlan.status, lessonPlan.deleted],
      function (err, result) {
        done();
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {

          console.log('THE RESULT????', result);
          var sqlString = 'INSERT INTO lesson_tag ( fk_lesson_id, fk_tag_id ) VALUES';
          for (var i = 0; i < lessonPlan.tags.length; i++){
            sqlString = sqlString + '(' + result.rows[0].lesson_id + ',' + lessonPlan.tags[i] + ')';
            if (i < (lessonPlan.tags.length - 1)){
              sqlString = sqlString + ',';
            }
          }

          client.query(sqlString,
            function (err, result) {
              done();
              if(err) {
                console.log("Error inserting data: ", err);
                res.send(false);
              } else {
                res.send(result);
              }
            });
        }
      });
  });
});

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

router.get('/:id',  function(req, res) {
  var results =[];
  var lessonPlanId = req.params.id;
  console.log('req ', lessonPlanId);
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * ' +
    'FROM lesson ' +
    'JOIN lesson_tag ON lesson.lesson_id = lesson_tag.fk_lesson_id ' +
    'JOIN tag ON lesson_tag.fk_tag_id = tag.tag_id ' +
    'WHERE lesson.lesson_id = ($1) AND lesson_tag.deleted IS NOT true',
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