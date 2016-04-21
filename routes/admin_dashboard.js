var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.get('/:id',  function(req, res) {
    var results =[];
    pg.connect(connection, function(err, client, done) {
        var query = client.query("SELECT lesson_id, author, title, materials, status, published FROM lesson WHERE (status = 'submitted' OR status = 'draft' AND author_id = ($1)) ORDER BY published ASC",
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