(function() {
    angular
        .module("QueryApp", [])
        .controller("queryCtrl", queryCtrl);

    queryCtrl.$inject = ["$http"];

    function queryCtrl($http) {
        var vm = this;
        vm.empNo = 0;
        vm.result = null;
        vm.search = function () {
            $http.get("/api/employee/" + vm.empNo)
                .then(function (result) {
                    vm.result = result.data;
                    console.info("result: %s", JSON.stringify(vm.result));
                })
                .catch(function (error) {
                    // error.status = status code
                    // error.data = message from the application
                    console.info(">> error: %s", JSON.stringify(error));
                });
        };
    };
})();
