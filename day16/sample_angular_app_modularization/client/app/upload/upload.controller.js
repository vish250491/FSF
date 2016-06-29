(function(){
    angular
        .module("UploadApp.Upload")
        .controller("UploadCtrl", UploadCtrl);

    UploadCtrl.$inject = ["UploadService"];

    function UploadCtrl(UploadService) {
        var vm = this;
        vm.imgFile = null;
        vm.comment = "";
        vm.status = {
            message: "",
            code: 0
        };
        vm.content = []; // variable that holds filenames returned from server

        vm.upload = function () {
            UploadService.upload(
                {
                    "img-file": vm.imgFile,
                    "comment": vm.comment
                }
            ).then(function (resp) {
                vm.fileurl = resp.data.bid;
                vm.status.message = "The image is saved successfully with id : " + resp.data.bid;
                vm.status.code = 202;
            }).catch(function (err) {
                vm.status.message = "Fail to save the image.";
                vm.status.code = 400;
            });
        };
    }
})();
