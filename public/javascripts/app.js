// javacript file for app

angular.module('app', ['ui.router'])

.factory('userList', [
        '$http',
        function ($http) {
            var API_ROOT = 'getusers';
            console.log("in userList");
            return {
                    users: [],
                    get: function() {
                            return $http
                            .get(API_ROOT)
                            .then(function (resp) {
                                    console.log(resp.data);
                                    users = resp.data;
                                    return resp.data;
                            })
                    }
            };
       }
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
	    $stateProvider
	    .state('home', {
	        url: '/home',
	        templateUrl: '/home.html',
	        controller: 'mainCtrl' 
	    })
	    .state('users', {
		    url: '/user/{id}',
		    templateUrl: '/user.html',
		    controller: 'pageCtrl'
	    });
	    $urlRouterProvider.otherwise('home');
	}

])
.controller('mainCtrl', [
	'$scope',
	'userList',
	'$http',
	function($scope, userList, $http) {
            $scope.users = userList.users;
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
        }])

.controller('pageCtrl',[
	'$scope',
	'userList',
	'$stateParams',
	function($scope, userList,$stateParams) {
            $scope.user = userList.users[$stateParams.id];

}]);

