'use strict';

angular.module('freelanceApp').factory('ToastService', function($mdToast) {
  return {
    showToast: function(message) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position('top right')
          .hideDelay(3000)
      );
    }
  };
});
