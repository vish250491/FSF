//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var q = require('q');

var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "edmond",
    password: "1111",
    database: "sakila",
    connectionLimit: 4
});

const findAllStmt = "select film_id, title, release_year from film limit ? offset ?";
const findOneStmt = "select * from film where film_id = ?";

var makeQuery = function (sql, pool) {
    return (function (args) {
        var defer = q.defer();
        pool.getConnection(function (err, conn) {
            if (err) {
                defer.reject(err);
                return;
            }
            conn.query(sql, args || [], function (err, results) {
                conn.release();
                if (err) {
                    defer.reject(err);
                    return;
                }
                defer.resolve(results);
            });
        });
        return (defer.promise);
    });
}

var findAll = makeQuery(findAllStmt, pool);
var findOne = makeQuery(findOneStmt, pool);

/* Serve files from public directory
 __dirname is the absolute path of
 the application directory
 */
app.use(express.static(__dirname + "/public"));

app.get("/api/films", function (req, res) {
    var limit = parseInt(req.query.limit) || 50;
    var offset = parseInt(req.query.offset) || 0;
    findAll([limit, offset])
        .then(function (results) {
            res.status(200).json(results);
    });
});

app.get("/api/film/:fid", function (req, res) {
    findOne([req.params.fid])
        .then(function (results) {
            if (results.length) {
                res.status(200).json(results[0]);
            }
            else {
                res.status(404).end();
            }
    });
});

//Start the web server on port 3000
app.listen(3000, function () {
    console.info("Webserver started on port 3000");
});



