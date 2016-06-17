var express = require("express");
var app = express();

var mysql = require("mysql");
var path = require("path");

var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "edmond",
    password: "1111",
    database: "employees",
    connectionLimit: 4
});

app.get("/api/employee/:emp_no", function (req, res) {

    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(400).send(JSON.stringify(err));
            return;
        }
        connection.query("select * from employees where emp_no = ?",
            [req.params.emp_no],
            function (err, results) {
                connection.release();
                if (err) {
                    res.status(400).send(JSON.stringify(err));
                    return;
                }
                if (results.length)
                    res.json(results[0]);
                else
                    res.status(404).end("emp_no " + req.params.emp_no + " is not found");
            });
    });
});

app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
    res.type("text/plain");
    res.status(404);
    res.end("Page not found");
});

app.set("port", process.argv[2] || process.env.APP_PORT || 3000);

app.listen(app.get("port"), function () {
    console.info("Application started on port %d", app.get("port"));
});