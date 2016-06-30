//Load express
var express = require("express");

var watch = require("connect-ensure-login");

//Create an instance of express application
var app = module.export = express();

/* Serve files from public directory
 __dirname is the absolute path of
 the application directory
 */
app.use(express.static(__dirname + "/../client"));

// passport setup
var passport =  require("./auth")(app);

//routes
require("./routes")(app, passport);

// db REST call from db.js. Pass the express instance
require('./db')(app);

//Start the web server on port 3000
app.listen(3000, function () {
    console.info("Webserver started on port 3000");
});



