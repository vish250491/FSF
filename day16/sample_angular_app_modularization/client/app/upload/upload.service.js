(function(){
    angular
        .module("UploadApp.Upload")
        .service("UploadService", UploadService);

    UploadService.$inject = ["$http", "$q", "Upload"]

    function UploadService($http, $q, Upload) {
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
    }
})();