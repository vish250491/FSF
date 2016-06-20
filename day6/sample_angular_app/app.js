//Load express
var express = require("express");
//Create an instance of express application
var app = express();
/* Serve files from public directory
 __dirname is the absolute path of
 the application directory
 */

app.use(express.static(__dirname + "/public"));

app.post("/register", function(req, res, next) {
    var username = req.query.username;
    var email = req.query.email;
    var gender = req.query.gender;
    console.log("form data received")
    res.status(200).end()
});

//Start the web server on port 3000
app.listen(3000, function() {
    console.info("Webserver started on port 3000");
});
