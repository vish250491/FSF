module.exports = function(app, passport) {

    var watch = require("connect-ensure-login")

    var bodyParser = require("body-parser");

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());


    //debug
    app.use(function(req, res, next) {
        console.info("incoming request: %s", req.originalUrl );
        console.info("method: %s", req.method);
        console.log(req.baseUrl);
        if (req.body)
            console.info(">>> %s = ", JSON.stringify(req.body));
        next();
    })

    app.use("/protected", watch.ensureLoggedIn("/status/401"));

    app.post("/login",
        passport.authenticate("local", {
            successRedirect: "/status/202",
            failureRedirect: "/status/403"
        })
    );

    app.use("/logout", function (req, res) {
        req.logout();
        req.session.destroy();
        res.status(200).end();
    });

    app.use("/status/:code", function (req, res) {
        var code = parseInt(req.params.code);
        console.log(code);

        res.status(code).end();

    });
}
