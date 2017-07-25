var express = require('express');
var users = require('./controllers/users.ctrl');
var locations = require('./controllers/locations.ctrl');


var router = express.Router();


router.use('/users', users);
router.use('locations', locations);



module.exports = router;