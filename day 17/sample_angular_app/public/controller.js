angular
    .module('RegApp')
    .controller('listCtrl', listCtrl)
    .controller('detailCtrl', detailCtrl);

listCtrl.$inject = ['$state', 'dbService'];

function listCtrl($state, dbService) {

    var vm = this;
    vm.films = 1;
    vm.data = 1;
    vm.getDetails = function (filmId) {
        $state.go("details", {'filmId': filmId});
    };

    dbService
        .filmList(15)
        .then(function (results) {
            console.log('ok');
            vm.films = results;
        });
}

detailCtrl.$inject = ['$state', '$stateParams', 'dbService'];

function detailCtrl($state, $stateParams, dbService) {
    var vm = this;
    vm.film = {};
    vm.back = function () {
        $state.go("list");
    };

    dbService
        .filmDetail($stateParams.filmId)
        .then(function (film) {
            vm.film = film;
        });

}



