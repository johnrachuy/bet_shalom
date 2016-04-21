var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');


router.put('/', function(req, res){
  var lessonPlan = {
    status: 'archived',
    deleted: true,
    lesson_id: req.body.lesson_id
  };
  console.log('the lessonplan?', lessonPlan);
  pg.connect(connection, function(err, client) {
    client.query(
      'UPDATE lesson SET (status, deleted) = ($1, $2) WHERE lesson_id = $3',
      [lessonPlan.status, lessonPlan.deleted, lessonPlan.lesson_id],

      function(err, result) {
        if (err) {
          console.log('Error inserting data', err);
          res.send(false);
        } else {
          console.log('it worked');
          res.send(true);
        }
      });
  });
});

module.exports = router;