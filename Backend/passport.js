const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, user) {
    passport.use(new LocalStrategy(user.authenticate()));
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());
};
