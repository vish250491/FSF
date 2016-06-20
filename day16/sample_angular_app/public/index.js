angular
    .module("UploadApp", ["ngFileUpload"])
    .controller("UploadCtrl", UploadCtrl);

UploadCtrl.$inject = ["dbService"];

function UploadCtrl(dbService) {
    var vm = this;
    vm.imgFile = null;
    vm.comment = "";
    vm.status = {
        message: "",
        code: 0
    };
    vm.content = []; // variable that holds filenames returned from server

    vm.upload = function () {
        dbService.upload(
            {
                "img-file": vm.imgFile,
                "comment": vm.comment,
            }
        ).then(function (resp) {
            vm.fileurl = resp.data.bid;
            vm.status.message = "The image is saved successfully with id : " + resp.data.bid;
            vm.status.code = 202;
        }).catch(function (err) {
            vm.status.message = "Fail to save the image."
            vm.status.code = 400;
        });
    };

    vm.download = function () {
        dbService
            .download()
            .then(function (resp) {
                vm.content = resp.data;
            }).catch(function (err) {
                vm.status.message = "Fail to download the images."
                vm.status.code = 400;
        });
    }
};

