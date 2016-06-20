//Load express
var express = require("express");
//Create an instance of express application
var app = express();
var fs = require("fs");

var path = require("path");

var multer = require("multer");
var multipart = multer({dest: path.join(__dirname, "/uploads/")});

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "edmond", // db user
    password: "1111", // password
    database: "image", // db name
    connectionLimit: 4
});

const sql = "insert into img_storage (bid, comment, upload_date, data, img_type) values (?, ?, ?, ?, ?)";


/* Serve files from public directory
 __dirname is the absolute path of
 the application directory
 */
app.use(express.static(__dirname + "/public"));

app.post("/upload", multipart.single("img-file"), function (req, res) {
    fs.readFile(req.file.path, function (err, data) {
        pool.getConnection(function (err, conn) {
            conn.query(sql,
                [
                    Math.random().toString().slice(0, 15), // random primary key, could be done in db
                    req.body.comment,
                    new Date(),
                    data,
                    req.file.mimetype
                ],
                function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        res.status(500).json({bid: null});
                        return;
                    }
                    fs.unlinkSync(req.file.path); // delete tmp files after saved to db
                    res.status(202).json({bid: req.body.name.slice(0, 15)});
                });
        });
    })
})

app.get("/download", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(400).send(JSON.stringify(err));
            return;
        }
        connection.query("select data, img_type from img_storage", [ req.params.filename ],
            function (err, results) {
                connection.release();
                if (err) {
                    res.status(400).send(JSON.stringify(err));
                    return;
                }
                if (results.length) {
                    var listOfImages = [];
                    results.forEach(function (item, index) { //Use forEach for async purpose
                        fs.open("public/download/" + index + ".png", 'w', 0666, function (err, file) {
                            if (err) {
                                res.status(400).send(JSON.stringify(err));
                                return;
                            }
                            fs.writeFile("public/download/" + index + ".png", item.data, 'binary', function (err) {
                                if (err) {
                                    res.status(400).send(JSON.stringify(err));
                                    return;
                                }
                                listOfImages.push("download/" + index + ".png");
                                if (index == results.length - 1) { // last item. Avoid promise.
                                    console.log("Images are saved");
                                    res.status(200).send(listOfImages); // assume all images have the same type.
                                }
                            });
                        });
                    });
                }
                else {
                    res.status(404).end("image " + req.params.filename + " is not found");
                }
            });
    });
});

//Start the web server on port 3000
app.listen(3000, function () {
    console.info("Webserver started on port 3000");
});