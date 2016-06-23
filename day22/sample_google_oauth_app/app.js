//Load express
var express = require("express");

var watch = require("connect-ensure-login");

var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

var oauth2Config = {
    clientID : "649217347783-j5l98cn8a2ot6iuc26ddgd31k3uincqo.apps.googleusercontent.com",
    clientSecret : "Y7neEBU9Z4j-Xy2LXmyogcLS",
    callbackURL : "http://localhost:3000/oauth_callback"
}

passport.use(new GoogleStrategy(oauth2Config, function(accessToken, refreshToken, profile, done){
    // do sth with the tokens
    console.log("token");

    return done(null, profile);

}));

passport.serializeUser(function (profile, done) {
    done(null, profile.emails[0].value);
});

passport.deserializeUser(function (email, done) {
    var userObject = { email : email } ; // Construct user profile based on email
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

app.get('/', function(req, res) {
    res.redirect('views/login.html');
});

app.get('/error', function(req, res) {
    res.redirect('views/error.html');
});

app.use("/protected", watch.ensureLoggedIn("/"), function(req, res){
    res.redirect("views/protected.html");
});

app.get("/login",
    passport.authenticate("google", {
        scope : [ "profile", "email", "https://www.googleapis.com/auth/calendar" ]
    })
);

app.get("/oauth_callback", passport.authenticate("google", {
    successRedirect : "/protected",
    failureRedirect : "/error"
}));



app.use("/logout", function (req, res) {
    console.log('call logout')
    req.logout();
    res.redirect("/");
});

//Start the web server on port 3000
app.listen(3000, function () {
    console.info("Webserver started on port 3000");
});



