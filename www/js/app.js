// Ionic Gaceta App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'gaceta' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'gaceta.services' is found in services.js
// 'gaceta.controllers' is found in controllers.js
angular.module('gaceta', ['ionic'
    , 'gaceta.controllers'
    , 'gaceta.services'
    , 'gaceta.filters'
    , 'gaceta.factories'
    , 'gaceta.controllers.edit'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })

  .state('tab.providers', {
      url: '/providers',
      views: {
        'tab-providers': {
          templateUrl: 'templates/tab-providers.html',
          controller: 'ProvidersCtrl'
        }
      }
    })
    .state('tab.provider-detail', {
      url: '/provider/:providerId',
      views: {
        'tab-providers': {
          templateUrl: 'templates/provider-detail.html',
          controller: 'ProviderDetailCtrl'
        }
      }
    })

  .state('tab.edit', {
    url: '/edit',
    views: {
      'tab-edit': {
        templateUrl: 'templates/tab-edit.html',
        controller: 'EditCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/providers');

});
