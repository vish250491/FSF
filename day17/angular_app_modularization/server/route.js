module.exports = function(app) {

    var queries = require("./data")();
    var findAll = queries.findAll;
    var findOne = queries.findOne;

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
};