(function(){
    angular
        .module("RegApp.Detail")
        .controller("DetailCtrl", DetailCtrl);

    DetailCtrl.$inject = ['$state', '$stateParams', 'DetailService'];

    function DetailCtrl($state, $stateParams, DetailService) {
        var vm = this;
        vm.film = {};
        vm.back = function () {
            $state.go("list");
        };

        DetailService
            .filmDetail($stateParams.filmId)
            .then(function (film) {
                vm.film = film;
            });

    }
})();