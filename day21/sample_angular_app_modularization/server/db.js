module.exports = function (app) {

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

    app.get("/protected/api/films", function (req, res) {
        var limit = parseInt(req.query.limit) || 50;
        var offset = parseInt(req.query.offset) || 0;
        findAll([limit, offset])
            .then(function (results) {
                res.status(200).json(results);
            });
    });

    app.get("/protected/api/film/:fid", function (req, res) {
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

};

