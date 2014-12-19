var publicPaths = [
    '/auth/login',
    '/auth/signup',
];

module.exports = function() {
    return function(req, res, next) {
        if (publicPaths.indexOf(req.path) >= 0 || req.isAuthenticated()) {
            res.locals.user = req.user || {};
            return next();
        } else {
            console.log("Access Denied to: " + req.path);
            res.redirect('http://localhost:3010/auth/login');
        }
    }
};
