(function() {
    'use strict';

    angular
        .module('RegApp')
        .config(filmConfig);

    filmConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function filmConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("list", {
                url: "/list",
                templateUrl: "app/list/list.view.html",
                controller: "ListCtrl",
                controllerAs: "listCtrl"
            })
            .state("details", {
                url: "/details/:filmId",
                templateUrl: "app/detail/detail.view.html",
                controller: "DetailCtrl",
                controllerAs: "detailCtrl"
            });

        $urlRouterProvider.otherwise("/list");
    }
})();