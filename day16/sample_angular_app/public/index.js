angular
    .module("UploadApp", ["ngFileUpload"])
    .controller("UploadCtrl", UploadCtrl);

UploadCtrl.$inject = ["$http", "Upload"];

function UploadCtrl($http, Upload) {
    var vm = this;
    vm.imgFile = null;
    vm.comment = "";
    vm.status = {
        message: "",
        code: 0
    };
    vm.content = []; // variable that holds filenames returned from server

    vm.upload = function () {
        Upload.upload({
            url: '/upload',
            data: {
                "img-file": vm.imgFile,
                "comment": vm.comment,
            }
        }).then(function (resp) {
            vm.fileurl = resp.data.bid;
            vm.status.message = "The image " + resp.data.bid + " is saved successfully.";
            vm.status.code = 202;
        }).catch(function (err) {
            vm.status.message = "Fail to save the image."
            vm.status.code = 400;
        });
    };

    vm.download = function () {
        $http.get("/download")
             .then(function (resp) {
                 vm.content = resp.data;
             });
    }
};

