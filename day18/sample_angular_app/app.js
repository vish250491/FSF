//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public", {
    index: "shoppingcart.html"
}));

var session = require("express-session");

app.use(session({
    secret: "1111",
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
    
})

app.get("/api/cart", function (req, res) {
    
    res.status(200).json(req.session.cart);
    
});

app.post("/api/cart", function (req, res) {
    console.log("Add");
    req.session.cart.push(req.body.item);
    res.status(202).end();
    
})

app.delete("/api/cart", function (req, res) {

    //Save cart to database first before destroying
    req.session.destroy();
    res.status(200).end();
    
});

//Start the web server on port 3000
app.listen(3000, function() {
    console.info("Webserver started on port 3000");
});
