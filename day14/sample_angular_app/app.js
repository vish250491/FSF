//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "edmond",
    password: "1111",
    database: "employees",
    connectionLimit: 4
});

const insert = "insert into employees (first_name, last_name, gender, birth_date, hire_date) values (?, ?, ?, ?, ?)";


/* Serve files from public directory
 __dirname is the absolute path of
 the application directory
 */
app.use(express.static(__dirname + "/public"));

app.post("/api/employee/save", function (req, res) {
    console.log("hihi");
    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(500).end();
            return;
        }

        var gender = req.body.gender == "male" ? 'M' : 'F'; // enum value in the table
        var birth = req.body.birthday.substring(0, req.body.birthday.indexOf('T')); // format date
        var hire = req.body.hiredate.substring(0, req.body.hiredate.indexOf('T')); // format date

        connection.query(insert, [req.body.firstname, req.body.lastname, gender, birth, hire],
            function (err, result) {
                connection.release();
                if (err) {
                    console.log(err);
                    res.status(500).end();
                    return;
                }
                console.log(result);
                res.status(202).json({url: "/api/employee/" + result['insertId']});
            });
    });
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

//Start the web server on port 3000
app.listen(3000, function () {
    console.info("Webserver started on port 3000");
});
