var db = require('../config/db');

exports.readByEmail=function(email) 
{return db.row('GetUserByEmail', [email]);
}

exports.create = function(id) {
    return db.row('NewUser', [id]);
}

exports.all = function() {
    return db.rows('AllUsers');
}