angular.module('Coworkers.controllers', ['ngResource', 'Coworkers.factories', 'Coworkers.services'])
.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    UserService.me().then(function() {
        redirect();
    });
    
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err)
        })
    }

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }
}])
.controller('UsersController', ['$scope', '$location', '$routeParams', 'UserFactory', 'UserService', function($scope, $location, $routeParams, UserFactory, UserService) {
    $scope.users=UserFactory.query({ id : $routeParams.userid });
}])

.controller('SignupController', ['$scope', 'UserService', function($scope, UserService){

}])