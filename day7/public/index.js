angular
    .module("TodoApp", [])
    .controller("TodoCtrl", TodoCtrl);

function TodoCtrl($http) {

    var vm = this;

    vm.todos = [];
    vm.newTodo = createTodo();

    vm.addTodo = function () {
        vm.todos.push(vm.newTodo);
        vm.newTodo = createTodo();
    };

    vm.save = function () {
        $http.get("/save", {
            params: {todos: JSON.stringify(vm.todos)}
        }).then(function () {
            vm.todos = [];
        }).catch(function () {
        });
    };
};


function createTodo() {
    return ({task: '', dueDate: '', priority: ''});
};


