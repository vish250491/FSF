(function () {
    angular
        .module("UploadApp")
        .config(UploadConfig);

    UploadConfig.$inject = ['$stateProvider'];

    function UploadConfig($stateProvider) {
        $stateProvider
            .state("index", {
                url: "",
                views: {
                    "upload": {
                        templateUrl: "app/upload/upload.view.html",
                        controller: "UploadCtrl",
                        controllerAs: "uploadCtrl"
                    },
                    "download": {
                        templateUrl: "app/download/download.view.html",
                        controller: "DownloadCtrl",
                        controllerAs: "downloadCtrl"
                    }
                }
            });
    }
})();
