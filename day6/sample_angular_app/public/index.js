angular
    .module("RegApp", [])  //1. init angular module with a name RegApp
    .controller("RegCtrl", RegCtrl);

RegCtrl.$inject = ["$http"];

function RegCtrl($http) {   // create a controller function passing the https service
    var vm = this;
    vm.username = ""; // init all the fields which the controller wish to capture from the form
    vm.email = "";
    vm.gender = "";
    vm.password = "";
    vm.status = {
        message: "",
        code: 0
    };
    vm.register = function () { // define the function to register
        $http.post("/register", { // do a post of the information from the form
            params: {
                username: vm.username,
                email: vm.email,
                gender: vm.gender,
                password: vm.password
            }
        }).then(function () {  // upon successful display the status of the registration
            console.info("success");
            vm.status.message = "Your registration is complete!";
            vm.status.code = 202;
        }).catch(function () {
            console.info("Error");  // else the registration will display a fail message
            vm.status.message = "Your registration is failed!";
            vm.status.code = 400;
        });
    };
};


