(function() {
    'use strict';

    angular
        .module('RegApp')
        .config(filmConfig);

    filmConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function filmConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "app/login/login.view.html",
                controller: "loginCtrl",
                controllerAs: "loginCtrl"
            })
            .state("protected", {
                url: "/protected",
                templateUrl: "app/protected/protected.view.html",
                controller: "protectedCtrl",
                controllerAs: "protectedCtrl"
            });

        $urlRouterProvider.otherwise("/login");
    }
})();
