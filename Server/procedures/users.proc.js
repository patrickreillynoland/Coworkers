var db = require('../config/db');

exports.readByEmail=function(email) 
{return db.row('GetUserByEmail', [email]);

}

exports.create = function(email, password, firstName, lastName) {
    return db.row('NewUser', [email, password, firstName, lastName]);
}

exports.all = function() {
    return db.rows('AllUsers');
}