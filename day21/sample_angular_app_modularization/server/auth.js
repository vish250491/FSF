module.exports = function(app) {
    var passport = require("passport");
    var LocalStrategy = require("passport-local").Strategy;

    var authenticate = function (username, password, done) {

        console.log('auth');
        var valid = true; //authenticate with credentials, not shown
        if (valid) {
            console.log('good pw');
            return done(null, username);
        }

        return done(null, false);
    }

    passport.use(new LocalStrategy ({
            usernameField: "email",
            passwordField: "password"
        },
        authenticate));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        var userObject = { email : id } ; // Construct user profile based on id
        done(null, userObject);
    });

    var session = require("express-session");

    app.use(session({
        secret: "1111",
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;

}