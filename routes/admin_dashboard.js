var express = require('express');
var router = express.Router();
var path = require('path');
var connection = require('../modules/connection');
var pg = require('pg');

router.get('/',  function(req, res) {
    var results =[];
    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT lesson_id, author, title, materials, status, resource, published FROM lesson');
            //'WHERE status = ($1, $2)',
            //['needs review', 'submitted']);

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