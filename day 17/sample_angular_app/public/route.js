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
                templateUrl: "views/listView.html",
                controller: "listCtrl",
                controllerAs: "listCtrl"
            })
            .state("details", {
                url: "/details/:filmId",
                templateUrl: "views/detailView.html",
                controller: "detailCtrl",
                controllerAs: "detailCtrl"
            });

        $urlRouterProvider.otherwise("/list");
    }
})();
