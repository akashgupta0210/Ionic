angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('profileEdit', {
    url: '/profile/edit',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('storage', {
    url: '/storage',
    templateUrl: 'templates/storageInfo.html',
    controller: 'storageCtrl'
  })

  .state('profileMenu', {
    url: '/profile/menu',
    templateUrl: 'templates/profileView.html',
    controller: 'profileCtrl'
  })

  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  });

$urlRouterProvider.otherwise('/map')
});