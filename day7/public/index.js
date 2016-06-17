(function() {
	var createTodo = function() {
		return ({ task: '', dueDate: '', priority: '' });
	};
	var TodoApp = angular.module("TodoApp", []);
	var TodoCtrl = function($http) {

		var ctrl = this;

		ctrl.todos = [];
		ctrl.newTodo = createTodo();

		ctrl.addTodo = function() {
			ctrl.todos.push(ctrl.newTodo);
			ctrl.newTodo = createTodo();
		};

		ctrl.save = function() {
			$http.get("/save", { 
				params: { todos: JSON.stringify(ctrl.todos) }
			}).then(function() {
				ctrl.todos = [];
			}).catch(function() {
			});
		};
	};

	TodoApp.controller("TodoCtrl", ["$http", TodoCtrl]);
})();
