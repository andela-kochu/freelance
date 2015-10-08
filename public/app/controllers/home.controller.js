'use strict';

angular.module('freelanceApp')
  .controller('homeCtrl', ['$scope', '$rootScope', 'sideNav','AuthService', 'JobService',
              '$location', '$localStorage', '$window', '$timeout', 'ToastService', 'parallaxHelper', function($scope, $rootScope, sideNav,
               AuthService, JobService, $location,  $localStorage, $window, $timeout, ToastService, parallaxHelper) {

     $scope.background = parallaxHelper.createAnimator(-0.35, 450, -450);

    $scope.close = sideNav.close;
    $scope.toggle = sideNav.buildToggler;
    $scope.recentJobs = JobService.jobs;

    $rootScope.$on("$stateChangeSuccess", function(event) {
      if($window.sessionStorage.token) {
        $scope.isLogged = true;
        $scope.username = $window.sessionStorage.user.split(' ')[0];
        if($window.sessionStorage.admin) {
          $scope.admin = true;
        }
      }
      else {
        $scope.isLogged = false;
      }
    });

    $rootScope.hideOutProg = true;
    $scope.logout = function() {
      $rootScope.hideOutProg = false;
      $window.sessionStorage.clear();
      $scope.admin = false;
      $timeout(function(){
        $rootScope.hideOutProg = true;
        ToastService.showToast('You have been logged out!');
        $location.url("/signin");
      }, 1500);
    };
  }]);

