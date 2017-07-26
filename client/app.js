angular.module('Coworkers', ['ngRoute', 'ngResource', 'Coworkers.controllers', 'Coworkers.factories'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupController'
    })
    .when('/profileview', {
        templateUrl: 'views/profileview.html',
        controller: 'ProfileViewController'
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
