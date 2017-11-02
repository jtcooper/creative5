// javacript file for app

var app = angular.module('app', ['ui.router']);

app.factory('userList', userList);
app.controller('mainCtrl', mainCtrl);
// app.controller('pageCtrl', pageCtrl);
// app.config([
//     '$stateProvider',
//     '$urlRouterProvider',
//     function($stateProvider, $urlRouterProvider) {
// 	    $stateProvider
// 	    .state('home', {
// 	        url: '/home',
// 	        templateUrl: '/home.html',
// 	        controller: 'mainCtrl' })   
// 	    .state('user', {
// 		    url: '/user/{id}',
// 		    templateUrl: '/user.html',
// 		    controller: 'pageCtrl'
// 	    });
// 	    $urlRouterProvider.otherwise('home');
// 	}
// ])

function userList($http) {
	var API_ROOT = 'getusers';
	console.log("in userList");
	return {
		get: function() {
			return $http
			.get(API_ROOT)
			.then(function (resp) {
				console.log(resp.data);
				return resp.data;
			})
		}
	};
}
function mainCtrl($scope, userList) {
	$scope.users = [];
	console.log("in mainCtrl");
	
	userList.get()
	.then(function (data) {
		$scope.users = data;
	});
	$scope.createUser = function() {
		//
	}
}
// function pageCtrl($scope, userList) {
// 	//
// }