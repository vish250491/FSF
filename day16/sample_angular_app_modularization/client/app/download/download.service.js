(function(){
    angular
        .module("UploadApp.Download")
        .service("DownloadService", DownloadService);

    DownloadService.$inject = ["$http", "$q"]

    function DownloadService($http, $q) {
        var vm = this;

        vm.download = function () {
            var defer = $q.defer();
            $http.get("/download")
                .then(function (resp) {
                    defer.resolve(resp);
                }).catch(function (err) {
                defer.reject(err.status);
            });
            return defer.promise;
        };
    }
})();
