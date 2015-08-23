'use strict';

angular.module('freelanceApp')
    .factory('UserService', ['$http', '$window', 'baseUrl', function($http, $window, baseUrl) {
        var user = {
            userData: [],
            allUsers: []
        };
        user.logIn = function(data) {
            return $http.post(baseUrl + '/users/login', data);
        };

        user.AdminLogIn = function(data) {
            return $http.post(baseUrl + '/users/AdminLogIn', data);
        };

        user.signUp = function(data) {
            return $http.post(baseUrl + '/users', data);
        };

        user.google = function(data) {
            return $http.get(baseUrl + '/auth/google');
        };

        user.editProf = function(data) {
            return $http.put(baseUrl + '/users/one', data);
        };

        user.deleteUser = function() {
            return $http.delete(baseUrl + '/users/one');
        };

        user.deleteOneUser = function(id) {
            return $http.delete(baseUrl + '/users/admin/' + id);
        };

        user.profile = function() {
            return $http.get(baseUrl + '/users/one').then(function(res) {
                angular.copy(res.data, user.userData);
            });
        };

        user.getAll = function() {
            return $http.get(baseUrl + '/users').then(function(res) {
                angular.copy(res.data, user.allUsers);
            });
        };
        return user;
    }]);
