(function(){
    angular
        .module('RegApp')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', '$state'];

    function mainCtrl($scope, $state) {

        $scope.$on("event:auth-loginRequired", function () {
            console.log('401')
            $state.go("login");
        });

        $scope.$on("event:auth-loginConfirmed", function () {
            console.log("202")
            $state.go("protected");
        });

        $scope.$on("event:auth-forbidden", function () {
            //Display incorrect login message – not shown
            console.log("wrong pw");
        });
    }
})();
