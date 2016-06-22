var path = require("path"); // import path module

var express = require("express"); // import express js framework
var app = express();

var bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // Body parser use JSON data

app.post("/save", function (req, res) { // posting todo record

    console.log("Saving on server side");
    console.log(req.body.params.todos);

    var stringify = JSON.stringify(req.body.params.todos); // make sure the params from the body is json format
    var todos = JSON.parse(stringify); // parse the json to a object

    console.info(">>> todos: %s", todos); // print the values
    console.info(">>> typeof todos: %s", typeof todos); // also print the type of the json object

    res.status(202).end(); // lastly end the route path if the response status is 202

});

app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.argv[2] || process.env.APP_PORT || 3000);

app.listen(app.get("port"), function () {
    console.info("Application started on port %d", app.get("port"));
});
