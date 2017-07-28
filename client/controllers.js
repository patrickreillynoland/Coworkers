angular.module('Coworkers.controllers', ['ngResource', 'ui.bootstrap', 'Coworkers.factories', 'Coworkers.services'])
.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            console.log('Good match')
            userLink();
        }, function(err) {
            console.log(err);
        })
    }

    $scope.logout = function() {
        UserService.logout();
        redirect();
    }

    $scope.go = function() {
        UserService.me().then(function() {
        redirect();
        })
    }

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
            $location.path('/users');
        }, function(err){
            console.log(err);
        })
} else { 
   alert("passwords missmatch")
}
    }
}])
.controller('EditProfileController',['$scope','$routeParams', function($scope, $routeParams){

}])

.controller('ProfileViewController', ['$scope','$routeParams', function($scope, $routeParams){
    $scope.user = UserFactory.get({ id: $routeParams.id });
}])

.controller('UserProfileController', ['$scope', 'UserFactory', '$routeParams', '$location', function($scope, UserFactory, $routeParams, $location){
    $scope.user = UserFactory.get({ id: $routeParams.id });
    console.log($routeParams.id)
}])
.controller('UserSearchController', ['$scope', function($scope){

}])
.controller("NavController", ["$scope", "MenuService", function($scope, MenuService){
    MenuService.setMenu([{href:"#", label:"My Profile",
                dropdown:[{href:"/profile", label:"View Profile"}, {href:"/login", label:"Login"}, {href:"/logout", label:"Logout"}],
    }]);
}]);
