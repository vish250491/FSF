var RegApp = angular.module("RegApp", []);
(function() {
    var RegCtrl;
    RegCtrl = function ($http) {
        var ctrl = this;
        ctrl.username = "";
        ctrl.email = "";
        ctrl.gender = "";
        ctrl.password = "";
        ctrl.status = {
            message : "",
            code : 0
        };
        ctrl.register = function () {
            $http.get("/register", {
                params: {
                    username: ctrl.username,
                    email: ctrl.email,
                    gender: ctrl.gender,
                    password: ctrl.password
                }
            }).then(function(){
                console.info("success");
                ctrl.status.message = "Your registration is complete!";
                ctrl.status.code = 202;
            }).catch(function(){
                console.info("Error");
                ctrl.status.message = "Your registration is failed!";
                ctrl.status.code = 400;
            });
        };
    };
    RegApp.controller("RegCtrl", ["$http", RegCtrl]);
}) ();