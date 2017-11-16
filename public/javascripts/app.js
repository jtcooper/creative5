// javacript file for app



var app = angular.module('app', ['ui.router'])

.factory('userList', [
    '$http',
    function ($http) {
        var API_ROOT = 'getusers';
        console.log("in userList");
        return {
            get: function() {
                return $http
                .get(API_ROOT)
                .then(function (resp) {
                    console.log(resp.data);
                    users = resp.data;
                    return resp.data;
                })
            },
            nameExists: function(users, name) {
                // check to see if name already exists; we want to do a new call and not use an existing array
                if (users.find(o => o.name === name) != undefined) {
                    return true;
                }
                return false;
            },
            currentUser: undefined
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
	    })
        .state('create', {
            url:'/create',
            templateUrl: '/create.html',
            controller: 'createCtrl'
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
        $scope.currentUser = userList.currentUser;
        console.log("in mainCtrl");
        getUsers();

        function getUsers() {
       	    userList.get()
            .then(function (data) {
                    $scope.users = data;
            });
        }
        $scope.login = function() {
            if (userList.nameExists($scope.users, $scope.username)) {
                $scope.currentUser = $scope.users.findIndex(o => o.name === $scope.username);
                $scope.username = '';
                console.log($scope.currentUser);
            }
        }
        $scope.logout = function() {
            $scope.currentUser = undefined;
        }
        // $scope.createUser = function() {
        //     if ($scope.name === '') { return; }
        //     var formData = {name:$scope.name, bgColor:$scope.bgColor, profileImg:$scope.profileImg, interests:$scope.interests};
        //     $http({
        //         url: 'getusers',
        //         method: 'POST',
        //         data: formData
        //     }).then(function(data, status) {
        //         console.log("User created");
        //         $scope.name = '';
        //         $scope.profileImg = '';
        //         $scope.interests = '';
        //         getUsers();
        //     },
        //     [function(data, status) {
        //             console.log("Failed to create");
        //     }]);
        // };
    }
])
.controller('pageCtrl', [
    // 'mainCtrl', '$scope', '$stateParams'
    // function($scope) {
    //     $scope.user = users[$stateParams.id];
    // }
	'$scope',
	'userList',
	'$stateParams',
	'$http',
	function($scope, userList, $stateParams, $http) {
        getUsers();
        function getUsers() {
            userList.get()
            .then(function (data) {
                $scope.user = data[$stateParams.id];
                console.log("user id:" + $stateParams.id);
            });

        }


$scope.addComment = function() {
     if($scope.formContent === '') { return; }
      console.log("In addComment with "+$scope.formContent);
	$http.put('/getusers/' + user._id + '/post')
      $scope.create({
        title: $scope.formContent,
      });
      $scope.formContent = '';
   };

$scope.post = function(user) {
      return $http.put('/getusers/' + user._id + '/post')
        .success(function(data){
          console.log("post worked");
        });
    };


   $scope.delete = function(user) {
      $http.delete('/getusers/' + user._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

   $scope.create = function(user) {
    return $http.post('/getusers', user).success(function(data){
      $scope.getusers.push(data);
    });
  };   

   $scope.getAll = function() {
    return $http.get('/getusers').success(function(data){
      angular.copy(data, $scope.getusers);
    });
  };
  $scope.getAll();


    }
])
.controller('createCtrl', [
    '$scope',
    'userList',
    '$http',
    '$state',
    function($scope, userList, $http, $state) {
        $scope.createUser = function() {
            if ($scope.name === '') { return; }
            userList.get().then(function(data) {
                if (userList.nameExists(data, $scope.name)) {
                    alert("Username already exists.");
                    return;
                }
                else {
                    var formData = {name:$scope.name, bgColor:$scope.bgColor, profileImg:$scope.profileImg, interests:$scope.interests};
                    $http({
                        url: 'getusers',
                        method: 'POST',
                        data: formData
                    }).then(function(data, status) {
                        console.log("User created");
                        $scope.name = '';
                        $scope.profileImg = '';
                        $scope.interests = '';
                        // return to home screen
                        $state.go('home');
                    },
                    [function(data, status) {
                            console.log("Failed to create");
                    }]);
                }
            });
            
        };
    }
]);