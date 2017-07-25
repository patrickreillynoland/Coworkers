var db = require('../config/db');

exports.readByEmail=function(email) 
{return db.row('UserEmail', [email]);

}

exports.create = function(email, password, firstName, lastName, interests) {
    return db.row('InsertUser', [email, password, firstName, lastName, interests]);
}

exports.all = function() {
    return db.rows('AllUsers');
}

