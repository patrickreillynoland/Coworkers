var db = require('../config/db');

exports.all = function() {
    return db.rows('AllLocations');
}

exports.read = function(locationid) {
    return db.row('SingleLocation',[locationid]);
}