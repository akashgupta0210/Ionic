angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
   $stateProvider
    

   .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
   })

   .state('app.login', {
      url: '/login',
      views: {
         'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
         },
         'fabContent': {
            template: ''
         }
      }
   })

   .state('app.signup', {
      url: '/signup',
      views: {
         'menuContent': {
            templateUrl: 'templates/signup.html',
            controller: 'signupCtrl'
         },
         'fabContent': {
            template: ''
         }
      }
   })

   .state('app.profileEdit', {
      url: '/profile/edit',
      views: {
         'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
         },
         'fabContent': {
            template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
            controller: function ($timeout) {
               /*$timeout(function () {
                  document.getElementById('fab-profile').classList.toggle('on');
               }, 800);*/
            }
         }
      }
   })

   .state('storage', {
      url: '/storage',
      templateUrl: 'templates/storageInfo.html',
      controller: 'storageCtrl'
   })

   .state('app.profileMenu', {
      url: '/profile/menu',
      views: {
         'menuContent': {
            templateUrl: 'templates/profileView.html',
            controller: 'profileCtrl'
         },
         'fabContent': {
            template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
            controller: function ($timeout) {
               $timeout(function () {
                  document.getElementById('fab-profile').classList.toggle('on');
               }, 800);
            }
         }
      }
   })

   .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
   });

   $urlRouterProvider.otherwise('/app/profile/menu')
});