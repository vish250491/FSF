var RegApp = angular.module("RegApp", []);
(function () {
    var RegCtrl;
    RegCtrl = function (dbService) {
        var ctrl = this;
        ctrl.employee = {};
        ctrl.employee.firstname = "";
        ctrl.employee.lastname = "";
        ctrl.employee.gender = "";
        ctrl.employee.birthday = "";
        ctrl.employee.hiredate = "";
        ctrl.status = {
            message: "",
            code: 0
        };
        ctrl.register = function () {
            dbService.save(ctrl.employee)
                .then(function () {
                    console.info("success");
                    ctrl.status.message = "The employee is added to the database.";
                    ctrl.status.code = 202;
                }).catch(function () {
                    console.info("Error");
                    ctrl.status.message = "Failed to add the employee to the database.";
                    ctrl.status.code = 400;
            });
        };
    };
    RegApp.controller("RegCtrl", ["dbService", RegCtrl]);
})();