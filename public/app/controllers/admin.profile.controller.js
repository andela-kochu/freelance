'use strict';

angular.module('freelanceApp')
  .controller('adminProfileCtrl', ['$scope', '$rootScope', '$location', '$window',
            'UserService', 'JobService', '$mdDialog', '$timeout', 'ToastService',
    function ($scope, $rootScope, $location, $window, UserService, JobService, $mdDialog, $timeout, ToastService) {

      $scope.profile = UserService.userData;

      ToastService.showToast('My Profile');

      $scope.editUser = function(ev) {
        $mdDialog.show({
          controller: editUserCtrl,
          templateUrl: 'app/partials/edit.user.modal.html',
          targetEvent: ev,
          clickOutsideToClose: true,
          escapeToClose: true
        })
        .then(function() {
          });
      };
      function editUserCtrl($scope, $mdDialog) {
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
         $scope.name = UserService.userData.name;
         $scope.phone = UserService.userData.phoneNumber;
         $scope.interests = UserService.userData.interests;
         $scope.skills = UserService.userData.skill;
         $scope.gender = UserService.userData.gender;
          $scope.hideProg = true;
          $scope.editProf = function() {
          $scope.hideProg = false;
          var formData = {
              name: $scope.name,
              password: $scope.password,
              phoneNumber: $scope.phone,
              interests: $scope.interests,
              skill: $scope.skills,
              gender: $scope.gender
            };
            $timeout(function() {
              UserService.editProf(formData)
                .then(
                  function(res) {
                    $scope.hideProg = true;
                    ToastService.showToast('Profile Update successful');
                    UserService.profile();
                   },
                  function(res) {
                  $scope.hideProg = true;
                  ToastService.showToast('Profile Update failed');
                  $scope.msg = res.data.message;
                });
            $mdDialog.hide();
            }, 3000);
        };
      }

      $scope.postJob = function(ev) {
              $mdDialog.show({
                controller: postJobCtrl,
                templateUrl: 'app/partials/post.job.modal.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true
              })
              .then(function() {
                });
            };
            function postJobCtrl($scope, $mdDialog) {
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.hideProg = true;
              $scope.submitJob = function() {
                $scope.hideProg = false;
                var formData = {
                    title: $scope.title,
                    description: $scope.description,
                    tools: $scope.tools,
                    skill: $scope.skill
                  };
                  $timeout(function() {
                    JobService.postJob(formData)
                      .then(
                        function(data) {
                          $scope.hideProg = true;
                          ToastService.showToast('Job posted successfully');
                         },
                        function(data) {
                        $scope.hideProg = true;
                        $scope.msg = data.message;
                        ToastService.showToast('Job posting failed');
                      });
                  $mdDialog.hide();
                  }, 3000);
              };
            }

      $scope.deleteUser = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Would you like to delete your Account?')
          .content('You will loose all your data if you confirm this. If you clicked this accidentally. Please, click CANCEL to exit')
          .ok('Please, Continue')
          .cancel('CANCEL')
          .targetEvent(ev);

        $mdDialog.show(confirm).then(function() {
          $rootScope.hideOutProg = false;
          var def = UserService.deleteUser();
          $timeout(function() {
            def.then(function(res){
              $window.sessionStorage.clear();
              ToastService.showToast('User deleted successfully');
              $window.location.href = '#/home';
            });
          }, 3000);
        });
      };
  }]);
