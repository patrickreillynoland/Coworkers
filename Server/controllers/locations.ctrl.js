var express = require('express');
var procedures = require('../procedures/locations.proc');


var router = express.Router();

router.route('/')
    .get(function(req, res) {
        procedures.all()
        .then(function(locations) {
            res.send(locations);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

// Route categories by ID to allow other category additions in the future.
// router.route('/:id')
//     .get(function(req, res) {
//         procedures.getProductsByCategory(req.params.id)
//         .then(function(category) {
//             res.send(category);
//         }, function(err) {
//             console.log(err);
//             res.sendStatus(500);
//         });
//     });

router.route('/:id')
    .get(function(req,res){
        procedures.read(req.params.id)
        .then(function(location){
            res.send(location);
        }, function(err){
            console.log(err);
            res.sendStatus(500);
        });
    });

module.exports = router;