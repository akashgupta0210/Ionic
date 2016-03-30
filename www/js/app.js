angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','ngMessages','ngStorage','ngCordova','ionic-material','ionMdInput','ngRoute'])

.run(function($ionicPlatform,$rootScope,$location,$http,$localStorage) {
  $ionicPlatform.ready(function() {
    $rootScope.globals = $localStorage.cookies || {};      
    
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    if ($location.path() == '/app/login' && $rootScope.globals.currentUser) {
        $location.path('/app/profile/menu');
    }
    
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in
      if ($location.path() !== '/app/login' && !$rootScope.globals.currentUser) {
        $location.path('/app/login');
      }
    });
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if(window.cordova && window.cordova.plugins.Keyboard) {
      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  })

})