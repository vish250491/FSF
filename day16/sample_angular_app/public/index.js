(function () {
    var RegApp = angular.module("UploadApp", ["ngFileUpload"]);
    var RegCtrl;

    RegApp.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
    }]);

    RegCtrl = function ($http, Upload, $sce) {
        var ctrl = this;
        ctrl.imgFile = null;
        ctrl.comment = "";
        ctrl.status = {
            message: "",
            code: 0
        };
        ctrl.content = null;

        ctrl.upload = function () {
            Upload.upload({
                url: '/upload',
                data: {"img-file": ctrl.imgFile, "comment": ctrl.comment, "name": ctrl.imgFile.name}
            }).then(function (resp) {
                ctrl.fileurl = resp.data.bid;
                ctrl.status.message = "The image " + resp.data.bid + " is saved successfully.";
                ctrl.status.code = 202;
            }).catch(function(err){
                ctrl.status.message = "Fail to save the image."
                ctrl.status.code = 400;
            });
        };

        ctrl.download = function() {
            $http.get("/download/" + "c4.PNG", { responseType:'arraybuffer' }) // todo: replace hardcoded filename
                .then(function(resp){
                    console.log("hihi");
                    var blob = new Blob([resp.data], {type : 'image/png'})
                    var fileUrl = window.URL.createObjectURL(blob);
                    ctrl.content = $sce.trustAsResourceUrl(fileUrl);
                });
        }
    };
    RegApp.controller("UploadCtrl", ["$http", "Upload", "$sce", RegCtrl]);
})();