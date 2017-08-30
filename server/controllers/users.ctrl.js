var express = require('express');
var procedures = require('../procedures/users.proc');
var passport = require('passport');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');

var router = express.Router();


router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    })(req, res, next);
});

router.post('/', function(req, res) {
        var u = req.body;
        utils.encryptPassword(u.password)
        .then(function(hash) {
            u.password = hash;
            return procedures.create(u.firstname, u.lastname, u.email, hash, u.interests);
        }).then(function(result) {
            u.userid = result.userid;
            req.logIn(u, function(err) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    return res.status(201).send(result);
                }
            });
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })

router.all('*', auth.isLoggedIn);

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logOut();
        res.sendStatus(204);
    });
});

router.get('/me', function(req, res) {
    res.send(req.user);
});

// actually /api/users/
router.route('/')
    .get(function(req, res) {
        procedures.all()
        .then(function(users) {
            res.send(users);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
   
// actually /api/users/:id
router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id)
        .then(function(user) {
            res.send(user);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .delete(auth.isAdmin,function(req, res) {
        procedures.read(req.params.id)
        .then(function(user) {
            res.send(user);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(auth.isUser, function(req, res) {
        procedures.update(req.params.id, req.body.interests, req.body.displayemail)
        .then(function(user) {
            res.send(user);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = router;