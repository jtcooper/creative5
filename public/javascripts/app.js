// javacript file for app

var app = angular.module('app', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
	    $stateProvider
	    .state('home', {
	        url: '/home',
	        templateUrl: '/home.html',
	        controller: 'mainCtrl' })
	    .state('user', {
		    url: '/user/{id}',
		    templateUrl: '/user.html',
		    controller: 'pageCtrl'
	    });
	    $urlRouterProvider.otherwise('home');
	}
])
.factory('userList', userList)
.controller('mainCtrl', mainCtrl)
.controller('pageCtrl', pageCtrl);

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
function mainCtrl($scope, userList, $http) {
	$scope.users = [];
	console.log("in mainCtrl");
	getUsers();
	
	function getUsers() {
			userList.get()
		.then(function (data) {
			$scope.users = data;
		});
	}
	$scope.createUser = function() {
		var formData = {name:$scope.name, bgColor:$scope.bgColor, profileImg:$scope.profileImg, interests:$scope.interests};
		$http({
			url: 'getusers',
			method: 'POST',
			data: formData
		}).then(function(data, status) {
			console.log("User created");
			getUsers();
		}, 
		[function(data, status) {
			console.log("Failed to create");
		}]);
	};
}
function pageCtrl($scope, userList) {
	//
}