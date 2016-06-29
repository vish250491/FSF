module.exports = function() {
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

    return {
        findAll : findAll,
        findOne : findOne
    }
}
