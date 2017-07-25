var db = require('../config/db');

exports.create = function(id) {
    return db.row('NewUser', [id]);
}

exports.all = function() {
    return db.rows('AllUsers');
}