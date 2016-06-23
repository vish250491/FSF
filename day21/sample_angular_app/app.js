//Load express
var express = require("express");

var watch = require("connect-ensure-login");

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var authenticate = function (username, password, done) {
    var valid = true; //authenticate with credentials, not shown
    if (valid) {
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


//Create an instance of express application
var app = module.export = express();

var session = require("express-session");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/* Serve files from public directory
 __dirname is the absolute path of
 the application directory
 */
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "1111",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//debug
app.use(function(req, res, next) {
    console.info("incoming request: %s", req.originalUrl );
    console.info("method: %s", req.method);
    console.log(req.baseUrl);
    if (req.body)
        console.info(">>> %s = ", JSON.stringify(req.body));
    next();
})

app.use("/protected", watch.ensureLoggedIn("/status/401"));

app.post("/login",
    passport.authenticate("local", {
        successRedirect: "/status/202",
        failureRedirect: "/status/403"
    })
);

app.use("/logout", function (req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).end();
});

app.use("/status/:code", function (req, res) {
    var code = parseInt(req.params.code);
    console.log(code);

    res.status(code).end();

});

// db call from db.js. Pass the express instance to db module
require('./db')(app);

//Start the web server on port 3000
app.listen(3000, function () {
    console.info("Webserver started on port 3000");
});



