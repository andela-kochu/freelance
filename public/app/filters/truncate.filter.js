'use strict';

angular.module('freelanceApp')
  .filter('truncate', function () {
    return function (value, max) {
      if(!value) {
        return;
      }
      if(!max || value.length<=max) {
        return value;
      }
      else{
        var limit = parseInt(max, 10);
        var firstcut = value.substr(0, limit);
        var lastspace = firstcut.lastIndexOf(' ');
        var finalcut = firstcut.substr(0, lastspace);
        return finalcut +  ' …';
      }
    };
  })
  .filter('sentenceCase', function () {
    return function (value) {
      if(!value) {
        return;
      }
      return value.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
  });
