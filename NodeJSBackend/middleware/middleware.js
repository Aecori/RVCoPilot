function authorizationHeaderExists(req, res, next) {
    if (req.headers.authorization === undefined) {
        next({name: 'No JWT'});
    } else {
        next();
    }
};

module.exports = { authorizationHeaderExists };