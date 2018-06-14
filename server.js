var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session =  require('express-session');

mongoose.connect('mongodb://localhost/webdev-summer1-2018');


var app = express();

app.use(session({resave: false, saveUninitialized: true, secret: 'any string'}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
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
require('./services/course.service.server')(app);

app.listen(4000);