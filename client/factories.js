angular.module('Coworkers.factories', ['ngResource'])
.factory('UserFactory', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@userid' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('LocationFactory', ['$resource', function($resource){
    return $resource('/api/locations/:id', { id: '@locationid'}, {
        update: {
            method: 'PUT'
        }
    })
}]);