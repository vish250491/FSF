var express = require("express");
var mysql = require("mysql");

var app = express();

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "edmond",
    password: "1111",
    database: "employees",
    connectionLimit: 5
});

app.get("/", function(req, res){
    pool.getConnection(function (err, connection) {
        console.log("aaa");
        if (err) {
            console.log(err);
            return;
        }
        connection.query("select * from employees", function (err, results) {
            if (err) {
                console.log("err");
                return;
            };

            for (var i in results) {
                console.log(JSON.stringify(results[i]));
            }

            connection.release();
        });
    });
})

app.use(express.static(__dirname + "/public"));

app.listen(3000, function () {
    console.log("hi")
});
