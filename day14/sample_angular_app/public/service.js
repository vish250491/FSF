(function() {
    angular
        .module("RegApp")
        .service('dbService', dbService);

    dbService.$inject = ["$http", "$q"];

    function dbService($http, $q) {

        var ctrl = this;

        ctrl.save = function (data) {

            var defer = $q.defer();

            $http.post("api/employee/save", data)
                .then(function (result) {
                    defer.resolve(result.data);
                }).catch(function (error) {
                defer.reject(error.status);
            });

            return defer.promise;
        }
    }
})();
