exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

exports.isAdmin = function (req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
}
exports.isUser = function (req, res, next) {
    if (req.user.userid == req.params.id) {
        next();
    } else {
        res.sendStatus(403);
    }
}