var path = require("path");

var express = require("express");
var app = express();

app.get("/save", function(req, res) {
	var todos = JSON.parse(req.query.todos);
	console.info(">>> todos: %s", todos);
	console.info(">>> typeof todos: %s", typeof todos);
	res.status(202).end();
});

app.use("/bower_components", express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.argv[2] || process.env.APP_PORT || 3000);
app.listen(app.get("port"), function() {
	console.info("Application started on port %d", app.get("port"));
});
