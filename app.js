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
var email = require('./routes/email');
var teacher_dashboard = require('./routes/teacher_dashboard');
var admin_dashboard = require('./routes/admin_dashboard');
var tags = require('./routes/tags');
var tag_search = require('./routes/tag_search');
var favorite = require('./routes/favorite');
var remove_lesson = require('./routes/remove_lesson');
var get_favorites = require('./routes/get_favorites');
var add_comment = require('./routes/add_comment');
var pic_route = require('./routes/pic_route');
var logout = require('./routes/logout');
var update_tag = require('./routes/update_tag');
var remove_user = require('./routes/remove_user');

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
app.use('/email', email);
app.use('/teacher_dashboard', teacher_dashboard);
app.use('/admin_dashboard', admin_dashboard);
app.use('/tags', tags);
app.use('/tag_search', tag_search);
app.use('/favorite', favorite);
app.use('/remove_lesson', remove_lesson);
app.use('/get_favorites', get_favorites);
app.use('/add_comment', add_comment);
app.use('/sign_s3', pic_route);
app.use('/logout', logout);
app.use('/update_tag', update_tag);
app.use('/remove_user', remove_user);

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
