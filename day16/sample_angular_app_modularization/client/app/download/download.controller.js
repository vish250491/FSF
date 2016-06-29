(function(){
    angular
        .module("UploadApp.Download")
        .controller("DownloadCtrl", DownloadCtrl);

    DownloadCtrl.$inject = ["DownloadService"];

    function DownloadCtrl(DownloadService) {

        var vm = this;
        vm.status = {
            message: "",
            code: 0
        };
        vm.content = []; // variable that holds filenames returned from server

        vm.download = function () {
            DownloadService
                .download()
                .then(function (resp) {
                    vm.content = resp.data;
                }).catch(function (err) {
                vm.status.message = "Fail to download the images.";
                vm.status.code = 400;
            });
        }
    }
})();
