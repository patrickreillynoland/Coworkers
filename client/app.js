angular.module('Coworkers', ['ngRoute', 'ngResource', 'ui.bootstrap', 'Coworkers.controllers', 'Coworkers.factories'])
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
    .when('/:userid', {
        templateUrl: 'views/profileview.html',
        controller: 'ProfileViewController'
    })
    .when('/:id/update',{
        templateUrl: 'views/editprofile.html',
        controller: 'EditProfileController'
    })
    .when('/users/:id', {
        templateUrl:'views/userprofile.html',
        controller: 'UserProfileController'
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController'
    })
    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'UserSearchController'
    })
    .when('/signup/additionalinfo', {
        templateUrl: 'views/additionalinfo.html',
        controller: 'AdditionalInfoController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
