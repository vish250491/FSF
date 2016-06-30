(function(){
    angular
        .module("RegApp.List")
        .service("ListService", ListService);

    ListService.$inject = ['$http', '$q'];

    function ListService($http, $q) {

        var vm = this;

        vm.filmList = list;

        function list(limit, offset) {
            var defer = $q.defer();
            var params = {limit: limit || 50, offset: offset || 0}
            $http.get("/api/films", {params: params})
                .then(function (results) {
                    defer.resolve(results.data);
                })
            return (defer.promise);
        }
    }
})();
