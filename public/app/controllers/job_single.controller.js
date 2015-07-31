'use strict';

angular.module('freelanceApp')
  .controller('job_singleCtrl', ['$scope', 'JobService', '$window', '$location', '$timeout', 'ToastService', function($scope, JobService, $window, $location, $timeout, ToastService) {

    $scope.single_job = JobService.singleJob;
    $scope.hideProg = true;

    $scope.applyForJob = function(slug){
      $scope.hideProg = false;
     if(!$window.sessionStorage.token) {
        ToastService.showToast('Please, sign in to apply');
        $location.path('/signin');
      }
      JobService.applyFor(slug).then(function(res){
        $timeout(function() {
          $scope.hideProg = true;
          ToastService.showToast('You have applied successfully');
        }, 1000);
  //      console.log(res);
      });
    };


    $scope.postComment = function(jobId, comment, slug) {
      if(jobId && comment) {
        comment.jobId = jobId;
      }
      $scope.hideProg = false;
      var def = JobService.postComment(comment);
       $timeout(function() {
          $scope.hideProg = true;
          def.then(function(data){
            ToastService.showToast('Comment posted successfully');
            JobService.getSingle(slug);
           });
        }, 1000);
     };

  }]);
