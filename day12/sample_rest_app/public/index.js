angular
    .module("queryApp", [])
    .controller("queryCtrl", queryCtrl);

queryCtrl.$inject = ["$http"];

function queryCtrl($http) {
    var vm = this;
    vm.empNo = 0;
    vm.result = null;
    vm.search = function () {
        $http.get("/api/employee/" + vm.empNo)
            .then(function (result) {
                vm.result = result.data
            })
            .catch(function (error) {
                vm.error = error;
            });
    };
};

