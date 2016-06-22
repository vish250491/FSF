(function(){
    angular
        .module("ShoppingCartApp")
        .controller("cartCtrl", cartCtrl);

    cartCtrl.$inject = [ "cartService" ];

    function cartCtrl(cartService) {

        var vm = this;

        vm.newItem = null;
        vm.cart = [];
        vm.status = {
            message : "",
            code : 0
        }
        
        vm.addToCart = function() {

            cartService
                .addToCart(vm.newItem)
                .then(function(){
                    vm.newItem = null;
                    vm.status.message = "One item added to your cart."
                    vm.status.code = 202;
                })
                .catch(function(){
                    vm.status.message = "Fail to add the item to your cart."
                    vm.status.code = 400;
                });
        };
        
        vm.refreshCart = function() {
            cartService
                .refreshCart()
                .then(function(cart){
                    vm.cart = cart;
                })
        };
        
        vm.checkout = function(){
            cartService
                .checkout()
                .then(function(){
                    vm.cart = [];
                    vm.status.message = "Your cart is empty."
                    vm.status.code = 202;
                })
                .catch(function(){
                    vm.status.message = "Fail to reset your cart."
                    vm.status.code = 400;
                })
        };
        
    }
})();
