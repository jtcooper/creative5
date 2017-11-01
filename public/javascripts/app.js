// javacript file for app

var app = angular.module('app', []);

app.factory('userList', userList);
app.controller('mainCtrl', mainCtrl);

function userList($http) {
	var API_ROOT = 'getusers';
	return {
		get: function() {
			return $http
			.get(API_ROOT)
			.then(function (resp) {
				return resp.data;
			})
		}
	};
}

function mainCtrl($scope, userList) {
	$scope.pages = [];
	
	userList.get()
	.then(function (data) {
		$scope.pages = data;
	});
}