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
var update_user = require('./routes/update_user');
var get_names = require('./routes/get_names');
var selected_name = require('./routes/selected_name');

var sendgrid  = require('sendgrid')('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');

app.post('/email', function(req, res) {
    var email     = new sendgrid.Email({
        to:       'saviohieu.n.nguyen@gmail.com',
        from:     'john.rachuy@gmail.com',
        subject:  'Hey!',
        text:     'We have the email feature working!!!!'
    });
    sendgrid.send(email, function(err, json) {

        if (err) {
            res.status(500).send();
            return console.error(err);
        }
        console.log(json);
        res.status(204).send();
    });
});

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
app.use('/update_user', update_user);
app.use('/get_names', get_names);
app.use('/selected_name', selected_name);
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
