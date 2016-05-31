//Load express
var express = require('express');
//Create an instance of express application
var app = express();
/* Serve files from public directory
 __dirname is the absolute path of
 the application directory
 */

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
    res.redirect('index.html');
});

app.get('/a', function(req, res, next) {
    res.redirect('a.html');
});

app.get('/b', function(req, res, next) {
    res.redirect('b.html');
});

app.get('/c', function(req, res, next) {
    res.redirect('c.html');
});

//Start the web server on port 3000
app.listen(3000, function() {
    console.info('Webserver started on port 3000');
});