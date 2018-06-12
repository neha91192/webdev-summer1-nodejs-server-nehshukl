var express = require('express');
var session =  require('express-session')
var app = express();

app.use(session({resave: false, saveUninitialized: true, secret: 'any string'}))

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


app.listen(4000);