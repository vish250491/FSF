(function() {
    angular
        .module("UploadApp")
        .service("dbService", dbService);

    dbService.$inject = ["$http", "$q", "Upload"]

    function dbService($http, $q, Upload) {
        var vm = this;

        vm.upload = function (dataToUpload) {
            var defer = $q.defer();
            Upload.upload({
                url: '/upload',
                data: dataToUpload
            }).then(function (resp) {
                defer.resolve(resp);
            }).catch(function (err) {
                defer.reject(err.status);
            });
            return defer.promise;
        };

        vm.download = function () {
            var defer = $q.defer();
            $http.get("/download")
                .then(function (resp) {
                    defer.resolve(resp);
                }).catch(function (err) {
                defer.reject(err.status);
            });
            return defer.promise;
        }
    }
})();

