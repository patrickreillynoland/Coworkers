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
    .when('/profile', {
        templateUrl: 'views/profileview.html',
        controller: 'ProfileViewController'
    })
    .when('/users/:id', {
        templateUrl:'views/userprofile.html',
        controller: 'UserProfileController'
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController'
    })
    .when('/users/search=', {
        templateUrl: 'views/searchresults.html',
        controller: 'UserSearchController'
    })
    .when('/signup/additionalinfo', {
        templateUrl: 'views/additionalinfo.html',
        controller: 'AdditionalInfoController'
    })
    .otherwise({
        redirectTo: '/'
    });
}])

.run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
        if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
            event.preventDefault();
            UserService.loginRedirect();
        } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
            event.preventDefault();
            $location.replace().path('/');
        }
    });
}]);
