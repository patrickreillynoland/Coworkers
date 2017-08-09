angular.module('Coworkers.controllers', ['ngResource', 'ui.bootstrap', 'ngAnimate', 'Coworkers.factories', 'Coworkers.services', 'Coworkers.directives'])
.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            $scope.successAlert = true;
            UserService.loggedIn = true;
            $location.replace().path('/locations');
        }, function(err) {
            $scope.failureAlert = true;
            console.log(err);
        })
    }

    $scope.logout = function() {
        UserService.logout();
        UserService.loggedIn = false;
        redirect();
    }

    UserService.me().then(function() {
        redirect();
    })


    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }

    function userLink() {
        window.location.assign('/users');
    }
}])

.controller('UsersController', ['$scope', '$location', '$routeParams', 'UserFactory', 'UserService', function($scope, $location, $routeParams, UserFactory, UserService) {
    $scope.users=UserFactory.query();
    
}])

.controller('SignupController', ['$scope', 'UserFactory', '$location', function($scope, UserFactory, $location){
    $scope.newUser = function(){
       if ($scope.user.password === $scope.password1) {
     var u = new UserFactory($scope.user);
        u.$save(function(){
            $location.path('/locations');
        }, function(err){
            console.log(err);
        })
} else { 
   alert("passwords mismatch")
}
    }
}])
.controller('EditProfileController',['$scope','UserFactory','$routeParams','$location', 'UserService', function($scope, UserFactory, $routeParams, $location, UserService){
    $scope.user = UserFactory.get({ id: $routeParams.id });
    $scope.save = function() {
        $scope.user.$update(function() {
            $location.replace().path('/users/' + $routeParams.id);
        });
    }
    var me = UserService.currentUser;

    console.log(me);
    
}])
.controller('ProfileController', ['$scope','$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory){
    $scope.user = UserFactory.get({ id: $routeParams.id });
}])

.controller('UserSearchController', ['$scope', 'UserFactory', 'UserService', function($scope, UserFactory, UserService){
   $scope.users = UserFactory.query();

}])
.controller('LocationsController', ['$scope', 'LocationFactory', function($scope, LocationFactory){
   $scope.locations = LocationFactory.query();

}])

.controller ('SingleLocationController', ['$scope', 'LocationFactory', '$routeParams', 'UserFactory', function($scope, LocationFactory, $routeParams, UserFactory){
    $scope.location = LocationFactory.get ({ id: $routeParams.id });
    $scope.users = UserFactory.query();
    $scope.toggle = true;
}])

.controller("NavController", ["$scope", "$rootScope", "MenuService", "UserService", "UserFactory", function($scope, $rootScope, MenuService, UserService, UserFactory){
    $scope.nametest = function() {
        return UserService.currentUser;
    }

    $scope.userid = UserService.me()
    
    MenuService.setMenu([{href:"#", label:"My Profile",
                dropdown:[{href:"/users/me/update", label:"View Profile"}, {href:"/login", label:"Login"}],
    }]);
    
    $scope.logout = function() {
        function redirect() {
            var dest = $location.search().dest;
            if (!dest) { dest = '/'; }
            $location.replace().path(dest).search('dest', null);
        }
        var c = confirm('Sure you want to log out?');
        if (c) {
            UserService.loggedIn = false;
            UserService.logout();
        } else {
            return;
        }
    }
}]);





