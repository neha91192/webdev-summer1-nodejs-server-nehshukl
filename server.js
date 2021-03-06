var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session =  require('express-session');
var LOCAL_SERVER = 'http://localhost:4200';
var REMOTE_SERVER = 'https://webdev-angular-nehshukl.herokuapp.com';
var allowedOrigins = [LOCAL_SERVER, REMOTE_SERVER]


//mongoose.connect('mongodb://localhost/webdev-summer1-2018');


mongoose.connect('mongodb://heroku_fj4kp47r:j23recepdpulbuvku1lopnrpmp@ds263670.mlab.com:63670/heroku_fj4kp47r');

var app = express();

app.use(session({resave: false, saveUninitialized: true, secret: 'any string',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000
    },
    rolling: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {

    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Origin",
        origin);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

function setSession(req, res){
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session)
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

function resetSession(req, res) {
    req.session.destroy();
    res.send(200);
}

function getSessionAll(req, res) {
    res.send(req.session);
}




app.get('/', function (req, res) {
    res.send("Hello World");
})


app.get('/api/session/set/:name/:value',
    setSession);

app.get('/api/session/get/:name',
    getSession);

app.get('/api/session/reset',
    resetSession);

app.get('/api/session/get',
    getSessionAll);

var userService = require('./services/user.service.server');
userService(app);

require('./services/section.service.server')(app);
require('./services/enrollment.service.server')(app);


app.listen(process.env.PORT || 4000);