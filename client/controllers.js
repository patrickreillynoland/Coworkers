angular.module('Coworkers.controllers', ['ngResource', 'ui.bootstrap', 'Coworkers.factories', 'Coworkers.services'])
.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            $scope.successAlert = true;
            setTimeout(function() {
                $scope.successAlert = false;
                redirect();
            }, 500);  
        }, function(err) {
            $scope.failureAlert = true;
            console.log(err);
        })
    }

    $scope.logout = function() {
        UserService.logout();
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

.controller('UsersController', ['$scope', '$location', '$routeParams', 'UserFactory', function($scope, $location, $routeParams, UserFactory, UserService) {
    $scope.users=UserFactory.query();
}])

.controller('SignupController', ['$scope', 'UserFactory', '$location', function($scope, UserFactory, $location){
    $scope.newUser = function(){
       if ($scope.user.password === $scope.password1) {
     var u = new UserFactory($scope.user);
        u.$save(function(){
            $location.path('/users');
        }, function(err){
            console.log(err);
        })
} else { 
   alert("passwords mismatch")
}
    }
}])
.controller('EditProfileController',['$scope','UserFactory','$routeParams','$location', function($scope, UserFactory, $routeParams, $location){
    $scope.user = UserFactory.get({ id: $routeParams.id });
    $scope.save = function() {
        $scope.user.$update(function() {
            $location.replace().path('/users/' + $routeParams.id);
        });
    } 
    
}])
.controller('ProfileController', ['$scope','$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory){
    $scope.user = UserFactory.get({ id: $routeParams.id });
}])

.controller('UserProfileController', ['$scope', 'UserFactory', '$routeParams', '$location', function($scope, UserFactory, $routeParams, $location){
    $scope.user = UserFactory.get({ id: $routeParams.id });

}])
.controller('UserSearchController', ['$scope', 'UserFactory', function($scope, UserFactory){
   $scope.users = UserFactory.query();

}])
.controller('LocationsController', ['$scope', 'LocationFactory', function($scope, LocationFactory){
   $scope.locations = LocationFactory.query();

}])

.controller ('SingleLocationController', ['$scope', 'LocationFactory', '$routeParams', 'UserFactory', function($scope, LocationFactory, $routeParams, UserFactory){
    $scope.location = LocationFactory.get ({ id: $routeParams.id });
    $scope.users = UserFactory.query();
}])

.controller("NavController", ["$scope", "MenuService", "UserService", function($scope, MenuService, UserService){
    $scope.loggedIn = function() {
        return UserService.currentUser;
    }
    
    MenuService.setMenu([{href:"#", label:"My Profile",
                dropdown:[{href:"/profile", label:"View Profile"}, {href:"/login", label:"Login"}],
    }]);
    
    $scope.logout = function() {
        function redirect() {
            var dest = $location.search().dest;
            if (!dest) { dest = '/'; }
            $location.replace().path(dest).search('dest', null);
        }
        var c = confirm('Sure you want to log out?');
        if (c) {
            UserService.logout();
        } else {
            return;
        }
    }
}]);





