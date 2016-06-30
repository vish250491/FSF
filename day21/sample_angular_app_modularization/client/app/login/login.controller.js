(function(){
    angular
        .module("RegApp.Login")
        .controller("loginCtrl", loginCtrl);

    loginCtrl.$inject = ['$http', '$httpParamSerializerJQLike', 'authService'];

    function loginCtrl($http, $httpParamSerializerJQLike, authService) {

        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.login = _login;

        function _login() {
            console.log(vm.email + ' ' + vm.password);
            $http({
                url: "/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: $httpParamSerializerJQLike({
                    email: vm.email,
                    password: vm.password
                })
            }).then(function () {
                console.log("log in ok")
                authService.loginConfirmed();
            }).catch(function(err) {
                console.info(">> %s", JSON.stringify(err));
            });
        }

    }

})();
