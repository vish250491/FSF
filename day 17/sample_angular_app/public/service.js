(function() {
    angular
        .module('RegApp')
        .service('dbService', dbService);

    dbService.$inject = ['$http', '$q'];

    function dbService($http, $q) {

        var vm = this;

        vm.filmList = list;
        vm.filmDetail = detail;

        function list(limit, offset) {
            var defer = $q.defer();
            var params = {limit: limit || 50, offset: offset || 0}
            $http.get("/api/films", {params: params})
                .then(function (results) {
                    defer.resolve(results.data);
                })
            return (defer.promise);
        }

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