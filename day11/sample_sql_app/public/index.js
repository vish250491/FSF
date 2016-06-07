(function() {
	var QueryApp = angular.module("QueryApp", []);

	var QueryCtrl = function($http) {
		var ctrl = this;
		ctrl.empNo = 0;
		ctrl.result = null;
		ctrl.search = function() {
			$http.get("/api/employee/" + ctrl.empNo)
				.then(function(result) {
					ctrl.result = result.data;
					console.info("result: %s", JSON.stringify(ctrl.result));
				})
				.catch(function(error) {
					// error.status = status code
					// error.data = message from the application
					console.info(">> error: %s", JSON.stringify(error));
				});
		};
	};

	QueryApp.controller("QueryCtrl", ["$http", QueryCtrl]);
})();
