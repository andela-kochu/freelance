'use strict';

angular.module('freelanceApp')
  .controller('allUsersCtrl', ['$scope', '$rootScope', '$location', '$window', 'UserService', '$timeout', 'ToastService',
    function ($scope, $rootScope, $location, $window, UserService, $timeout, ToastService) {

        $scope.hideProg = false;

        $scope.allUsers = UserService.allUsers;
        $timeout(function(){
         $scope.hideProg = true;
        }, 500);

        $scope.viewJob = function(slug){
          $location.path('/jobs/' + slug);
        };

        $scope.editJob = function(slug, job){
          var def = JobService.editSingle(slug, job);
          $scope.hideProg = false;
          $timeout(function(){
            $scope.hideProg = true;
            def.then(function(data){
              JobService.getUserJob();
              ToastService.showToast('Job edited successfully');
            });
          }, 2000);
        };

        $scope.deleteUser = function(id) {
          $rootScope.hideOutProg = false;
          var def = UserService.deleteOneUser(id);
          $timeout(function() {
            def.then(function(res){
              $window.sessionStorage.clear();
              ToastService.showToast('User deleted successfully');
              UserService.getAll();
            });
          }, 3000);
      };
    }]);
