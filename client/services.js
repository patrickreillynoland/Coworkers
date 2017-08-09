angular.module('Coworkers.services', [])
.service('UserService', ['$http', '$location', function($http, $location) {
    var loggedIn = false;
    
    var currentUser;

    this.isLoggedIn = function() {
        if (currentUser) {
            return true;
        } else {
            return false;
        }
    }

    this.isAdmin = function() {
        if (currentUser && currentUser.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }

    this.loginRedirect = function() {
        var current = $location.path();
        $location.path('/login').search('dest', current);
    }

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: { email: email, password: password }
        }).then(function(response) {
            currentUser = response.data;
            return currentUser;
        });
    }

    this.logout = function() {
        return $http({
            method: 'GET',
            url: '/api/users/logout'
        }).then(function() {
            currentUser = undefined;
        });
    }

    this.me = function() {
        if (currentUser) {
            return Promise.resolve(currentUser);
        } else {
            return $http({
                method: 'GET',
                url: '/api/users/me'
            }).then(function(response) {
                currentUser = response.data;
                return currentUser;
            });
        }
<<<<<<< HEAD

        this.autoLogout = function() {
            function AutoLogout() {
            this.events = ['load', 'mousemove', 'mousedown','click', 'scroll', 'keypress'];

            this.warn = this.warn.bind(this);
            this.logout = this.logout.bind(this);
            this.resetTimeout = this.resetTimeout.bind(this);

            for(var i in this.events) {
                window.addEventListener(this.events[i], this.resetTimeout);
            }

            this.setTimeout();

            }

            var _p = AutoLogout.prototype;

            _p.clearTimeout = function() {
                if(this.warnTimeout)
                clearTimeout(this.warnTimeout);

                if(this.logoutTimeout)
                clearTimeout(this.logoutTimeout);
            };

            _p.setTimeout = function() {
                this.warnTimeout = setTimeout(this.warn, 29 * 60 * 1000);

                this.logoutTimeout = setTimeout(this.logout, 30 * 60 * 1000);
            };

            _p.resetTimeout = function() {
                this.clearTimeout();
                this.setTimeout();
            };

            _p.warn = function() {
                alert('You will be logged out automatically in 1 minute.');
            };

            _p.logout = function() {
                // Send a logout request to the API
                console.log('Sending a logout request to the API...');

                this.destroy();  // Cleanup
            };

            _p.destroy = function() {
                this.clearTimeout();

                for(var i in this.events) {
                window.removeEventListener(this.events[i], this.resetTimeout);
                }
            };

            return AutoLogout;
        }

        this.me = function() {
            if (currentUser) { 
                return Promise.resolve(currentUser); 
            } else {
                return $http({
                    method: 'GET',
                    url: '/api/users/me'
                }).then(function (response) {
                    currentUser = response.data;
                    return currentUser;
                });
=======
    }
}])
.service("MenuService", ["$rootScope", function($rootScope) {
        return { 
            menu: function() {
                $rootScope.globalMenu;
            },    
            setMenu: function(menu) {
                $rootScope.globalMenu = menu;
>>>>>>> dev
            }
        };
}]);   
