var db = require('../config/db');

exports.readByEmail=function(email) {
    return db.row('UserEmail', [email]);
}

exports.create = function(firstname, lastname, email, password, interests) {
    return db.row('NewUser', [firstname, lastname, email, password, interests]);
}   

exports.all = function() {
    return db.rows('AllUsers');
}

exports.update = function(userid, interests, displayemail) {
 return db.empty('EditUser', [userid, interests, displayemail]);
}   

exports.read = function(userid) {
 return db.row('GetUser', [userid]);
}

exports.destroy = function(id) {
 return db.empty('DeleteUser', [userid]);
}


