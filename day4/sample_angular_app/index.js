var RegApp = angular.module("RegApp", []);
(function() {
    var RegCtrl = function() {
        var ctrl = this;
        ctrl.username = "";
        ctrl.email = "";
        ctrl.gender = "";
        ctrl.register = function() {
            console.info("register click");
            console.info("username: %s", ctrl.username);
            console.info("email: %s", ctrl.email);
            console.info("gender: %s", ctrl.email);
        };
    };
    RegApp.controller("RegCtrl", [RegCtrl]);
}) ();