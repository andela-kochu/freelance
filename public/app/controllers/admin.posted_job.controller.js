'use strict';

angular.module('freelanceApp')
  .controller('allJobsCtrl', ['$scope', '$rootScope', '$location', '$window', 'JobService', '$timeout', 'ToastService',
    function ($scope, $rootScope, $location, $window, JobService, $timeout, ToastService) {

        $scope.hideProg = false;

        $scope.allJobs = JobService.jobs;
        console.log(JobService.jobs);
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

        $scope.deleteJob = function(slug){
          JobService.deleteSingle(slug).then(function(data){
            ToastService.showToast('Job deleted successfully');
            JobService.getAll();
          });
        };
    }]);
