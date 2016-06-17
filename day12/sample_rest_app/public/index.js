(function () {
    var queryApp = angular.module("queryApp", []);
    var queryCtrl = function ($http) {
        var ctrl = this;
        ctrl.empNo = 0;
        ctrl.result = null;
        ctrl.search = function () {
            $http.get("/api/employee/" + ctrl.empNo)
                .then(function (result) {
                    ctrl.result = result.data
                })
                .catch(function (error) {
                    ctrl.error = error;
                });
        };
    };

    queryApp.controller("queryCtrl", ["$http", queryCtrl]);

})();