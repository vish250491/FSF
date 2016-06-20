var express = require('express')
  , validator = require('express-validator') // uses a module to perform validation of the body fields with a form
  , bodyParser = require('body-parser') // require body parser module Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property.
  , cookieParser = require('cookie-parser') // parses incomign cookies
  , app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(validator()); // enable the validation


app.post('/iss/validateEmail', function(req, res) { // define a URI or routing path as validating email
  console.log("Server validation ....");  // print out the logging 
  req.checkBody("email_address", "Enter a valid email address.").isEmail(); //check whether the field is email then associate with an error message
  var errors = req.validationErrors(); // validate return a collections of errors.
  if (errors) { // if errors occured 
    console.log("Validation errors");
    res.send(errors); //return the JSON error messages
    return;
  } else {
    console.log("No erros found !");
    res.send("Boh errors !"); // no errors just return an error without errors.
  }	
});

// error handler, required as of 0.3.0
app.use(function(err, req, res, next){
  res.status(400).json(err);
});

app.listen(3000, function() {
    console.info("Webserver started on port 3000");
});
