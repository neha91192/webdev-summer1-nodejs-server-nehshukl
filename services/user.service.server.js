module.exports = function (app) {
    app.get('/api/user/:userId', findUserById);
    app.post('/api/register', register);
    app.get('/api/profile', profile);
    app.put('/api/profile', editProfile);
    app.get('/api/user?username=username', findUser);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.delete('/api/profile', deleteProfile)


    var userModel = require('../models/user/user.model.server');

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        var user = req.session['currentUser'];
        console.log(user)
        if(user!== undefined) {
            userModel.findUser(user.username)
                .then((user) => {
                        user.password='';
                        res.json(user)}
                 );
        } else {
            res.sendStatus(401)
        }
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .findUserByCredentials(user)
            .then(
                function(responseuser){
                    if (responseuser !==null && (responseuser.username === user.username)) {
                        res.sendStatus(409)
                    } else {
                        userModel.createUser(user)
                            .then(function (user) {
                                req.session['currentUser'] = user;
                                res.send(user);
                            })
                    }
                }
                );

    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function findUser(req, res) {
        let username = req.query.username;
        console.log(username);
        userModel.findUser(username)
            .then(function (user) {
                console.log(user)
                res.send(user);
            })

    }

    function editProfile(req, res) {
        var currentUser = req.session['currentUser'];
        var user = req.body;
        if(currentUser !== undefined){
            userModel.editProfile(currentUser._id, user)
                .then((user)=> {
                    res.json(user)
                });
        } else {
            res.sendStatus(401);
        }

    }

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                console.log(user)
                if(user === null){
                    res.sendStatus(401);
                } else {
                    req.session['currentUser'] = user;
                    res.json(user);
                }

            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function deleteProfile(req, res) {
        var currentUser = req.session['currentUser'];
        if(currentUser !== undefined){
            userModel.deleteProfile(currentUser._id)
                .then((user) => {
                    req.session.destroy();
                    res.send(user)
                });

        }else {
            res.sendStatus(401);
        }

    }

}