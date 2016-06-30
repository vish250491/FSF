(function(){
    angular
        .module("RegApp.Protected")
        .controller("protectedCtrl", protectedCtrl);

    protectedCtrl.$inject = ['$http', '$state', 'protectedService'];

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