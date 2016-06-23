(function() {
    'use strict';

    angular
        .module('RegApp')
        .config(filmConfig);

    filmConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function filmConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "/views/login.html",
                controller: "loginCtrl",
                controllerAs: "loginCtrl"
            })
            .state("protected", {
                url: "/protected",
                templateUrl: "/views/protected.html",
                controller: "protectedCtrl",
                controllerAs: "protectedCtrl"
            });

        $urlRouterProvider.otherwise("/login");
    }
})();
