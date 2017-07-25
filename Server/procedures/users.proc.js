var db = require('../config/db');

exports.readByEmail=function(email) {
    return db.row('UserEmail', [email]);

}

exports.create = function(email, password, firstName, lastName, interests) {
    return db.row('NewUser', [email, password, firstName, lastName, interests]);
}

exports.all = function() {
    return db.rows('AllUsers');
}

exports.update = function(userid, interests, displayemail) {
 return db.empty('EditUser', [userid, interests, displayemail]);

}   

exports.UpdateInterest = function(userid, Interests) {
    return db.row('AddInterests', [userid, Interests]);
}

exports.read = function(userid) {
 return db.row('GetUser', [userid]);
}
exports.destroy = function(id) {
 return db.empty('DeleteUser', [id]);
}


