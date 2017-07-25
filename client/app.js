angular.module('Coworkers'['ngRoute', 'ngResource', 'Coworkers.controllers', 'Coworkers.factories'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html'
    })
    .when('/login', {
        templateUrl: 'views/category.html',
        controller: 'CategoryController'
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
