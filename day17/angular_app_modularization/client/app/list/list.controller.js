(function(){
    angular
        .module("RegApp.List")
        .controller("ListCtrl", ListCtrl);

    ListCtrl.$inject = ['$state', 'ListService'];

    function ListCtrl($state, ListService) {

        var vm = this;
        vm.films = 1;
        vm.data = 1;
        vm.getDetails = function (filmId) {
            $state.go("details", {'filmId': filmId});
        };

        ListService
            .filmList(15)
            .then(function (results) {
                console.log('ok');
                vm.films = results;
            });
    }
})();
