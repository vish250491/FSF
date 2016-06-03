var RegApp = angular.module("RegApp", []);
(function() {
    var RegCtrl;
    RegCtrl = function ($http, $window) {
        var ctrl = this;
        ctrl.username = "";
        ctrl.email = "";
        ctrl.gender = "";
        ctrl.password = "";
        ctrl.register = function () {
            $http.get("/register", {
                params: {
                    username: ctrl.usrname,
                    email: ctrl.email,
                    gender: ctrl.gender,
                    password: ctrl.password
                }
            }).then(function(){
                console.info("success");
                $window.location = "/register";
            }).catch(function(){
                console.info("Error");
            });
        };
    };
    RegApp.controller("RegCtrl", ["$http", "$window", RegCtrl]);
}) ();