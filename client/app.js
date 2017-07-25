angular.module('Coworkers', ['ngRoute', 'ngResource', 'Coworkers.controllers', 'Coworkers.factories', 'Coworkers.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html'
    })
    .when('/workers/:id', {
        templateUrl: 'views/workers.html',
        controller: 'WorkersController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);