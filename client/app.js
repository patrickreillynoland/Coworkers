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
    .when('/users/:id/update',{
        templateUrl: 'views/editprofile.html',
        controller: 'EditProfileController',
        requiresLogin: true

    })
    .when('/users/:id', {
        templateUrl:'views/profileview.html',
        controller: 'ProfileViewController',
        requiresLogin: true
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersController',
        requiresLogin: true
    })
    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'UserSearchController',
        requiresLogin: true
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
        } else if (nextRoute.$$route.originalPath === '/login' && UserService.isLoggedIn()) {
            event.preventDefault();
            $location.path('/');
        }
    });
}]);
