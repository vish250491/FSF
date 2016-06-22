(function(){
    angular
        .module("ShoppingCartApp")
        .service("cartService", cartService);

    cartService.$inject = ["$http", "$q"];

    function cartService($http, $q) {

        var vm = this;
        
        vm.refreshCart = refresh;
        vm.addToCart = add;
        vm.checkout = _delete;

        function refresh() {
            var defer = $q.defer();
            $http.get("/api/cart")
                .then(function(results) { defer.resolve(results.data); });
            return (defer.promise);
        }

        function add(newItem) {
            var defer = $q.defer();
            $http.post("/api/cart", { item: newItem })
                .then(function() { defer.resolve() });
            return (defer.promise);
        }

        function _delete() {
            var defer = $q.defer();
            $http.delete("/api/cart")
                .then(function() { defer.resolve() });
            return (defer.promise);
        }
    }
})();
