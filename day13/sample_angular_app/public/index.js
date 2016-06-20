angular
    .module("RegApp", [])
    .controller("RegCtrl", RegCtrl);

RegCtrl.$inject = ["$http"];

function RegCtrl($http) {
    var vm = this;
    vm.employee = {};
    vm.employee.firstname = "";
    vm.employee.lastname = "";
    vm.employee.gender = "";
    vm.employee.birthday = "";
    vm.employee.hiredate = "";
    vm.status = {
        message: "",
        code: 0
    };
    vm.register = function () {
        $http.post("/api/employee", vm.employee)
            .then(function () {
                console.info("success");
                vm.status.message = "The employee is added to the database.";
                vm.status.code = 202;
            }).catch(function () {
            console.info("Error");
            vm.status.message = "Failed to add the employee to the database.";
            vm.status.code = 400;
        });
    };
};

