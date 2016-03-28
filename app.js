//var express = require('express');
//var app = express();
//var bodyParser = require('body-parser');
//var pg = require('pg');
//var connectionString = require('./modules/connection');
//
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//
//// Serve back static files
//app.use(express.static('public'));
//app.use(express.static('public/views'));
//app.use(express.static('public/scripts'));
//app.use(express.static('public/styles'));
//app.use(express.static('public/vendors'));
//
//app.set('port', process.env.PORT || 5000);
//app.listen(app.get('port'), function() {
//    console.log('Listening on port: ', app.get('port'));
//});
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
