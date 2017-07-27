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

exports.UpdateInterest = function(userid, firstname, lastname, interests) {
    return db.row('AdditionalInfo', [userid, firstname, lastname, interests]);
}

exports.read = function(userid) {
 return db.row('GetUser', [userid]);
}
exports.destroy = function(id) {
 return db.empty('DeleteUser', [id]);
}


