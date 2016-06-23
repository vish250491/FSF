(function () {
    'user strict';

    angular
        .module('RegApp')
        .controller('mainCtrl', mainCtrl)
        .controller('loginCtrl', loginCtrl)
        .controller('protectedCtrl', protectedCtrl);

    mainCtrl.$inject = ['$scope', '$state'];

    function mainCtrl($scope, $state) {

        $scope.$on("event:auth-loginRequired", function () {
            console.log('401')
            $state.go("login");
        });

        $scope.$on("event:auth-loginConfirmed", function () {
            console.log("202")
            $state.go("protected");
        });

        $scope.$on("event:auth-forbidden", function () {
            //Display incorrect login message – not shown
            //console.log("wrong pw");
        });
    }

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

    protectedCtrl.$inject = ['$http', '$state', 'dbService'];

    function protectedCtrl($http, $state, dbService) {

        var vm = this;
        vm.films = [];
        vm.logout = _logout;

        dbService
            .filmList(15)
            .then(function (results) {
                console.log('ok');
                vm.films = results;
            });

        function _logout() {
            $http.get("/logout")
                .then(function () {
                    $state.go("login");
                });
        }
    }
})();



