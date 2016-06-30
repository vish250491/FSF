(function(){
    angular
        .module("RegApp.Detail")
        .service("DetailService", DetailService);

    DetailService.$inject = ['$http', '$q'];

    function DetailService($http, $q) {

        var vm = this;
        
        vm.filmDetail = detail;

        function detail(filmId) {
            var defer = $q.defer();
            $http.get("/api/film/" + filmId)
                .then(function (result) {
                    defer.resolve(result.data);
                }).catch(function (error) {
                defer.reject(error);
            });
            return (defer.promise);
        }
    }
})();
