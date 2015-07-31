angular.module('freelanceApp')
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('teal')
      .warnPalette('red');
});
