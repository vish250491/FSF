var m = angular.module("RegApp");
m.service('dbService', function ($http, $q) {
    this.save = function (data) {
        var defer = $q.defer();
        $http.post("api/employee/save", data)
            .then(function(result){
                defer.resolve(result.data);
            }).catch(function(error){
            defer.reject(error.status);
        });
        return defer.promise;
    }
    /*this.query = function (empNo) {
     return $http.get("api/employee/" + empNo);
     }*/
});
