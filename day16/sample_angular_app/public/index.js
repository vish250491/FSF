var RegApp = angular.module("UploadApp", ["ngFileUpload"]);
(function () {
    var RegCtrl;
    RegCtrl = function ($http, Upload) {
        var ctrl = this;
        ctrl.imgFile = null;
        ctrl.comment = "";
        ctrl.status = {
            message: "",
            code: 0
        };

        ctrl.upload = function () {
            Upload.upload({
                url: '/upload',
                data: {"img-file": ctrl.imgFile, "comment": ctrl.comment, "name": ctrl.imgFile.name}
            }).then(function (resp) {

                ctrl.status.message = "The image " + resp.data.bid + " is saved successfully.";
                ctrl.status.code = 202;
            }).catch(function(err){
                ctrl.status.message = "Fail to save the image."
                ctrl.status.code = 400;
            });
        };
    };
    RegApp.controller("UploadCtrl", ["$http", "Upload", RegCtrl]);
})();