angular
    .module("TodoApp", [])
    .controller("TodoCtrl", TodoCtrl);

function TodoCtrl($http) {

    var vm = this;
    vm.todos = [];
    console.log(vm.todos.length);
    var lenTodos = vm.todos.length; // define the number of todos added
    console.log("xxxx " + lenTodos);
    vm.newTodo = createTodo(lenTodos); // make new instance of todo

    vm.addTodo = function () {
        vm.todos.push(vm.newTodo); // push the newly added todo to the array
        console.log(JSON.stringify(vm.newTodo));
        console.log(vm.todos.length);
        $http.post("/save", {  // post an ajax call to the server side
            params: {
                todos: JSON.stringify(vm.newTodo), // make sure the strings capture from the to do app is json format
                headers: {'Content-Type': 'application/json'}
            } // content type enforce
        });
        vm.newTodo = createTodo(vm.todos.length); // reset the form fields
    };
};


function createTodo(lenTodos) {
    console.log(lenTodos);
    console.log(".....");
    return ({id: lenTodos + 1, task: '', dueDate: '', priority: ''});
};
