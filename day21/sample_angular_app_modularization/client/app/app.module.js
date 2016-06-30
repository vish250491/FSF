(function() {
    angular.module('RegApp', ['ui.router', 'http-auth-interceptor', 'RegApp.Login', 'RegApp.Protected']);
})();