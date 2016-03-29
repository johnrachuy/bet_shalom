var pg = require('pg');
var connection = require('./modules/connection');
var encryptLib = require('./modules/encryption');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/user_sql.js');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var lesson = require('./routes/lesson');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration //
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/get_names', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM users ORDER BY last_name ASC');

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

app.get('/get_info/:selectedName', function(req, res) {
    var results = [];

    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM users WHERE users_id = ($1)',
            [req.params.selectedName]);

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

app.post('/update_user', function(req, res, next) {

    var updateUser = {
        username: req.body.username,
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        grade: req.body.grade,
        deleted: 'false',
        users_id: req.body.users_id
    };
    console.log('update user:', updateUser);

    pg.connect(connection, function(err, client, done) {
        client.query("UPDATE users SET (username, role, first_name, last_name, phone, grade, deleted) = ($1, $2, $3, $4, $5, $6, $7) WHERE users_id = ($8)",
            [updateUser.username, updateUser.role, updateUser.first_name, updateUser.last_name, updateUser.phone, updateUser.grade, updateUser.deleted, updateUser.users_id],
            function (err, result) {
                client.end();

                if(err) {
                    console.log("Error inserting data: ", err);
                    next(err);
                } else {
                    res.redirect('/');
                }
            });
    });
});


// Routes
app.use('/lesson', lesson);
app.use('/register', register);
app.use('/user', user);
app.use('/', index);

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/assets'));
app.use(express.static('public/assets/scripts'));
app.use(express.static('public/assets/styles'));
app.use(express.static('public/vendors'));


// App Set //
app.set('port', (process.env.PORT || 5000));

// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
