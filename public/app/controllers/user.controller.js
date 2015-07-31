'use strict';

angular.module('freelanceApp')
  .controller('userCtrl', ['$scope', '$rootScope', '$location', '$window', 'UserService', 'ToastService',
    function ($scope, $rootScope, $location, $window, UserService, ToastService) {
      $scope.hidemsg = true;
      $scope.hideProg = true;

      $scope.logIn = function() {
        $scope.hideProg = false;
        var formData = {
                emailAddress: $scope.email,
                password: $scope.password
            };
        UserService.logIn(formData)
          .then(function(res) {
            $scope.hideProg = true;
            $window.sessionStorage.token = res.data.token;
            $window.sessionStorage.user = res.data.user;
            $location.path("/profile");
           },
            function(res) {
            $scope.hidemsg = false;
            $scope.hideProg = true;
            ToastService.showToast('Error occured');
            console.log(res.data)
            $scope.msg = res.data.message;
          });
      };

     $scope.adminLogIn = function() {
          $scope.hideProg = false;
          var formData = {
                  emailAddress: $scope.email,
                  password: $scope.password
              };
          UserService.AdminLogIn(formData)
            .then(function(res) {
              $scope.hideProg = true;
              $window.sessionStorage.token = res.data.token;
              $window.sessionStorage.user = res.data.user;
              $window.sessionStorage.admin = 'admin';
              $location.path("/admin-profile");
             },
              function(res) {
              $scope.hidemsg = false;
              $scope.hideProg = true;
              ToastService.showToast('Error occured');
              console.log(res.data)
              $scope.msg = res.data.message;
            });
        };

        $scope.signUp = function() {
          $scope.hideProg = false;
          var formData = {
                name: $scope.name,
                emailAddress: $scope.email,
                password: $scope.password,
                phoneNumber: $scope.phone,
                interests: $scope.interests,
                skill: $scope.skills,
                gender: $scope.gender
              };
          UserService.signUp(formData)
            .success(function(data) {
              $scope.hideProg = true;
              $window.sessionStorage.token = data.token;
              $window.sessionStorage.user = data.user;
              $location.path("/profile");
            })
            .error(function(data, status) {
              console.log(status, data);
              $scope.hidemsg = false;
              $scope.hideProg = true;
              $scope.msg = data.message;
            });
        };
    }]);
