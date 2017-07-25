var express = require('express');
var categories = require('./controllers/users.ctrl');

var router = express.Router();


router.use('/users', users);


module.exports = router;