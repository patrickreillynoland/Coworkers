angular.module('Coworkers', ['ngRoute', 'ngResource', 'ui.bootstrap', 'Coworkers.controllers', 'Coworkers.factories', 'Coworkers.directives'])
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
    .when('/users/:id/update', {
        templateUrl: 'views/editprofile.html',
        controller: 'EditProfileController',
        requiresLogin: true,
        enforceId: true
    })
    .when('/users/:id', {
        templateUrl:'views/profile.html',
        controller: 'ProfileController',
        requiresLogin: true
    })
    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'UserSearchController',
        requiresLogin: true
    })
    .when('/locations/:id', {
        templateUrl:'views/singlelocation.html',
        controller:'SingleLocationController'
    })
    .when('/locations', {
        templateUrl: 'views/locations.html',
        controller: 'LocationsController',
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
        } else if(nextRoute.$$route.requiresLogin && nextRoute.$$route.enforceId && !UserService.isAdmin()) {
            UserService.me()
            .then(function(me) {
                if (nextRoute.pathParams.id && nextRoute.pathParams.id != me.userid) {
                    event.preventDefault();
                    $location.path('/');
                }
            });
        } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
            event.preventDefault();
            $location.replace().path('/');
        } else if (nextRoute.$$route.originalPath === '/login' && UserService.isLoggedIn()) {
            event.preventDefault();
            $location.path('/');
        }
    });
}]);
